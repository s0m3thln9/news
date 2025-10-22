"use client"

import { useAppSelector } from "@/hooks/use-app-selector"
import { FormControl, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { Language } from "@/generated/prisma"
import { useUpdateLanguage } from "@/components/Header/update-language-select/use-update-language"

export const UpdateLanguageSelect = ({ color }: { color?: string }) => {
  const initialLanguage = useAppSelector((state) => state.userSlice.language)

  const [language, setLanguage] = useState<Language>(initialLanguage)

  const updateLanguage = useUpdateLanguage()

  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage)
    }
  }, [initialLanguage])

  return (
    <FormControl variant="standard" size="small">
      <Select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value as Language)
          void updateLanguage({ language: e.target.value as Language })
        }}
        label="Язык"
        autoWidth
        sx={{
          color: color ? color : "common.white",
          "& .MuiSvgIcon-root": {
            color: color ? color : "common.white",
          },
          "& .MuiSelect-select": {
            padding: "4px 0",
          },
        }}
        className="text-sm font-bold"
      >
        <MenuItem
          value="RU"
          sx={{
            color: "primary.main",
          }}
          className="font-bold"
        >
          RU
        </MenuItem>
        <MenuItem
          value="EN"
          sx={{
            color: "primary.main",
          }}
          className="font-bold"
        >
          EN
        </MenuItem>
      </Select>
    </FormControl>
  )
}
