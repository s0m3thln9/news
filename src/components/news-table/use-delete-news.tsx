import { useDeleteNewsMutation } from "@/api/news"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { deleteNewsFromTable } from "@/components/news-table/slice"

export const useDeleteNews = () => {
  const [deleteNews] = useDeleteNewsMutation()
  const dispatch = useAppDispatch()

  return async (data: { uuid: string }, refetch: () => void) => {
    try {
      const res = await deleteNews(data.uuid).unwrap()
      if (res && res.data) {
        dispatch(deleteNewsFromTable(res.data.uuid))
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }
}
