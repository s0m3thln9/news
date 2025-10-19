import { Select } from "@base-ui-components/react/select"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { ReactNode } from "react"

export const SelectRoot = Select.Root

export const SelectTrigger = () => {
  return (
    <Select.Trigger className="flex h-full min-w-[250px] cursor-pointer items-center justify-between self-stretch rounded-none px-4 text-sm font-bold duration-200 [&_svg]:fill-white [&_svg]:transition-transform data-[state=open]:[&_svg]:rotate-180">
      <Select.Value className="text-base font-bold text-white normal-case" />
      <ExpandMoreIcon />
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
