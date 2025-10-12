"use client"

import { useAppSelector } from "@/hooks/use-app-selector"
import { FC, useEffect } from "react"
import { Box, Grid } from "@mui/material"
import { LocationWithNews } from "@/types/dto/location-with-news"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { updateLocationWithNews } from "@/features/locations/slice"
import { NewsDTO } from "@/types/dto/news"

type LocationNewsPageProps = {
  location: LocationWithNews
}

export const LocationNewsPage: FC<LocationNewsPageProps> = ({ location }) => {
  const userLanguage =
    useAppSelector((state) => state.userSlice.user?.language) || "ru"

  const dispatch = useAppDispatch()

  const news =
    useAppSelector((state) => state.locationsSlice.currentLocation?.news) ||
    location.news
  const isLoading = useAppSelector((state) => state.searchNewsSlice.isLoading)

  const router = useRouter()

  useEffect(() => {
    dispatch(updateLocationWithNews(location))
  }, [dispatch, location])

  return (
    <Grid
      container
      className="mx-auto mt-10 w-full max-w-[1440px] flex-col gap-2.5 px-6"
    >
      <h1 className={"text-primary-main text-2xl font-bold"}>
        {location.title}
      </h1>
      <Box
        className={
          "border-primary-main flex flex-col gap-2.5 border-t-[5px] py-10"
        }
      >
        {isLoading ? (
          <span>Загрузка...</span>
        ) : news.length === 0 ? (
          <span>Нет новостей</span>
        ) : (
          news.map((n: NewsDTO) => {
            const dateKey = new Date(n.createdAt).toLocaleDateString(
              `${userLanguage}-${userLanguage?.toUpperCase()}`,
              {
                day: "numeric",
                month: "long",
              },
            )

            return (
              <Box
                key={n.uuid}
                className={"flex cursor-pointer gap-10"}
                onClick={() => router.push(`/${n.uuid}`)}
              >
                <div
                  className={
                    "flex w-[500px] shrink-0 items-center justify-center"
                  }
                >
                  <img
                    src={process.env.NEXT_PUBLIC_UPLOADS + n.images[0]}
                    alt={n.title}
                    className={"w-full object-cover"}
                  />
                </div>
                <div className={"flex flex-col justify-between"}>
                  <div className={"flex flex-col gap-10"}>
                    <h3 className={"text-[32px] font-bold"}>{n.title}</h3>
                    <p>{n.content}</p>
                  </div>
                  <div className={"flex items-center justify-between"}>
                    <div className={"flex items-center gap-2.5"}>
                      <CalendarMonthIcon />
                      <span>{dateKey}</span>
                    </div>
                  </div>
                </div>
              </Box>
            )
          })
        )}
      </Box>
      <Button>Загрузить еще</Button>
    </Grid>
  )
}
