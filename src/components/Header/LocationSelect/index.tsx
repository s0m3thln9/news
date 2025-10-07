"use client"

import { Box } from "@mui/material"

import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import { useAppSelector } from "@/hooks/useAppSelector"
import { usePathname, useRouter } from "next/navigation"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { setCurrentLocation } from "@/features/locations/slice"
import { cn } from "@/utils/cn"
import { Select } from "@base-ui-components/react/select"
import { useTranslation } from "@/components/providers/I18Provider"
import { SelectBody, SelectRoot, SelectTrigger } from "@/components/ui/select"
import { Button } from "@/components/ui/Button"

export const LocationSelect = () => {
  const locations = useAppSelector((state) => state.locationsSlice.locations)
  const brothers = useAppSelector((state) => state.locationsSlice.brothers)
  const currentLocation = useAppSelector(
    (state) => state.locationsSlice.currentLocation,
  )

  const t = useTranslation()
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
      currentLocation?.uuid !== brothers?.uuid
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
          className={`relative flex h-full items-center justify-center self-stretch rounded-none bg-transparent px-4 font-bold normal-case hover:bg-white/10`}
          onClick={handleHomeClick}
        >
          <HomeRoundedIcon fontSize="large" className={"fill-white"} />
        </Button>
        <SelectRoot
          items={locations.map((location) => ({
            label: location.title,
            value: location.uuid,
          }))}
          defaultValue={t("header.universityList")}
        >
          <SelectTrigger />
          <SelectBody>
            {locations.map(({ uuid, title }) => (
              <Select.Item
                key={uuid}
                value={uuid}
                className="hover:bg-primary-main/10 relative flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm outline-none select-none"
                onClick={() => handleLocationSelect(uuid)}
              >
                <Select.ItemText className="font-normal">
                  {title}
                </Select.ItemText>
              </Select.Item>
            ))}
          </SelectBody>
        </SelectRoot>
      </Box>
      <Button
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
