import { Select } from "@base-ui-components/react/select"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { ComponentProps, FC, ReactNode } from "react"
import { cn } from "@/utils/cn"

export const SelectRoot = Select.Root

type SelectTriggerProps = ComponentProps<typeof Select.Trigger> & {
  valueClassName?: string
  iconClassName?: string
}

export const SelectTrigger: FC<SelectTriggerProps> = ({
  className,
  valueClassName,
  iconClassName,
  ...props
}) => {
  return (
    <Select.Trigger
      className={cn(
        "flex h-10 min-w-[250px] cursor-pointer items-center justify-between self-stretch rounded-none px-4 text-sm font-bold duration-200 [&_svg]:fill-white [&_svg]:transition-transform data-[state=open]:[&_svg]:rotate-180",
        className,
      )}
      {...props}
    >
      <Select.Value
        className={cn(
          "text-base font-bold normal-case text-white",
          valueClassName,
        )}
      />
      <ExpandMoreIcon className={iconClassName} />
    </Select.Trigger>
  )
}

export const SelectBody = ({ children }: { children: ReactNode }) => {
  return (
    <Select.Portal>
      <Select.Positioner side="bottom" sideOffset={8}>
        <Select.Popup className="w-[230px] overflow-hidden border bg-white shadow-lg">
          <Select.List className="max-h-60 overflow-auto">
            {children}
          </Select.List>
          <Select.ScrollDownArrow />
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  )
}
