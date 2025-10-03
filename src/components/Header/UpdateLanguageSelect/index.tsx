"use client"

import { FormControl, MenuItem, Select } from "@mui/material"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useState } from "react"
import { Language } from "@/generated/prisma"
import { useUpdateLanguage } from "@/components/Header/UpdateLanguageSelect/useUpdateLanguage"

export const UpdateLanguageSelect = () => {
  const user = useAppSelector((state) => state.userSlice.user)

  const [language, setLanguage] = useState<Language>(
    (user?.language as Language) || "RU",
  )

  const updateLanguage = useUpdateLanguage()

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
          color: "common.white",
          "& .MuiSvgIcon-root": {
            color: "common.white",
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
