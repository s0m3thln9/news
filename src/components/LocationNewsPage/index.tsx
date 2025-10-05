"use client"

import { FC, useEffect } from "react"
import { Box, Button, Grid } from "@mui/material"
import { LocationWithNews } from "@/types/dto/location-with-news"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useAppDispatch } from "@/hooks/useAppDispatch"

type LocationNewsPageProps = {
  location: LocationWithNews
}

export const LocationNewsPage: FC<LocationNewsPageProps> = ({ location }) => {
  const userLanguage =
    useAppSelector((state) => state.userSlice.user?.language) || "ru"

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch
  }, [location])

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
        {location.news.map((news) => {
          const dateKey = new Date(news.createdAt).toLocaleDateString(
            `${userLanguage}-${userLanguage?.toUpperCase()}`,
            {
              day: "numeric",
              month: "long",
            },
          )

          return (
            <Box key={news.uuid} className={"flex gap-10"}>
              <div
                className={
                  "flex w-[500px] shrink-0 items-center justify-center"
                }
              >
                <img
                  src={process.env.NEXT_PUBLIC_UPLOADS + news.images[0]}
                  alt={news.title}
                  className={"w-full object-cover"}
                />
              </div>
              <div className={"flex flex-col justify-between"}>
                <div className={"flex flex-col gap-10"}>
                  <h3 className={"text-[32px] font-bold"}>{news.title}</h3>
                  <p>{news.content}</p>
                </div>
                <div className={"flex items-center justify-between"}>
                  <div className={"flex items-center gap-2.5"}>
                    <CalendarMonthIcon />
                    <span>{dateKey}</span>
                  </div>
                  <Button variant={"contained"}>Подробнее</Button>
                </div>
              </div>
            </Box>
          )
        })}
      </Box>
    </Grid>
  )
}
