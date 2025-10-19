"use client"

import "./style.css"
import { ExtendedImage } from "@/components/create-news-form/tip-tap-editor/extensions"
import { Box } from "@mui/system"
import { type ChangeEvent, FC } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { Button } from "@mui/material"
import { useEditor } from "@tiptap/react"
import { EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import UndoIcon from "@mui/icons-material/Undo"
import RedoIcon from "@mui/icons-material/Redo"
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft"
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter"
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight"
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify"
import ImageIcon from "@mui/icons-material/Image"

interface TipTapEditorProps {
  value?: string
  onChange?: (html: string) => void
  upload?: (data: { image: File }) => Promise<{ public_id: string } | undefined>
}

const buttonBaseClass =
  "bg-transparent border border-gray-300 px-2.5 py-2 !text-black hover:bg-gray-50 transition-colors rounded-none min-w-[50px] disabled:opacity-50 disabled:cursor-not-allowed"

const maxFileSize = 5 * 1024 * 1024
const UPLOADS_URL = process.env.NEXT_PUBLIC_UPLOADS || ""

export const TipTapEditor: FC<TipTapEditorProps> = ({
  value = "",
  onChange,
  upload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      ExtendedImage,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (html !== value) {
        onChange?.(html)
      }
    },
  })

  useEffect(() => {
    if (editor && value !== undefined) {
      const currentHtml = editor.getHTML()
      if (currentHtml !== value) {
        editor.commands.setContent(value)
      }
    }
  }, [editor, value])

  const handleAddImage = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Выберите файл изображения (jpg, png, gif, webp)")
      return
    }

    if (file.size > maxFileSize) {
      alert("Размер файла не должен превышать 5 МБ")
      return
    }

    if (!upload) {
      alert("Функция загрузки недоступна")
      return
    }

    try {
      const data = await upload({ image: file })
      if (data?.public_id) {
        const src = `${UPLOADS_URL}${data.public_id}`
        editor
          ?.chain()
          .focus()
          .setImage({
            src,
            alt: file.name,
          })
          .run()
      } else {
        alert("Ошибка загрузки изображения")
      }
    } catch (error) {
      console.log(error)
      alert("Ошибка при загрузке изображения на сервер")
    }

    e.target.value = ""
  }

  return (
    <Box className="flex flex-col gap-4">
      <Box className="border-secondary-main flex border p-4">
        <Box className="flex gap-4">
          <Box className="flex gap-1">
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={buttonBaseClass}
              aria-label="Жирный"
            >
              <FormatBoldIcon fontSize="small" />
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={buttonBaseClass}
              aria-label="Курсив"
            >
              <FormatItalicIcon fontSize="small" />
            </Button>
          </Box>
          <Box className="flex gap-1">
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={buttonBaseClass}
              aria-label="Заголовок H2"
            >
              H1
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={buttonBaseClass}
              aria-label="Подзаголовок H3"
            >
              H2
            </Button>
          </Box>
          <Box className="flex gap-1">
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={buttonBaseClass}
              aria-label="Маркированный список"
            >
              <FormatListBulletedIcon fontSize="small" />
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={buttonBaseClass}
              aria-label="Нумерованный список"
            >
              <FormatListNumberedIcon fontSize="small" />
            </Button>
          </Box>
          <Box className="flex gap-1">
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().undo().run()}
              className={buttonBaseClass}
              aria-label="Отменить"
              disabled={!editor?.can().undo()}
            >
              <UndoIcon fontSize="small" />
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => editor?.chain().focus().redo().run()}
              className={buttonBaseClass}
              aria-label="Повторить"
              disabled={!editor?.can().redo()}
            >
              <RedoIcon fontSize="small" />
            </Button>
          </Box>
          <Box className="flex gap-1">
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => {
                const { state } = editor!
                const { selection } = state
                const node = state.doc.nodeAt(selection.from)
                if (node?.type.name === "image") {
                  editor
                    ?.chain()
                    .focus()
                    .updateAttributes("image", { alignment: "left" })
                    .run()
                } else {
                  editor?.chain().focus().setTextAlign("left").run()
                }
              }}
              className={buttonBaseClass}
              aria-label="Выравнивание по левому краю"
            >
              <FormatAlignLeftIcon fontSize="small" />
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => {
                const { state } = editor!
                const { selection } = state
                const node = state.doc.nodeAt(selection.from)
                if (node?.type.name === "image") {
                  editor
                    ?.chain()
                    .focus()
                    .updateAttributes("image", { alignment: "center" })
                    .run()
                } else {
                  editor?.chain().focus().setTextAlign("center").run()
                }
              }}
              className={buttonBaseClass}
              aria-label="Выравнивание по центру"
            >
              <FormatAlignCenterIcon fontSize="small" />
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => {
                const { state } = editor!
                const { selection } = state
                const node = state.doc.nodeAt(selection.from)
                if (node?.type.name === "image") {
                  editor
                    ?.chain()
                    .focus()
                    .updateAttributes("image", { alignment: "right" })
                    .run()
                } else {
                  editor?.chain().focus().setTextAlign("right").run()
                }
              }}
              className={buttonBaseClass}
              aria-label="Выравнивание по правому краю"
            >
              <FormatAlignRightIcon fontSize="small" />
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={() => {
                const { state } = editor!
                const { selection } = state
                const node = state.doc.nodeAt(selection.from)
                if (node?.type.name === "image") {
                  editor
                    ?.chain()
                    .focus()
                    .updateAttributes("image", { alignment: "justify" })
                    .run()
                } else {
                  editor?.chain().focus().setTextAlign("justify").run()
                }
              }}
              className={buttonBaseClass}
              aria-label="Выравнивание по ширине"
            >
              <FormatAlignJustifyIcon fontSize="small" />
            </Button>
          </Box>
          <Box className="flex gap-1">
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={handleAddImage}
              className={buttonBaseClass}
              aria-label="Вставить изображение из файла"
            >
              <ImageIcon fontSize="small" />
            </Button>
          </Box>
        </Box>
      </Box>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <EditorContent
        className="border-secondary-main border p-4"
        editor={editor}
      />
    </Box>
  )
}
