"use client"

import Image from "next/image"
import {
  AppBar,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import TelegramIcon from "@mui/icons-material/Telegram"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import SearchIcon from "@mui/icons-material/Search"

function Header() {
  const [language, setLanguage] = useState("ru")
  const [activeTab, setActiveTab] = useState("home")
  const [selectedUniversity, setSelectedUniversity] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const handleUniversityChange = (value: string) => {
    setSelectedUniversity(value)
    if (value) {
      setActiveTab("university")
    }
  }

  const handleSelectClick = () => {
    setActiveTab("university")
  }

  const handleNewsClick = () => {
    setActiveTab("news")
  }

  useEffect(() => {
    const now = new Date()
    const days = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ]
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ]

    const dayName = days[now.getDay()]
    const day = now.getDate()
    const month = months[now.getMonth()]
    const year = now.getFullYear()

    setCurrentDate(`${dayName}, ${day} ${month}, ${year}`)
  }, [])

  return (
    <AppBar color="secondary">
      <Toolbar
        variant="dense"
        color="secondary"
        className="flex items-center justify-between"
      >
        <Box className="flex items-center gap-4 self-stretch">
          <Box
            sx={{ bgcolor: "primary.main" }}
            className="flex items-center self-stretch px-5"
          >
            <Typography variant="body2">{currentDate}</Typography>
          </Box>
          <Button
            variant="text"
            sx={{ color: "common.white" }}
            size="medium"
            className="normal-case"
          >
            Недавний пост
          </Button>
        </Box>
        <Box className="flex items-center gap-4">
          <FormControl variant="standard" size="small">
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value as string)}
              label="Язык"
              autoWidth
              sx={{
                color: "common.white",
                "& .MuiSvgIcon-root": {
                  color: "common.white",
                },
                "& .MuiSelect-select": {
                  padding: "4px 0",
                },
              }}
              className="text-sm"
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
            sx={{ color: "common.white" }}
            size="medium"
            className="normal-case"
          >
            Войти
          </Button>
        </Box>
      </Toolbar>
      <Toolbar
        variant="dense"
        className="flex items-center justify-between py-5"
        sx={{ bgcolor: "background.default" }}
      >
        <Box className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Логотип"
            width={147}
            height={74}
            priority
          />
        </Box>
        <Box className="flex items-center">
          <Image
            src="/header.svg"
            alt="Декоративная картинка"
            width={766}
            height={80}
          />
        </Box>
      </Toolbar>
      <Toolbar
        variant="dense"
        className="flex items-center justify-between"
        color="secondary"
      >
        <Box className="flex items-center self-stretch">
          <Button
            variant="text"
            size="medium"
            className="relative flex items-center self-stretch rounded-none px-5 normal-case transition-all duration-300"
            sx={{
              color: "common.white",
              bgcolor: activeTab === "home" ? "primary.main" : "transparent",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -10,
                left: 0,
                right: 0,
                height: "10px",
                backgroundColor: "primary.main",
                zIndex: 1,
                opacity: activeTab === "home" ? "1" : "0",
                transition: "all 0.3s ease",
              },
            }}
            onClick={() => handleTabClick("home")}
          >
            <HomeRoundedIcon fontSize="large" />
          </Button>
          <FormControl
            variant="standard"
            size="small"
            className="flex h-full items-center justify-center self-stretch px-4 transition-all duration-300"
            sx={{
              bgcolor:
                activeTab === "university" ? "primary.main" : "transparent",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -10,
                left: 0,
                right: 0,
                height: "10px",
                backgroundColor: "primary.main",
                zIndex: 1,
                opacity: activeTab === "university" ? "1" : "0",
                transition: "all 0.3s ease",
              },
            }}
          >
            <Select
              value={selectedUniversity || ""}
              onChange={(e) => handleUniversityChange(e.target.value as string)}
              onClick={handleSelectClick}
              displayEmpty
              sx={{
                color: "common.white",
                bgcolor: "transparent",
                "& .MuiSvgIcon-root": {
                  color: "common.white",
                },
                "& .MuiSelect-select": {
                  padding: "4px 0",
                },
                minWidth: 230,
              }}
              className="rounded-none text-sm transition-all duration-300"
            >
              <MenuItem
                value=""
                disabled
                sx={{
                  color: "primary.main",
                }}
              >
                Выберите университет
              </MenuItem>
              <MenuItem
                value="gsu"
                sx={{
                  color: "primary.main",
                }}
              >
                ГГУ им. Франциска Скорины
              </MenuItem>
              <MenuItem
                value="gstu"
                sx={{
                  color: "primary.main",
                }}
              >
                ГГТУ им. П.О. Сухого
              </MenuItem>
              <MenuItem
                value="ggmu"
                sx={{
                  color: "primary.main",
                }}
              >
                ГГМУ
              </MenuItem>
              <MenuItem
                value="bgt"
                sx={{
                  color: "primary.main",
                }}
              >
                БелГУТ
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="text"
            size="medium"
            sx={{
              color: "common.white",
              backgroundColor:
                activeTab === "news" ? "primary.main" : "transparent",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -10,
                left: 0,
                right: 0,
                height: "10px",
                backgroundColor: "primary.main",
                zIndex: 1,
                opacity: activeTab === "news" ? "1" : "0",
                transition: "all 0.3s ease",
              },
            }}
            onClick={handleNewsClick}
            className="relative flex items-center self-stretch rounded-none px-5 normal-case transition-all duration-300"
          >
            Вести братского народа
          </Button>
        </Box>
        <Box className="self-stretch">
          <TextField
            variant="filled"
            size="small"
            placeholder="Поиск..."
            className="h-full self-stretch rounded-none text-sm"
            sx={{
              width: 300,
              bgcolor: "#585858",
              "& .MuiInputBase-input": {
                transition: "all 0.3s ease",
                color: "common.white",
                padding: "16px",
                fontSize: 14,
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <SearchIcon fontSize="large" sx={{ color: "common.white" }} />
                ),
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
