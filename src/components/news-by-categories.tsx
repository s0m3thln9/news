import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material"

interface NewsItem {
  id: number
  title: string
  description?: string
  date: string
  image: string
}

interface CategoryBlockProps {
  title: string
  featuredNews: NewsItem
  smallNews: NewsItem[]
}

function NewsByCategories() {
  const categories = [
    {
      title: "ГГУ им. Ф. Скорины",
      featuredNews: {
        id: 1,
        title:
          "Глобальные изменения в образовании: что ждет студентов в 2025 году",
        description:
          "В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги.",
        date: "24 сентября 2025",
        image: "/news-img.png",
      },
      smallNews: [
        {
          id: 2,
          title: "Новый кампус ГГУ: инновации и экология",
          description:
            "В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги.",
          date: "23 сентября 2025",
          image: "/news-img.png",
        },
        {
          id: 3,
          title: "Конференция по экологии в ГГУ",
          description:
            "В мире высшего образования происходят кардинальные сдвиги.",
          date: "22 сентября 2025",
          image: "/news-img.png",
        },
        {
          id: 4,
          title: "Стипендии для студентов ГГУ",
          description:
            "В мире высшего образования происходят кардинальные сдвиги.",
          date: "21 сентября 2025",
          image: "/news-img.png",
        },
      ],
    },
    {
      title: "ГГТУ им. П.О. Сухого",
      featuredNews: {
        id: 5,
        title: "Международная конференция по IT в ГГТУ",
        description:
          "В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги.",
        date: "20 сентября 2025",
        image: "/news-img.png",
      },
      smallNews: [
        {
          id: 6,
          title: "Новые лаборатории в ГГТУ",
          description:
            "В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги. В мире высшего образования происходят кардинальные сдвиги.",
          date: "19 сентября 2025",
          image: "/news-img.png",
        },
        {
          id: 7,
          title: "Хакатон для студентов ГГТУ",
          description: "Эксперты обсудят будущие тренды в технологиях.",
          date: "18 сентября 2025",
          image: "/news-img.png",
        },
        {
          id: 8,
          title: "Партнёрство с IT-компаниями",
          description: "Эксперты обсудят будущие тренды в технологиях.",
          date: "17 сентября 2025",
          image: "/news-img.png",
        },
      ],
    },
    {
      title: "ГГМУ",
      featuredNews: {
        id: 9,
        title: "Культурный фестиваль в ГГМУ: братские народы объединяются",
        description: "Фестиваль с концертами и мастер-классами.",
        date: "16 сентября 2025",
        image: "/news-img.png",
      },
      smallNews: [
        {
          id: 10,
          title: "Медицинские инновации в ГГМУ",
          description: "Фестиваль с концертами и мастер-классами.",
          date: "15 сентября 2025",
          image: "/news-img.png",
        },
        {
          id: 11,
          title: "Обмен опытом с зарубежными вузами",
          description: "Фестиваль с концертами и мастер-классами.",
          date: "14 сентября 2025",
          image: "/news-img.png",
        },
        {
          id: 12,
          title: "Семинар по здоровью",
          description: "Фестиваль с концертами и мастер-классами.",
          date: "13 сентября 2025",
          image: "/news-img.png",
        },
      ],
    },
  ]

  return (
    <Box>
      {categories.map(
        ({ title, smallNews, featuredNews }: CategoryBlockProps, index) => (
          <Box className="mb-10 last:mb-0" key={index}>
            <Typography
              variant="h5"
              className="text-primary mb-3 font-bold"
              color="primary"
            >
              {title}
            </Typography>
            <Grid
              container
              spacing={2}
              columns={10}
              className="border-t-[5px] border-[#5BB3EA] pt-10"
            >
              <Grid size={{ xs: 10, md: 6 }}>
                <Card className="flex h-full flex-col overflow-hidden rounded-none">
                  <CardMedia
                    className="aspect-[2/1]"
                    image={featuredNews.image}
                    title={featuredNews.title}
                  />
                  <CardContent className="relative z-[1] flex flex-1 flex-col overflow-hidden px-2 py-0">
                    <Box className="mt-2 flex items-center gap-2">
                      <CalendarMonthIcon sx={{ color: "common.black" }} />
                      <Chip
                        label={featuredNews.date}
                        color="primary"
                        variant="outlined"
                        sx={{ color: "common.black" }}
                        className="font-bold"
                      />
                    </Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      className="line-clamp-2 min-h-[3.6rem] break-words font-bold leading-tight"
                      sx={{
                        color: "common.black",
                      }}
                    >
                      {featuredNews.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="line-clamp-4 min-h-[6rem]"
                      sx={{
                        color: "common.black",
                      }}
                    >
                      {featuredNews.description}
                    </Typography>
                  </CardContent>
                  <CardActions className="mt-4 flex items-center justify-end p-0">
                    <Button
                      variant="contained"
                      className="rounded-none normal-case"
                    >
                      Подробнее
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid size={{ xs: 10, md: 4 }}>
                <Grid container spacing={2} className="h-full">
                  {smallNews.map((item) => (
                    <Grid size={{ xs: 12 }} key={item.id}>
                      <Card className="bg-secondary flex h-full rounded-none">
                        <CardMedia
                          image={item.image}
                          title={item.title}
                          className="aspect-[1/1] flex-shrink-0"
                        />
                        <Box className="flex flex-1 flex-col">
                          <CardContent className="flex-grow overflow-hidden px-2 py-0">
                            <Box className="flex items-center gap-1">
                              <CalendarMonthIcon
                                fontSize="small"
                                sx={{ color: "common.black" }}
                              />
                              <Chip
                                size="small"
                                label={item.date}
                                color="primary"
                                variant="outlined"
                                sx={{ color: "common.black" }}
                                className="font-bold"
                              />
                            </Box>
                            <Typography
                              variant="subtitle1"
                              className="mt-1 line-clamp-2 min-h-[2.5rem] break-words font-bold leading-tight"
                              sx={{ color: "common.black" }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="mt-1 line-clamp-3 min-h-[3.5rem] break-words leading-tight"
                              sx={{ color: "common.black" }}
                            >
                              {item.description}
                            </Typography>
                          </CardContent>
                          <CardActions className="flex items-center justify-end p-0">
                            <Button
                              variant="contained"
                              className="rounded-none normal-case"
                            >
                              Подробнее
                            </Button>
                          </CardActions>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ),
      )}
    </Box>
  )
}

export default NewsByCategories
