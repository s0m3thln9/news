"use client"

import { Box, Button, FormControl, MenuItem, Select } from "@mui/material"

import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import { Translate } from "@/components/ui/translate"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { setCurrentLocation } from "@/features/locations/slice"

export const LocationSelect = () => {
  const locations = useAppSelector((state) => state.locationsSlice.locations)
  const currentLocation = useAppSelector(
    (state) => state.locationsSlice.currentLocation,
  )

  const router = useRouter()
  const dispatch = useAppDispatch()

  const selectedUniversity = currentLocation?.uuid || ""

  const handleLocationSelect = (uuid: string) => {
    if (uuid === currentLocation?.uuid) return

    const newLocation =
      locations.find((location) => location.uuid === uuid) || null
    dispatch(setCurrentLocation(newLocation))

    router.replace(`/locations/${uuid}`)
  }

  const handleHomeClick = () => {
    router.push("/")
  }

  const activeTab =
    currentLocation?.title !== "Вести братского народа"
      ? "universities"
      : "brothers"

  return (
    <Box className="flex items-center self-stretch">
      <Button
        variant="text"
        size="medium"
        className="relative flex items-center self-stretch rounded-none px-5 font-bold normal-case transition-all duration-300"
        sx={{
          color: "common.white",
          bgcolor:
            activeTab === "universities" ? "primary.main" : "transparent",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -10,
            left: 0,
            right: 0,
            height: "10px",
            backgroundColor: "primary.main",
            zIndex: 1,
            opacity:
              currentLocation?.title !== "Вести братского народа" ? "1" : "0",
            transition: "all 0.3s ease",
          },
        }}
        onClick={handleHomeClick}
      >
        <HomeRoundedIcon fontSize="large" />
      </Button>
      <FormControl
        variant="standard"
        size="small"
        className="flex h-full items-center justify-center self-stretch px-4 transition-all duration-300"
        sx={{
          bgcolor:
            activeTab === "universities" ? "primary.main" : "transparent",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -10,
            left: 0,
            right: 0,
            height: "10px",
            backgroundColor: "primary.main",
            zIndex: 1,
            opacity: activeTab === "universities" ? "1" : "0",
            transition: "all 0.3s ease",
          },
        }}
      >
        <Select
          value={selectedUniversity || ""}
          onChange={(e) => handleLocationSelect(e.target.value as string)}
          displayEmpty
          sx={{
            color: "common.white",
            bgcolor: "transparent",
            "& .MuiSvgIcon-root": {
              color: "common.white",
            },
            "& .MuiSelect-select": {
              padding: "4px 0",
            },
            minWidth: 230,
          }}
          className="rounded-none text-sm font-bold transition-all duration-300"
          renderValue={(value) => {
            if (!value) {
              return <Translate value="header.universityList" />
            }
            const location = locations.find((loc) => loc.uuid === value)
            return (
              location?.title || <Translate value="header.universityList" />
            )
          }}
        >
          {locations
            .filter((location) => location.title !== "Вести братского народа")
            .map((location) => (
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
      <Button
        variant="text"
        size="medium"
        sx={{
          color: "common.white",
          backgroundColor:
            activeTab === "brothers" ? "primary.main" : "transparent",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -10,
            left: 0,
            right: 0,
            height: "10px",
            backgroundColor: "primary.main",
            zIndex: 1,
            opacity: activeTab === "brothers" ? "1" : "0",
            transition: "all 0.3s ease",
          },
        }}
        onClick={() =>
          handleLocationSelect(
            locations.find(
              (locations) => locations.title === "Вести братского народа",
            )?.uuid || "",
          )
        }
        className="relative flex items-center self-stretch rounded-none px-5 font-bold normal-case transition-all duration-300"
      >
        Вести братского народа
      </Button>
    </Box>
  )
}
