"use client"

import Image from "next/image"
import {
  AppBar,
  Button,
  IconButton,
  Popover,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import TelegramIcon from "@mui/icons-material/Telegram"
import SearchIcon from "@mui/icons-material/Search"
import { SignInModal } from "@/components/SignInModal"
import { setSignInModalOpen } from "@/components/SignInModal/slice"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { SignUpModal } from "@/components/SignUpModal"
import { useAppSelector } from "@/hooks/useAppSelector"
import Cookies from "js-cookie"
import { logOut } from "@/features/user/slice"
import { UpdateLanguageSelect } from "@/components/Header/UpdateLanguageSelect"
import { LocationSelect } from "@/components/Header/LocationSelect"

function Header() {
  const [currentDate, setCurrentDate] = useState("")
  const [logoutPopoverAnchor, setLogoutPopoverAnchor] =
    useState<HTMLElement | null>(null)

  const user = useAppSelector((state) => state.userSlice.user)

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    Cookies.remove("jwt")
    dispatch(logOut())
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
    <AppBar
      color="secondary"
      position="static"
      className="border-b-[5px] border-[#5BB3EA]"
    >
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
            <Typography variant="body2" className="font-bold">
              {currentDate}
            </Typography>
          </Box>
          <Button
            variant="text"
            sx={{ color: "common.white" }}
            size="medium"
            className="font-bold normal-case"
          >
            Недавний пост
          </Button>
        </Box>
        <Box className="flex items-center gap-4">
          <UpdateLanguageSelect />
          <IconButton sx={{ color: "common.white" }} size="small">
            <TelegramIcon />
          </IconButton>
          <Button
            variant="text"
            sx={{ color: "common.white" }}
            size="medium"
            className="font-bold normal-case"
            onClick={(e) =>
              user
                ? setLogoutPopoverAnchor(e.currentTarget)
                : dispatch(setSignInModalOpen(true))
            }
          >
            {user ? user.firstName : "Войти"}
          </Button>
          {!user ? (
            <>
              <SignInModal />
              <SignUpModal />
            </>
          ) : (
            <Popover
              open={Boolean(logoutPopoverAnchor)}
              anchorEl={logoutPopoverAnchor}
              onClose={() => setLogoutPopoverAnchor(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Button onClick={handleLogout}>Выйти</Button>
            </Popover>
          )}
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
        <LocationSelect />
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
                fontWeight: "bold",
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
