import { ComponentProps, FC } from "react"
import { cn } from "@/utils/cn"
import { Box, TextField, Typography } from "@mui/material"

type InputProps = ComponentProps<typeof TextField> & {
  value?: string
  onValueChange?: (newValue: string) => void
  label: string
  errorMessage?: string | null
  containerClassName?: string
}

export const Input: FC<InputProps> = ({
  label,
  value,
  onValueChange,
  className,
  containerClassName,
  errorMessage,
  type = "text",
  ...props
}) => {
  return (
    <Box className={cn("flex flex-col gap-1", containerClassName)}>
      <div className="flex items-center justify-between">
        <Typography>{label}</Typography>
        {errorMessage && (
          <Typography className={"text-error-main"}>{errorMessage}</Typography>
        )}
      </div>
      <TextField
        type={type}
        className={cn("border px-2.5 py-2 !text-black", className)}
        value={value}
        variant="standard"
        slotProps={{
          input: {
            disableUnderline: true,
            classes: {
              root: "p-0 m-0",
              input: "p-0 m-0 bg-transparent",
            },
            sx: {
              color: "common.black",
            },
          },
          inputLabel: {
            className: "hidden",
          },
          formHelperText: {
            className: "hidden",
          },
        }}
        onChange={(e) => onValueChange && onValueChange(e.target.value)}
        {...props}
      />
    </Box>
  )
}
