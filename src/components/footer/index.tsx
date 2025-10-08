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
} from "@mui/material"
import Image from "next/image"

export const Footer = () => {
  return (
    <Box className="bg-secondary-main py-8">
      <Grid container spacing={4} columns={12} className="px-6">
        <Grid size={{ xs: 12, md: 3 }}>
          <Image
            src="/logo2.svg"
            alt="Логотип"
            width={147}
            height={74}
            priority
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography
            variant="subtitle1"
            className="text-primary-main mb-2 font-bold"
          >
            Навигация
          </Typography>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/"
                className="p-0 hover:bg-transparent"
              >
                <ListItemText
                  primary="Главная"
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
                href="/universities"
                className="p-0 hover:bg-transparent"
              >
                <ListItemText
                  primary="Список университетов"
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
                href="/news"
                className="p-0 hover:bg-transparent"
              >
                <ListItemText
                  primary="Вести братского народа"
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
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography
            variant="subtitle1"
            className="text-primary-main mb-2 font-bold"
          >
            Условия использования
          </Typography>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/privacy"
                className="p-0 hover:bg-transparent"
              >
                <ListItemText
                  primary="Политика конфиденциальности"
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
                href="/terms"
                className="p-0 hover:bg-transparent"
              >
                <ListItemText
                  primary="Пользовательское соглашение"
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
        <Grid size={{ xs: 12, md: 3 }} className="flex flex-col items-end">
          <Typography
            variant="subtitle1"
            className="text-primary-main mb-2 text-right font-bold"
          >
            Мы в соцсетях
          </Typography>
          <Box className="flex items-center gap-2">
            <Link
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram канал"
            >
              <IconButton className="text-text-primary" size="small">
                <TelegramIcon />
              </IconButton>
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Box className="border-primary-main mt-6 border-t pt-4 text-center">
        <Typography variant="body2" className="text-text-primary">
          © 2025 Ваш сайт. Все права защищены.
        </Typography>
      </Box>
    </Box>
  )
}
