import { ComponentProps, FC } from "react"
import { cn } from "@/utils/cn"
import { cva, VariantProps } from "class-variance-authority"

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>

const buttonVariants = cva(
  "cursor-pointer w-fit rounded-lg py-2 px-8 font-semibold text-text-brand-inverse flex gap-2.5 items-center",
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
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  )
}
