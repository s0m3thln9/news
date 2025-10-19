import { useUpdateNewsMutation } from "@/api/news"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { UpdateNewsRequestBody } from "@/server/services/news-service"
import { updateNews } from "@/components/news-table/slice"
import { useAppSelector } from "@/hooks/use-app-selector"
import { setEditNewsModalOpen } from "@/components/news-table/update-news-modal/slice"

export const useUpdateNews = () => {
  const [updateNewsMutation, { isLoading }] = useUpdateNewsMutation()
  const dispatch = useAppDispatch()
  const uuid = useAppSelector(
    (state) => state.editNewsModalSlice.currentNews?.uuid,
  )

  return [
    async (data: UpdateNewsRequestBody) => {
      try {
        const res = await updateNewsMutation({
          body: data,
          uuid: uuid || "",
        }).unwrap()
        if (res && res.data) {
          dispatch(updateNews(res.data))
          dispatch(setEditNewsModalOpen(false))
        }
      } catch (error) {
        console.log(error)
      }
    },
    isLoading,
  ] as const
}
