"use client"

import { FC, useState, useRef } from "react"
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material"
import { Input } from "@/components/ui/input"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { useMemo } from "react"

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

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
    ],
    content: formData.fullContent,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, fullContent: editor.getHTML() }))
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, mainImage: file }))
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
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    editor?.commands.setContent("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      fullContent: formData.fullContent,
    }
    console.log("Отправляем новость:", submitData)
    alert("Новость добавлена!")
  }

  const buttonBaseClass =
    "bg-transparent border border-gray-300 px-2.5 py-2 !text-black hover:bg-gray-50 transition-colors rounded-none min-w-[40px]"

  const toolbar = useMemo(
    () => (
      <div className="border-secondary-main mb-2 border p-4">
        <div className="flex flex-wrap gap-1">
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={buttonBaseClass}
            >
              B
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={buttonBaseClass}
            >
              I
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              className={buttonBaseClass}
            >
              U
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              className={buttonBaseClass}
            >
              S
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().toggleCode().run()}
              className={`${buttonBaseClass} min-w-[60px]`}
            >
              Code
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <TextField
              select
              value={editor?.getAttributes("textStyle").fontSize || ""}
              onChange={(e) =>
                editor
                  ?.chain()
                  .focus()
                  .setFontSize(e.target.value as string)
                  .run()
              }
              variant="standard"
              className="min-w-[100px] border border-gray-300 px-2.5 py-2 !text-black"
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
                <em>Размер</em>
              </MenuItem>
              <MenuItem
                value="12px"
                className="bg-white text-black hover:bg-gray-100"
              >
                Маленький
              </MenuItem>
              <MenuItem
                value="16px"
                className="bg-white text-black hover:bg-gray-100"
              >
                Нормальный
              </MenuItem>
              <MenuItem
                value="20px"
                className="bg-white text-black hover:bg-gray-100"
              >
                Большой
              </MenuItem>
              <MenuItem
                value="24px"
                className="bg-white text-black hover:bg-gray-100"
              >
                Очень большой
              </MenuItem>
            </TextField>
          </div>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().setTextAlign("left").run()}
              className={`${buttonBaseClass} min-w-[50px]`}
            >
              Left
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
              className={`${buttonBaseClass} min-w-[50px]`}
            >
              Center
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
              className={`${buttonBaseClass} min-w-[50px]`}
            >
              Right
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() =>
                editor?.chain().focus().setTextAlign("justify").run()
              }
              className={`${buttonBaseClass} min-w-[60px]`}
            >
              Justify
            </Button>
          </div>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().undo().run()}
              className={`${buttonBaseClass} min-w-[50px]`}
            >
              Undo
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().redo().run()}
              className={`${buttonBaseClass} min-w-[50px]`}
            >
              Redo
            </Button>
          </div>
        </div>
      </div>
    ),
    [editor],
  )

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
          {toolbar}
          <EditorContent
            editor={editor}
            className="prose prose-sm min-h-[200px] max-w-none border p-4"
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
