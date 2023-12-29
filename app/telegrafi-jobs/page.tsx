import React, { Suspense } from "react"
import { getTelegrafiJobListings } from "../lib/data"
import CardWrapper from "../ui/card-wrapper"
import ListingSkeleton from "../ui/listing-skeleton"

export default async function TelegrafiJobs() {
  const data = await getTelegrafiJobListings()
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <CardWrapper data={data} />
    </Suspense>
  )
}
