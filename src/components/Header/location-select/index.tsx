"use client"

import { Box, Button } from "@mui/material"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/cn"
import { Select } from "@base-ui-components/react/select"
import { useTranslation } from "@/providers/i18n-provider"
import { SelectBody, SelectRoot, SelectTrigger } from "@/components/ui/select"
import { useLocationHandlers } from "@/hooks/use-location-handlers"

export const LocationSelect = () => {
  const {
    locations,
    brothers,
    currentLocation,
    handleLocationSelect,
    handleHomeClick,
  } = useLocationHandlers()

  const t = useTranslation()
  const pathname = usePathname()

  const activeTab = (() => {
    if (pathname === "/" || pathname === "/news") return "home"
    if (currentLocation?.title === "Вести братского народа") return "brothers"
    return "universities"
  })()

  const beforeClass = cn(
    "before:bg-primary-main before:absolute before:left-0 before:right-0 before:top-[-10px] before:z-[1] before:h-[10px] before:opacity-0",
    "before:transition-all before:duration-300 before:ease-in-out",
  )

  const placeholder = t("header.universityList")

  const getSelectValue = () => {
    if (currentLocation?.uuid && brothers?.uuid === currentLocation.uuid) {
      return placeholder
    }
    return currentLocation?.title || placeholder
  }

  return (
    <Box className="flex self-stretch">
      <Button
        className={cn(
          "relative flex h-full items-center justify-center self-stretch rounded-none bg-transparent px-4 font-bold normal-case transition-all duration-300 ease-in-out max-lg:min-w-fit max-lg:px-2",
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
            ? "bg-primary-main before:opacity-100"
            : "bg-transparent before:bg-transparent",
        )}
      >
        <SelectRoot
          items={locations
            .filter((location) => location.uuid !== brothers?.uuid)
            .map((location) => ({
              label: location.title,
              value: location.uuid,
            }))}
          value={getSelectValue()}
          onValueChange={handleLocationSelect}
        >
          <SelectTrigger />
          <SelectBody>
            {locations
              .filter((location) => location.uuid !== brothers?.uuid)
              .map(({ uuid, title }) => (
                <Select.Item
                  key={uuid}
                  value={uuid}
                  className="hover:bg-primary-main/10 relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none"
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
          `relative flex items-center rounded-none px-5 font-bold normal-case text-white transition-all duration-300 ease-in-out max-lg:px-2`,
          beforeClass,
          activeTab === "brothers"
            ? "bg-primary-main before:opacity-100"
            : "bg-transparent before:bg-transparent",
        )}
      >
        {t("locations.brothers")}
      </Button>
    </Box>
  )
}
