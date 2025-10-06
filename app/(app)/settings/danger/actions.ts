"use server"

import { prisma } from "@/lib/db"
import { DEFAULT_CATEGORIES, DEFAULT_SETTINGS } from "@/models/defaults"
import { User } from "@/prisma/client"
import { redirect } from "next/navigation"

export async function resetLLMSettings(user: User) {
  const llmSettings = DEFAULT_SETTINGS.filter((setting) => setting.code === "prompt_analyse_new_file")

  for (const setting of llmSettings) {
    await prisma.setting.upsert({
      where: { userId_code: { code: setting.code, userId: user.id } },
      update: { value: setting.value },
      create: { ...setting, userId: user.id },
    })
  }

  redirect("/settings/llm")
}

export async function resetFieldsAndCategories(user: User) {
  // Reset categories
  for (const category of DEFAULT_CATEGORIES) {
    await prisma.category.upsert({
      where: { userId_code: { code: category.code, userId: user.id } },
      update: { name: category.name, color: category.color, llm_prompt: category.llm_prompt, createdAt: new Date() },
      create: { ...category, userId: user.id, createdAt: new Date() },
    })
  }
  await prisma.category.deleteMany({
    where: { userId: user.id, code: { notIn: DEFAULT_CATEGORIES.map((category) => category.code) } },
  })

  redirect("/settings/fields")
}
