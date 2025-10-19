"use client"

import { useLocationHandlers } from "@/hooks/use-location-handlers"
import { useTranslation } from "@/providers/i18n-provider"
import TelegramIcon from "@mui/icons-material/Telegram"
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Typography,
  IconButton,
  Container,
  Popover,
  MenuItem,
} from "@mui/material"
import Image from "next/image"
import { useState, MouseEvent } from "react"

export const Footer = () => {
  const t = useTranslation()
  const { locations, brothers, handleLocationSelect, handleHomeClick } =
    useLocationHandlers()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? "universities-popover" : undefined

  const handleUniversitiesClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className="bg-secondary-main py-8">
      <Container maxWidth="xl" className="px-0">
        <Grid container spacing={4} columns={12} className="px-6">
          <Grid size={{ xs: 12, md: 4 }}>
            <Image
              src="/logo2.svg"
              alt={t("images.logoAlt")}
              width={147}
              height={74}
              priority
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="subtitle1"
              className="text-primary-main mb-2 font-bold"
            >
              {t("footer.navigation")}
            </Typography>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  onClick={handleHomeClick}
                  className="p-0 hover:bg-transparent"
                >
                  <ListItemText
                    primary={t("footer.home")}
                    slotProps={{
                      primary: {
                        variant: "body2",
                        className: "text-text-primary hover:underline",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleUniversitiesClick}
                  className="p-0 hover:bg-transparent"
                >
                  <ListItemText
                    primary={t("header.universityList")}
                    slotProps={{
                      primary: {
                        variant: "body2",
                        className: "text-text-primary hover:underline",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  onClick={() => handleLocationSelect(brothers?.uuid || "")}
                  className="p-0 hover:bg-transparent"
                >
                  <ListItemText
                    primary={t("locations.brothers")}
                    slotProps={{
                      primary: {
                        variant: "body2",
                        className: "text-text-primary hover:underline",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} className="flex flex-col items-end">
            <Typography
              variant="subtitle1"
              className="text-primary-main mb-2 text-right font-bold"
            >
              {t("footer.socialNetworks")}
            </Typography>
            <Box className="flex items-center gap-2">
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
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-rounded": {
            borderRadius: 0,
          },
        }}
      >
        <Box className="max-h-64 w-64 overflow-auto rounded-none border border-black bg-white shadow-lg">
          {locations
            .filter((location) => location.uuid !== brothers?.uuid)
            .map((location) => (
              <MenuItem
                key={location.uuid}
                onClick={() => {
                  handleLocationSelect(location.uuid)
                  handleClose()
                }}
                className="text-text-secondary hover:bg-primary-main/10 relative flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm outline-none select-none"
              >
                {location.title || t("footer.universityFallback")}
              </MenuItem>
            ))}
        </Box>
      </Popover>
      <Box className="border-primary-main mt-6 border-t pt-4 text-center">
        <Typography variant="body2" className="text-text-primary">
          {t("footer.copyright")}
        </Typography>
      </Box>
    </Box>
  )
}
