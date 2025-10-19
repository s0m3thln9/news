"use client"

import { useCreateNewsForm } from "@/components/create-news-form/create-news-form"
import { useCreateNewsSubmit } from "@/components/create-news-form/create-news-submit"
import { useUploadFile } from "@/components/create-news-form/upload-file"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useTranslation } from "@/providers/i18n-provider"
import { FC, useState, useRef, type ChangeEvent } from "react"
import { flushSync } from "react-dom"
import { Controller } from "react-hook-form"
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material"
import { Input } from "@/components/ui/input"
import { TipTapEditor } from "./tip-tap-editor"

export const CreateNewsForm: FC = () => {
  const t = useTranslation()

  const locations = useAppSelector((state) => state.locationsSlice.locations)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    clearErrors,
  } = useCreateNewsForm()

  const onSubmit = useCreateNewsSubmit()

  const upload = useUploadFile()

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      upload({ image: file }).then((data) => {
        setValue("images", [data?.public_id || ""], { shouldValidate: true })
      })
    }
  }

  const handleClear = () => {
    const defaultValues = {
      locationUuid: "",
      content: "",
      title: "",
      description: "",
      images: [],
    }
    reset(defaultValues, { keepErrors: false, keepDirty: false })
    flushSync(() => {
      setValue("locationUuid", "")
      setValue("content", "")
      setValue("title", "")
      setValue("description", "")
      setValue("images", [])
    })
    clearErrors()
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const {
    ref: formRef,
    onChange: formOnChange,
    ...rest
  } = register("images", { required: t("news.validation.imagesRequired") })

  const mergedRef = (node: HTMLInputElement | null) => {
    fileInputRef.current = node
    formRef(node)
  }

  const mergedOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    void formOnChange(e)
    handleImageChange(e)
  }

  return (
    <>
      <Typography
        variant="h5"
        className="text-primary border-primary-main border-b-4 pb-2.5 font-bold"
        color="primary"
      >
        {t("news.createNews")}
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-secondary-main mt-10 border-4 p-10"
      >
        <div className="mb-4">
          <Typography className="mb-2">{t("news.mainImage")}</Typography>
          {errors.images?.message && (
            <Typography className="text-error-main">
              {errors.images.message}
            </Typography>
          )}
          <label
            htmlFor="file-upload"
            className="file:border-primary-main text-secondary-main file:text-primary-main border-primary-main inline-flex w-full max-w-96 cursor-pointer items-center justify-center rounded border bg-white px-8 py-2 font-[Inter] text-sm font-bold uppercase transition-colors hover:bg-gray-50"
          >
            {t("editor.labels.selectImage")}{" "}
          </label>
          <input
            id="file-upload"
            ref={mergedRef}
            type="file"
            accept="image/*"
            onChange={mergedOnChange}
            className="hidden"
            {...rest}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt={t("images.previewAlt")}
              className="mt-2 max-h-64 object-cover"
            />
          )}
        </div>
        <Box className="mb-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Typography>{t("news.section")}</Typography>
            {errors.locationUuid?.message && (
              <Typography className={"text-error-main"}>
                {errors.locationUuid.message}
              </Typography>
            )}
          </div>
          <Controller
            name="locationUuid"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                onChange={onChange}
                value={value}
                variant="standard"
                fullWidth
                placeholder={t("news.selectSection")}
                className="border px-2.5 py-2 !text-black"
                error={!!errors.locationUuid}
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
                {locations.map((location) => (
                  <MenuItem
                    key={location.uuid}
                    value={location.uuid}
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    {location.title}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
        <Input
          {...register("title")}
          errorMessage={errors.title?.message}
          label={t("news.title")}
          className="mb-4"
          fullWidth
        />
        <Input
          {...register("description")}
          errorMessage={errors.description?.message}
          label={t("news.shortDescription")}
          className="mb-4"
          multiline
          rows={3}
          fullWidth
        />
        <Box className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <Typography>{t("news.fullDescription")}</Typography>
            {errors.content?.message && (
              <Typography className={"text-error-main"}>
                {errors.content.message}
              </Typography>
            )}
          </div>
          <TipTapEditor
            key={getValues("content")}
            value={getValues("content")}
            onChange={(value) =>
              setValue("content", value, { shouldValidate: true })
            }
            upload={upload}
          />
        </Box>
        <Box className="flex justify-end gap-4">
          <Button type="button" variant="outlined" onClick={handleClear}>
            {t("news.clear")}
          </Button>
          <Button type="submit" variant="contained">
            {t("news.create")}
          </Button>
        </Box>
      </form>
    </>
  )
}
