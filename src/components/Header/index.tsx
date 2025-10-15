"use client"

import { UpdateLanguageSelect } from "@/components/header/update-language-select"
import { LocationSelect } from "@/components/header/location-select"
import { SignInModal } from "@/components/sign-in-modal"
import { setSignInModalOpen } from "@/components/sign-in-modal/slice"
import { SignUpModal } from "@/components/sign-up-modal"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useFormatCurrentDate } from "@/utils/format-current-date"
import Cookies from "js-cookie"
import Image from "next/image"
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import TelegramIcon from "@mui/icons-material/Telegram"
import { useAppSelector } from "@/hooks/use-app-selector"
import { logOut } from "@/features/user/slice"
import { NewsSearch } from "@/components/header/news-search"
import { useTranslation } from "@/providers/i18n-provider"

export const Header = () => {
  const [logoutPopoverAnchor, setLogoutPopoverAnchor] =
    useState<HTMLElement | null>(null)

  const user = useAppSelector((state) => state.userSlice.user)

  const dispatch = useAppDispatch()
  const t = useTranslation()
  const currentDate = useFormatCurrentDate()

  const handleLogout = () => {
    Cookies.remove("jwt")
    dispatch(logOut())
  }

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
            {t("common.recentPost")}
          </Button>
        </Box>
        <Box className="flex items-center gap-4">
          <UpdateLanguageSelect />
          <Link
            href="https://t.me/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("authExtra.telegramAria")}
          >
            <IconButton className="text-text-primary" size="small">
              <TelegramIcon />
            </IconButton>
          </Link>
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
            {user ? user.firstName : t("common.login")}
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
              <Button onClick={handleLogout}>{t("common.logout")}</Button>
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
            alt={t("images.logoAlt")}
            width={147}
            height={74}
            priority
          />
        </Box>
        <Box className="flex items-center">
          <Image
            src="/header.svg"
            alt={t("images.headerAlt")}
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
        <NewsSearch />
      </Toolbar>
    </AppBar>
  )
}
