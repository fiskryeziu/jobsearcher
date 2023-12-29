"use client"
import Link from "next/link"
import React, { useState } from "react"
import { TJobListing } from "../lib/definitions"
import Image from "next/image"
import sample from "../../public/sample.png"
import { usePathname } from "next/navigation"

export default function Card({ data }: { data: TJobListing }) {
  const [imageError, setImageError] = useState(false)
  const pathname = usePathname()
  const handleError = () => {
    setImageError(true)
  }
  return (
    <Link
      href={data.link}
      target="_blank"
      prefetch={false}
      className="flex h-28 w-full  bg-secondary rounded-md"
    >
      {imageError ? (
        <>
          <Image
            src={sample}
            alt="sample pic"
            width={100}
            height={100}
            className="hidden sm:block object-contain"
          />
          <Image
            src={sample}
            alt="sample pic"
            width={80}
            height={80}
            className="block sm:hidden object-contain"
          />
        </>
      ) : (
        <>
          <Image
            src={data.imgUrl || sample}
            priority={true}
            alt="company pic"
            width={100}
            height={100}
            className="hidden sm:block object-contain"
            onError={handleError}
          />
          <Image
            src={data.imgUrl || sample}
            priority={true}
            alt="company pic"
            width={80}
            height={80}
            className="block sm:hidden object-contain"
            onError={handleError}
          />
        </>
      )}
      <div className="flex flex-col text-white p-2 justify-evenly">
        <p className="font-semibold text-sm sm:font-bold">{data.title}</p>
        <p className="font-light text-xs sm:text-base">
          <span className="text-primary font-semibold pr-2">
            Shteti/Qyteti:
          </span>
          {data.country}
        </p>
        <p className="font-light text-xs sm:text-base">
          <span className="text-primary font-light sm:font-semibold pr-2">
            {pathname === "/superpuna" ? "Created on: " : "Expires: "}
          </span>
          {data.expireDate}
        </p>
      </div>
    </Link>
  )
}
