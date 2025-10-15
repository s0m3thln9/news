import Link from "next/link"
import { Box, Button } from "@mui/material"
import { Translate } from "@/components/ui/translate"

export default function NotFound() {
  return (
    <Box className={"flex grow flex-col items-center justify-center gap-4"}>
      <h1 className={"text-primary-main text-8xl font-black"}>
        <Translate value={"notFound.title"} />
      </h1>
      <span className={"text-2xl font-bold"}>
        <Translate value={"notFound.text"} />
      </span>
      <Link href="/">
        <Button>
          <Translate value={"notFound.goHome"} />
        </Button>
      </Link>
    </Box>
  )
}
