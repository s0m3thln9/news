import { useTogglePinMutation } from "@/api/news"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { updateNews } from "@/components/news-table/slice"

export const useTogglePinNews = () => {
  const [togglePinNews] = useTogglePinMutation()
  const dispatch = useAppDispatch()

  return async (uuid: string, refetch: () => void) => {
    try {
      const res = await togglePinNews({ uuid }).unwrap()
      if (res && res.data) {
        dispatch(updateNews(res.data))
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }
}
