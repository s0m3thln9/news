"use client"

import Image from "next/image"
import { Box, Card, CardContent, Grid, Typography, Chip } from "@mui/material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

interface NewsItem {
  id: number
  title: string
  description: string
  date: string
  image: string
}

function LastNews() {
  const news: NewsItem[] = [
    {
      id: 1,
      title:
        "Глобальные изменения в образовании: что ждет студентов в 2025 году",
      description:
        "В мире высшего образования происходят кардинальные сдвиги. От цифровизации до новых программ обмена — разбираемся в трендах.",
      date: "24 сентября 2025",
      image: "/news-img.png",
    },
    {
      id: 2,
      title: "Новый кампус ГГУ: инновации и экология",
      description:
        "Расширение кампуса с фокусом на устойчивость и современные технологии для студентов.",
      date: "23 сентября 2025",
      image: "/news-img.png",
    },
    {
      id: 3,
      title: "Международная конференция по IT в ГГТУ",
      description:
        "Эксперты из разных стран обсудят будущие тренды в информационных технологиях.",
      date: "22 сентября 2025",
      image: "/news-img.png",
    },
    {
      id: 4,
      title: "Стипендии для иностранных студентов в БелГУТ",
      description:
        "Новые гранты для поддержки международного обмена знаниями и культур.",
      date: "21 сентября 2025",
      image: "/news-img.png",
    },
    {
      id: 5,
      title: "Культурный фестиваль в ГГМУ: братские народы объединяются",
      description:
        "Фестиваль с концертами, мастер-классами и выставками для укрепления связей.",
      date: "20 сентября 2025",
      image: "/news-img.png",
    },
  ]

  const featuredNews = news[0]
  const otherNews = news.slice(1, 5)

  return (
    <Grid container spacing={3} className="mt-10 w-full px-6">
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card className="relative flex aspect-[4/3] h-full flex-col overflow-hidden rounded-none">
          <Image
            src={featuredNews.image}
            alt={featuredNews.title}
            fill
            className="absolute object-cover"
          />
          <CardContent className="z-[1] flex flex-1 flex-col justify-end p-0">
            <Box className="bg-[#00000080] p-3">
              <Typography
                variant="h4"
                gutterBottom
                className="line-clamp-3 leading-tight break-words"
              >
                {featuredNews.title}
              </Typography>
              <Box className="flex items-center gap-2">
                <CalendarMonthIcon />
                <Chip
                  label={featuredNews.date}
                  color="primary"
                  variant="outlined"
                  sx={{ color: "common.white" }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Grid container spacing={2} className="h-full items-stretch">
          {otherNews.map((item) => (
            <Grid size={{ xs: 12, sm: 6 }} key={item.id}>
              <Card className="relative flex aspect-[4/3] h-full flex-col overflow-hidden rounded-none">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="absolute object-cover"
                />
                <CardContent className="z-[1] flex flex-1 flex-col justify-end p-0">
                  <Box className="bg-[#00000080] p-2">
                    <Typography
                      variant="h5"
                      gutterBottom
                      className="line-clamp-2 leading-tight break-words"
                    >
                      {item.title}
                    </Typography>
                    <Box className="flex items-center gap-1">
                      <CalendarMonthIcon fontSize="small" />
                      <Chip
                        size="small"
                        label={featuredNews.date}
                        color="primary"
                        variant="outlined"
                        sx={{ color: "common.white" }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LastNews
