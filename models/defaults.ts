import { prisma } from "@/lib/db"

export const DEFAULT_PROMPT_ANALYSE_NEW_FILE = `You are an accountant and invoice analysis assistant. Extract following information from the given invoice: 

{fields}

Also try to extract "items": all separate products or items from the invoice

Where categories are:

{categories}

And projects are:

{projects}

IMPORTANT RULES:
- Do not include any other text in your response!
- If you can't find something leave it blank, NEVER make up information
- Return only one object`

export const DEFAULT_SETTINGS = [
  {
    code: "default_currency",
    name: "Default Currency",
    description: "Don't change this setting if you already have multi-currency transactions. I won't recalculate them.",
    value: "EUR",
  },
  {
    code: "default_category",
    name: "Default Category",
    description: "",
    value: "other",
  },
  {
    code: "default_project",
    name: "Default Project",
    description: "",
    value: "personal",
  },
  {
    code: "default_type",
    name: "Default Type",
    description: "",
    value: "expense",
  },
  {
    code: "prompt_analyse_new_file",
    name: "Prompt for Analyze Transaction",
    description: "Allowed variables: {fields}, {categories}, {categories.code}, {projects}, {projects.code}",
    value: DEFAULT_PROMPT_ANALYSE_NEW_FILE,
  },
  {
    code: "is_welcome_message_hidden",
    name: "Do not show welcome message on dashboard",
    description: "",
    value: "false",
  },
]

export const DEFAULT_CATEGORIES = [
  {
    code: "ads",
    name: "Advertisement",
    color: "#882727",
    llm_prompt: "ads, promos, online ads, etc",
  },
  {
    code: "swag",
    name: "Swag and Goods",
    color: "#882727",
    llm_prompt: "swag, stickers, goods, etc",
  },
  { code: "donations", name: "Gifts and Donations", color: "#1e6359", llm_prompt: "donations, gifts, charity" },
  { code: "tools", name: "Equipment and Tools", color: "#c69713", llm_prompt: "equipment, tools" },
  { code: "events", name: "Events and Conferences", color: "#ff8b32", llm_prompt: "events, conferences" },
  { code: "food", name: "Food and Drinks", color: "#d40e70", llm_prompt: "food, drinks, business meals" },
  { code: "insurance", name: "Insurance", color: "#050942", llm_prompt: "insurance, health, life" },
  { code: "invoice", name: "Invoice", color: "#064e85", llm_prompt: "custom invoice, bill" },
  { code: "communication", name: "Mobile and Internet", color: "#0e7d86", llm_prompt: "mobile, internet, phone" },
  { code: "office", name: "Office Supplies", color: "#59b0b9", llm_prompt: "office, supplies, stationery" },
  { code: "online", name: "Online Services", color: "#8753fb", llm_prompt: "online services, saas, subscriptions" },
  { code: "rental", name: "Rental", color: "#050942", llm_prompt: "rental, lease" },
  {
    code: "education",
    name: "Education",
    color: "#ee5d6c",
    llm_prompt: "education, professional development, trainings",
  },
  { code: "salary", name: "Salary", color: "#ce4993", llm_prompt: "salary, wages, etc" },
  { code: "fees", name: "Fees", color: "#6a0d83", llm_prompt: "fees, charges, penalties, etc" },
  { code: "travel", name: "Travel Expenses", color: "#fb9062", llm_prompt: "travel, accommodation, etc" },
  { code: "utility_bills", name: "Utility Bills", color: "#af7e2e", llm_prompt: "bills, electricity, water, etc" },
  {
    code: "transport",
    name: "Transport",
    color: "#800000",
    llm_prompt: "transportation costs, fuel, car rental, vignettes, etc",
  },
  { code: "software", name: "Software", color: "#2b5a1d", llm_prompt: "software, licenses" },
  { code: "other", name: "Other", color: "#121216", llm_prompt: "other, miscellaneous," },
]

export const DEFAULT_PROJECTS = [{ code: "personal", name: "Personal", llm_prompt: "personal", color: "#1e202b" }]

export async function createUserDefaults(userId: string) {
  // Default projects
  for (const project of DEFAULT_PROJECTS) {
    await prisma.project.upsert({
      where: { userId_code: { code: project.code, userId } },
      update: { name: project.name, color: project.color, llm_prompt: project.llm_prompt },
      create: { ...project, userId },
    })
  }

  // Default categories
  for (const category of DEFAULT_CATEGORIES) {
    await prisma.category.upsert({
      where: { userId_code: { code: category.code, userId } },
      update: { name: category.name, color: category.color, llm_prompt: category.llm_prompt },
      create: { ...category, userId },
    })
  }

  // Default settings
  for (const setting of DEFAULT_SETTINGS) {
    await prisma.setting.upsert({
      where: { userId_code: { code: setting.code, userId } },
      update: { name: setting.name, description: setting.description, value: setting.value },
      create: { ...setting, userId },
    })
  }
}

export async function isDatabaseEmpty(userId: string) {
  const fieldsCount = await prisma.field.count({ where: { userId } })
  return fieldsCount === 0
}
