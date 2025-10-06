"use client"

import { Box, Button, FormControl, MenuItem, Select } from "@mui/material"

import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import { Translate } from "@/components/ui/translate"
import { useAppSelector } from "@/hooks/useAppSelector"
import { usePathname, useRouter } from "next/navigation"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { setCurrentLocation } from "@/features/locations/slice"
import { cn } from "@/utils/cn"

export const LocationSelect = () => {
  const locations = useAppSelector((state) => state.locationsSlice.locations)
  const brothers = useAppSelector((state) => state.locationsSlice.brothers)
  const currentLocation = useAppSelector(
    (state) => state.locationsSlice.currentLocation,
  )

  const router = useRouter()
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const findLocation = (uuid: string) =>
    locations.find((location) => location.uuid === uuid) || null

  const isBrothers = (uuid: string) =>
    brothers?.uuid === uuid ? brothers : null

  const handleLocationSelect = (uuid: string) => {
    if (
      currentLocation?.uuid === uuid &&
      currentLocation.uuid !== brothers?.uuid
    )
      return null
    const newLocation = findLocation(uuid) || isBrothers(uuid)
    dispatch(setCurrentLocation(newLocation))
    router.replace(`/locations/${uuid}`)
  }

  const handleHomeClick = () => {
    router.push("/")
  }

  const activeTab =
    pathname === "/" || currentLocation?.title !== "Вести братского народа"
      ? "universities"
      : "brothers"

  return (
    <Box className="flex self-stretch">
      <Box
        className={cn(
          "relative flex py-1 transition-all duration-300 ease-in-out",
          `before:bg-primary-main before:absolute before:top-[-10px] before:right-0 before:left-0 before:z-[1] before:h-[10px] before:opacity-0` +
            `before:transition-all before:duration-300 before:ease-in-out`,
          activeTab === "universities"
            ? "bg-primary-main"
            : "bg-transparent before:bg-transparent",
        )}
      >
        <Button
          variant="text"
          size="medium"
          className={`relative flex h-full items-center justify-center self-stretch rounded-none px-5 font-bold normal-case`}
          onClick={handleHomeClick}
        >
          <HomeRoundedIcon fontSize="large" className={"fill-white"} />
        </Button>
        <FormControl
          variant="standard"
          size="small"
          className={`flex h-full items-center justify-center self-stretch px-4`}
        >
          <Select
            value={currentLocation?.uuid || ""}
            onChange={(e) => handleLocationSelect(e.target.value as string)}
            displayEmpty
            className="min-w-[230px] rounded-none text-sm font-bold [&_svg]:fill-white"
            renderValue={(uuid) =>
              findLocation(uuid)?.title || (
                <Translate value="header.universityList" />
              )
            }
          >
            {locations.map((location) => (
              <MenuItem
                value={location.uuid}
                sx={{
                  color: "primary.main",
                }}
                className="font-bold"
                key={location.uuid}
              >
                {location.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="text"
        size="medium"
        onClick={() => handleLocationSelect(brothers?.uuid || "")}
        className={cn(
          `relative flex h-full items-center self-stretch rounded-none px-5 font-bold text-white normal-case transition-all duration-300 ease-in-out ` +
            `before:bg-primary-main before:absolute before:top-[-10px] before:right-0 before:left-0 before:z-[1] before:h-[10px] before:opacity-0` +
            `before:transition-all before:duration-300 before:ease-in-out`,
          activeTab === "brothers"
            ? "bg-primary-main before:opacity-100"
            : "bg-transparent before:bg-transparent",
        )}
      >
        Вести братского народа
      </Button>
    </Box>
  )
}
