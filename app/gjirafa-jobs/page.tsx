import React, { Suspense } from "react"
import { getGjirafaJobListings } from "../lib/data"
import { TJobListing } from "../lib/definitions"
import CardWrapper from "../ui/card-wrapper"
import ListingSkeleton from "../ui/listing-skeleton"

export default async function GjirafaJobs() {
  const data: TJobListing[] = await getGjirafaJobListings()
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <CardWrapper data={data} />
    </Suspense>
  )
}
