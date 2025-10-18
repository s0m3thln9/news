"use client"

import { FC, useState, useRef, type FormEvent, type ChangeEvent } from "react"
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material"
import { Input } from "@/components/ui/input"
import { TipTapEditor } from "./tip-tap-editor"

const sections = ["Спорт", "Технологии", "Культура", "Политика", "Экономика"]

export const CreateNewsForm: FC = () => {
  const [formData, setFormData] = useState({
    mainImage: null as File | null,
    section: "",
    title: "",
    shortDescription: "",
    fullContent: "",
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, mainImage: file }))
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleClear = () => {
    setFormData({
      mainImage: null,
      section: "",
      title: "",
      shortDescription: "",
      fullContent: "",
    })
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleFullContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, fullContent: content }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const submitData = new FormData()
    if (formData.mainImage) {
      submitData.append("mainImage", formData.mainImage)
    }
    submitData.append("section", formData.section)
    submitData.append("title", formData.title)
    submitData.append("shortDescription", formData.shortDescription)
    submitData.append("fullContent", formData.fullContent)
    console.log("Отправляем новость:", Object.fromEntries(submitData.entries()))
    alert("Новость добавлена!")
  }

  return (
    <>
      <Typography
        variant="h5"
        className="text-primary border-primary-main border-b-4 pb-2.5 font-bold"
        color="primary"
      >
        Создать новость
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="border-secondary-main mt-10 border-4 p-10"
      >
        <div className="mb-4">
          <Typography className="mb-2">Основное изображение</Typography>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file:border-primary-main text-secondary-main file:text-primary-main block min-w-96 file:mr-2 file:cursor-pointer file:border file:px-8 file:py-2 file:font-[Inter] file:text-sm file:font-bold file:uppercase"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 max-h-64 object-cover"
            />
          )}
        </div>
        <Box className="mb-4 flex flex-col gap-1">
          <Typography>Раздел</Typography>
          <TextField
            select
            value={formData.section}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, section: e.target.value }))
            }
            variant="standard"
            fullWidth
            className="border px-2.5 py-2 !text-black"
            slotProps={{
              input: {
                disableUnderline: true,
                classes: {
                  root: "p-0 m-0",
                  input: "p-0 m-0 bg-transparent !text-black",
                },
              },
              select: {
                displayEmpty: true,
              },
            }}
          >
            <MenuItem value="" disabled className="text-black">
              <em>Выберите раздел</em>
            </MenuItem>
            {sections.map((section) => (
              <MenuItem
                key={section}
                value={section}
                className="bg-white text-black hover:bg-gray-100"
              >
                {section}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Input
          label="Заголовок"
          value={formData.title}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, title: value }))
          }
          className="mb-4"
          fullWidth
        />
        <Input
          label="Краткое описание"
          value={formData.shortDescription}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, shortDescription: value }))
          }
          className="mb-4"
          multiline
          rows={3}
          fullWidth
        />
        <Box className="mb-4">
          <Typography className="mb-2">Полное описание</Typography>
          <TipTapEditor
            value={formData.fullContent}
            onChange={handleFullContentChange}
          />
        </Box>
        <Box className="flex justify-end gap-4">
          <Button type="button" variant="outlined" onClick={handleClear}>
            Очистить
          </Button>
          <Button type="submit" variant="contained">
            Создать
          </Button>
        </Box>
      </form>
    </>
  )
}
