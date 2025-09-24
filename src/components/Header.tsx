"use client"

import {
  AppBar,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import TelegramIcon from "@mui/icons-material/Telegram"

function Header() {
  const [language, setLanguage] = useState("ru")

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar
        variant="dense"
        color="secondary"
        className="flex items-center justify-between"
      >
        <Box className="flex items-center gap-4 self-stretch">
          <Box
            sx={{ backgroundColor: "primary.main" }}
            className="flex items-center self-stretch px-5"
          >
            <Typography variant="body2">Пятница, 19 сентября, 2025</Typography>
          </Box>
          <Button
            variant="text"
            sx={{ color: "common.white", textTransform: "none" }}
            size="small"
            className=""
          >
            Недавний пост
          </Button>
        </Box>
        <Box className="flex items-center gap-4">
          <FormControl>
            <Select
              variant="standard"
              size="small"
              value={language}
              onChange={(e) => setLanguage(e.target.value as string)}
              label="Язык"
              autoWidth
              sx={{
                color: "common.white",
                "& .MuiSvgIcon-root": {
                  color: "common.white",
                },
              }}
            >
              <MenuItem
                value="ru"
                sx={{
                  color: "primary.main",
                }}
              >
                RU
              </MenuItem>
              <MenuItem
                value="en"
                sx={{
                  color: "primary.main",
                }}
              >
                EN
              </MenuItem>
            </Select>
          </FormControl>
          <IconButton sx={{ color: "common.white" }} size="small">
            <TelegramIcon />
          </IconButton>
          <Button
            variant="text"
            sx={{ color: "common.white", textTransform: "none" }}
            size="small"
            className=""
          >
            Войти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
