import Link from "next/link"
import { Box, Button } from "@mui/material"

export default function NotFound() {
  return (
    <Box className={"flex grow flex-col items-center justify-center gap-4"}>
      <h1 className={"text-primary-main text-8xl font-black"}>404</h1>
      <span className={"text-2xl font-bold"}>Страница не найдена</span>
      <Link href="/">
        <Button>Вернуться на главную</Button>
      </Link>
    </Box>
  )
}
