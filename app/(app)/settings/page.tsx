import GlobalSettingsForm from "@/components/settings/global-settings-form"
import { getCurrentUser } from "@/lib/auth"
import { getCategories } from "@/models/categories"
import { getSettings } from "@/models/settings"

export default async function SettingsPage() {
  const user = await getCurrentUser()
  const settings = await getSettings(user.id)
  const categories = await getCategories(user.id)

  return (
    <>
      <div className="w-full max-w-2xl">
        <GlobalSettingsForm settings={settings} categories={categories} />
      </div>
    </>
  )
}
