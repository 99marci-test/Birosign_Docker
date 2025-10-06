import { Split } from "lucide-react"
import { Button } from "../ui/button"
import { TransactionData } from "@/models/transactions"
import { splitFileIntoItemsAction } from "@/app/(app)/unsorted/actions"
import { useNotification } from "@/app/(app)/context"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { File } from "@/prisma/client"

export const ItemsDetectTool = ({ file, data }: { file?: File; data: TransactionData }) => {
  const { showNotification } = useNotification()
  const [isSplitting, setIsSplitting] = useState(false)

  const handleSplit = async () => {
    if (!file) {
      console.error("No file selected")
      return
    }

    setIsSplitting(true)
    try {
      const formData = new FormData()
      formData.append("fileId", file.id)
      formData.append("items", JSON.stringify(data.items))

      const result = await splitFileIntoItemsAction(null, formData)
      if (result.success) {
        showNotification({ code: "global.banner", message: "Split successful!", type: "success" })
        showNotification({ code: "sidebar.unsorted", message: "new" })
        setTimeout(() => showNotification({ code: "sidebar.unsorted", message: "" }), 3000)
      } else {
        showNotification({ code: "global.banner", message: result.error || "Failed to split", type: "failed" })
      }
    } catch (error) {
      console.error("Failed to split items:", error)
      showNotification({ code: "global.banner", message: "Failed to split items", type: "failed" })
    } finally {
      setIsSplitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {file && data.items && data.items.length > 1 && (
        <Button variant="outline" onClick={handleSplit} className="mt-2 px-4 py-2" disabled={isSplitting}>
          {isSplitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Splitting...
            </>
          ) : (
            <>
              <Split className="w-4 h-4 mr-2" />
              Split into {data.items.length} individual transactions
            </>
          )}
        </Button>
      )}
    </div>
  )
}
