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
  Container,
  Menu,
  MenuItem,
} from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/navigation"
import { useState } from "react"
import TelegramIcon from "@mui/icons-material/Telegram"
import MenuIcon from "@mui/icons-material/Menu"
import { useAppSelector } from "@/hooks/use-app-selector"
import { logOut } from "@/features/user/slice"
import { NewsSearch } from "@/components/header/news-search"
import { useTranslation } from "@/providers/i18n-provider"
import { ResentPost } from "@/components/header/resent-post"

export const Header = () => {
  const router = useRouter()

  const [logoutPopoverAnchor, setLogoutPopoverAnchor] =
    useState<HTMLElement | null>(null)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const user = useAppSelector((state) => state.userSlice.user)

  const dispatch = useAppDispatch()
  const t = useTranslation()
  const currentDate = useFormatCurrentDate()

  const handleLogout = () => {
    setLogoutPopoverAnchor(null)
    Cookies.remove("jwt")
    dispatch(logOut())
  }

  const handleProfile = () => {
    setLogoutPopoverAnchor(null)
    router.push("/profile")
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar
      color="secondary"
      position="static"
      className="border-b-[5px] border-[#5BB3EA]"
    >
      <Toolbar variant="dense" color="secondary" className="min-h-fit px-0">
        <Container maxWidth="xl" className="flex justify-between px-2">
          <Box className="flex gap-4 max-lg:gap-2">
            <Box
              sx={{ bgcolor: "primary.main" }}
              className="flex items-center self-stretch px-5 max-lg:px-3"
            >
              <Typography variant="body2" className="font-bold">
                {currentDate}
              </Typography>
            </Box>
            <ResentPost />
          </Box>
          <Box className="flex h-full items-stretch gap-4">
            <Box className="hidden items-center gap-4 lg:flex">
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
            </Box>
            <Box className="lg:hidden">
              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem>
                  <UpdateLanguageSelect color="text.secondary" />
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    href="https://t.me/yourchannel"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                    className="flex items-center"
                  >
                    <IconButton size="small" className="pl-0">
                      <TelegramIcon className="text-common-black" />
                    </IconButton>
                  </Link>
                </MenuItem>
                {user ? (
                  <>
                    <MenuItem
                      className="text-common-black"
                      onClick={() => {
                        handleCloseNavMenu()
                        router.push("/profile")
                      }}
                    >
                      {t("common.profile")}
                    </MenuItem>
                    <MenuItem
                      className="text-common-black"
                      onClick={() => {
                        handleCloseNavMenu()
                        handleLogout()
                      }}
                    >
                      {t("common.logout")}
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem
                    className="text-common-black"
                    onClick={() => {
                      handleCloseNavMenu()
                      dispatch(setSignInModalOpen(true))
                    }}
                  >
                    {t("common.login")}
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Box>
        </Container>
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
            <Box display="flex" flexDirection="column">
              <Button onClick={handleProfile}>{t("common.profile")}</Button>
              <Button onClick={handleLogout}>{t("common.logout")}</Button>
            </Box>
          </Popover>
        )}
      </Toolbar>
      <Toolbar
        variant="dense"
        className="px-0 py-5 max-lg:pt-2"
        sx={{ bgcolor: "background.default" }}
      >
        <Container
          maxWidth="xl"
          className="flex items-center justify-between gap-2 px-2"
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
          <Box className="flex max-w-2/3 items-center max-sm:hidden">
            <Image
              src="/header.svg"
              alt={t("images.headerAlt")}
              width={766}
              height={80}
            />
          </Box>
        </Container>
      </Toolbar>
      <Toolbar variant="dense" className="px-0" color="secondary">
        <Container
          maxWidth="xl"
          className="flex items-center justify-between px-2 max-lg:flex-col"
        >
          <LocationSelect />
          <NewsSearch />
        </Container>
      </Toolbar>
    </AppBar>
  )
}
