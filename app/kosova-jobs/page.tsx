import React, { Suspense } from "react"
import { getKosovaJobListings } from "../lib/data"
import CardWrapper from "../ui/card-wrapper"
import ListingSkeleton from "../ui/listing-skeleton"

export default async function KosovaJobs() {
  const data = await getKosovaJobListings()
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <CardWrapper data={data} />
    </Suspense>
  )
}
