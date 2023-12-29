import React, { Suspense } from "react"
import { getSuperpunaJobListings } from "../lib/data"
import CardWrapper from "../ui/card-wrapper"
import ListingSkeleton from "../ui/listing-skeleton"

export default async function Superpuna() {
  const data = await getSuperpunaJobListings()
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <CardWrapper data={data} />
    </Suspense>
  )
}
