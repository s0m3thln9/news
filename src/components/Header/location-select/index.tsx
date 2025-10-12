"use client"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { Box } from "@mui/material"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import { usePathname, useRouter } from "next/navigation"
import { setCurrentLocation } from "@/features/locations/slice"
import { cn } from "@/utils/cn"
import { Select } from "@base-ui-components/react/select"
import { useTranslation } from "@/providers/i18n-provider"
import { SelectBody, SelectRoot, SelectTrigger } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/hooks/use-app-selector"

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
    dispatch(setCurrentLocation(null))
    router.push("/")
  }

  const activeTab = (() => {
    if (pathname === "/") return "home"
    if (currentLocation?.title === "Вести братского народа") return "brothers"
    return "universities"
  })()

  const beforeClass = cn(
    "before:bg-primary-main before:absolute before:left-0 before:right-0 before:top-[-10px] before:z-[1] before:h-[10px] before:opacity-0",
    "before:transition-all before:duration-300 before:ease-in-out",
  )

  const placeholder = t("header.universityList")

  const getSelectValue = () => {
    if (isBrothers(currentLocation?.uuid || "")) {
      return placeholder
    }
    return currentLocation?.title || placeholder
  }

  return (
    <Box className="flex self-stretch">
      <Button
        className={cn(
          "relative flex h-full items-center justify-center self-stretch rounded-none bg-transparent px-4 font-bold normal-case transition-all duration-300 ease-in-out hover:bg-white/10",
          beforeClass,
          activeTab === "home"
            ? "bg-primary-main before:opacity-100"
            : "bg-transparent before:bg-transparent",
        )}
        onClick={handleHomeClick}
      >
        <HomeRoundedIcon fontSize="large" className="fill-white" />
      </Button>
      <Box
        className={cn(
          "relative flex py-1 transition-all duration-300 ease-in-out",
          beforeClass,
          activeTab === "universities"
            ? "bg-primary-main"
            : "bg-transparent before:bg-transparent",
        )}
      >
        <SelectRoot
          items={locations.map((location) => ({
            label: location.title,
            value: location.uuid,
          }))}
          value={getSelectValue()}
          onValueChange={handleLocationSelect}
        >
          <SelectTrigger />
          <SelectBody>
            {locations.map(({ uuid, title }) => (
              <Select.Item
                key={uuid}
                value={uuid}
                className="hover:bg-primary-main/10 relative flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm outline-none select-none"
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
          `relative flex h-full items-center self-stretch rounded-none px-5 font-bold text-white normal-case transition-all duration-300 ease-in-out`,
          beforeClass,
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
