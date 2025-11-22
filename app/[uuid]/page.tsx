import { NewsPage } from "@/components/news-page"
import { getOneNews } from "@/server/services/news-service"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ uuid: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuid || !uuidRegex.test(uuid)) {
    return {}
  }

  const news = await getOneNews(uuid)

  if (!news) {
    return {
      title: "Новость не найдена",
    }
  }

  return {
    title: news.title,
    description: news.description || "Подробности читайте на сайте Союз Вестей",
    openGraph: {
      title: news.title,
      description: news.description,
      images: news.image ? [news.image] : [],
      type: "article",
    },
  }
}

export default async function NewsPageServer({
  params,
}: {
  params: Promise<{ uuid: string }>
}) {
  const { uuid } = await params
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuid || !uuidRegex.test(uuid)) {
    notFound()
  }

  const news = await getOneNews(uuid)

  if (!news) {
    return notFound()
  }

  return <NewsPage news={news} />
}
