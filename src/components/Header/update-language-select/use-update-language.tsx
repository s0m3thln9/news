import { useUpdateLanguageMutation } from "@/api/user"
import { signIn, updateLanguage } from "@/features/user/slice"
import { $Enums } from "@/generated/prisma"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import Language = $Enums.Language
import { useAppSelector } from "@/hooks/use-app-selector"

export const useUpdateLanguage = () => {
  const [updateLanguageMutation] = useUpdateLanguageMutation()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userSlice.user)

  return async (data: { language: Language }) => {
    try {
      if (!user) {
        localStorage.setItem("language", data.language)
        dispatch(updateLanguage(data.language))
        return
      }
      const res = await updateLanguageMutation(data).unwrap()
      if (res && res.data) {
        dispatch(signIn(res.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
