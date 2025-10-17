"use client"

import { FC, useState, useRef } from "react"
import { cn } from "@/utils/cn"
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material"
import { Input } from "@/components/ui/input"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
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

  const toolbar = useMemo(
    () => (
      <div className="mb-2 flex gap-2 rounded border p-2">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={cn(
            "rounded px-2 py-1",
            editor?.isActive("bold") ? "bg-blue-500 text-white" : "bg-gray-200",
          )}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={cn(
            "rounded px-2 py-1",
            editor?.isActive("italic")
              ? "bg-blue-500 text-white"
              : "bg-gray-200",
          )}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={cn(
            "rounded px-2 py-1",
            editor?.isActive("bulletList")
              ? "bg-blue-500 text-white"
              : "bg-gray-200",
          )}
        >
          List
        </button>
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            "rounded px-2 py-1",
            editor?.isActive("heading", { level: 2 })
              ? "bg-blue-500 text-white"
              : "bg-gray-200",
          )}
        >
          H2
        </button>
      </div>
    ),
    [editor],
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow"
    >
      <Typography variant="h5" className="mb-6 text-center">
        Добавить новость
      </Typography>

      <div className="mb-4">
        <Typography className="mb-2">Главная картинка</Typography>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-2 h-32 w-32 rounded object-cover"
          />
        )}
      </div>

      <FormControl fullWidth className="mb-4">
        <InputLabel>Раздел</InputLabel>
        <Select
          value={formData.section}
          label="Раздел"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, section: e.target.value }))
          }
        >
          {sections.map((section) => (
            <MenuItem key={section} value={section}>
              {section}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
        <Button
          type="button"
          variant="outlined"
          onClick={handleClear}
          className="px-6"
        >
          Очистить
        </Button>
        <Button type="submit" variant="contained" className="bg-blue-500 px-6">
          Отправить
        </Button>
      </Box>
    </form>
  )
}
