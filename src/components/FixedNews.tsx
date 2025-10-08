import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { Card, CardContent, Chip, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Image from "next/image"

interface NewsItem {
  id: number
  title: string
  description: string
  date: string
  image: string
}

const FixedNews = () => {
  const fixedNews: NewsItem[] = [
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

  return (
    <Box>
      <Typography
        variant="h5"
        className="text-primary mb-3 font-bold"
        color="primary"
      >
        Закреплённые новости
      </Typography>
      <Grid
        container
        spacing={2}
        columns={10}
        className="border-t-[5px] border-[#5BB3EA] pt-10"
      >
        {fixedNews.map((item) => (
          <Grid size={{ xs: 12 }} key={item.id}>
            <Card className="relative flex aspect-[4/3] h-full flex-col overflow-hidden rounded-none">
              <Image
                src={fixedNews[0].image}
                alt={fixedNews[0].title}
                fill
                className="absolute object-cover"
              />
              <CardContent className="z-[1] flex flex-1 flex-col justify-end p-0">
                <Box className="bg-[#00000080] p-3">
                  <Typography
                    variant="h5"
                    gutterBottom
                    className="line-clamp-3 break-words font-bold leading-tight"
                  >
                    {fixedNews[0].title}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    className="line-clamp-3 break-words leading-tight"
                  >
                    {fixedNews[0].description}
                  </Typography>
                  <Box className="flex items-center gap-2">
                    <CalendarMonthIcon />
                    <Chip
                      label={fixedNews[0].date}
                      color="primary"
                      variant="outlined"
                      sx={{ color: "common.white" }}
                      className="font-bold"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FixedNews
