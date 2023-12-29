"use client"
import React from "react"
import { TJobListing } from "../lib/definitions"
import Card from "./card"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid"

export default function CardWrapper({ data }: { data: TJobListing[] }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-10 text-white">
        <Link
          href={"/"}
          className="flex w-auto hover:underline hover:text-primary"
        >
          <ArrowLongLeftIcon className="w-6" /> <p className="">Home</p>
        </Link>
        <p className="text-2xl text-center text-primary capitalize sm:text-left">
          {pathname.slice(1)} listings
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {data?.map((listing) => (
          <Card key={listing.idx} data={listing} />
        ))}
      </div>
    </div>
  )
}
