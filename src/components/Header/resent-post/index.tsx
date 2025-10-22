import { Button } from "@mui/material"
import { useTranslation } from "@/providers/i18n-provider"
import { useGetResentPostUuid } from "@/components/Header/resent-post/use-get-resent-post-uuid"

export const ResentPost = () => {
  const t = useTranslation()

  const handleResentPostClicked = useGetResentPostUuid()

  return (
    <Button
      variant="text"
      sx={{ color: "common.white" }}
      size="medium"
      className="font-bold normal-case max-lg:px-4"
      onClick={handleResentPostClicked}
    >
      {t("common.recentPost")}
    </Button>
  )
}
