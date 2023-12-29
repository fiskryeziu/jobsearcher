import React, { Suspense } from "react"
import { getOfertaPuneJobListings } from "@/app/lib/data"
import CardWrapper from "../ui/card-wrapper"
import ListingSkeleton from "../ui/listing-skeleton"

export default async function OfertaPuneJobs() {
  const data = await getOfertaPuneJobListings()
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <CardWrapper data={data} />
    </Suspense>
  )
}
