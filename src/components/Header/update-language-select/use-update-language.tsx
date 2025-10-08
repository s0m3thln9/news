import { useUpdateLanguageMutation } from "@/api/user"
import { signIn } from "@/features/user/slice"
import { $Enums } from "@/generated/prisma"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import Language = $Enums.Language

export const useUpdateLanguage = () => {
  const [updateLanguage] = useUpdateLanguageMutation()
  const dispatch = useAppDispatch()

  return async (data: { language: Language }) => {
    try {
      const res = await updateLanguage(data).unwrap()
      if (res && res.data) {
        dispatch(signIn(res.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
