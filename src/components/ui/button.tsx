import { ComponentProps, FC } from "react"
import { cn } from "@/utils/cn"
import { cva, VariantProps } from "class-variance-authority"

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>

const buttonVariants = cva(
  "cursor-pointer w-fit rounded-lg py-2 px-8 font-semibold text-text-brand-inverse flex gap-2.5 items-center justify-center",
  {
    variants: {
      variant: {
        primary: "bg-primary-main hover:bg-primary-main/80",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
)

export const Button: FC<ButtonProps> = ({
  type = "button",
  variant,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        buttonVariants({ variant }),
        disabled &&
          "bg-primary-main/50 hover:bg-primary-main/50 text-text-disabled",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
