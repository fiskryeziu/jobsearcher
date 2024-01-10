"use client"
import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BellAlertIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  StarIcon,
} from "@heroicons/react/16/solid"
import clsx from "clsx"
const links = [
  // {
  //   name: "Gjirafa | Top Punë",
  //   href: "/gjirafa-jobs",
  //   icon: StarIcon,
  //   color: "#FFFF00",
  // },
  {
    name: "KosovaJobs",
    href: "/kosova-jobs",
    icon: BriefcaseIcon,
    color: "#8e562e",
  },
  {
    name: "Telegrafi Jobs",
    href: "/telegrafi-jobs",
    icon: BriefcaseIcon,
    color: "#2a9441",
  },
  {
    name: "Oferta Pune",
    href: "/ofertapune-jobs",
    icon: DocumentTextIcon,
    color: "#ffffff",
  },
  // {
  //   name: "Superpuna",
  //   href: "/superpuna",
  //   icon: BellAlertIcon,
  //   color: "#FFFF00",
  // },
]
function NavLink() {
  const pathname = usePathname()
  return (
    <div className="flex flex-row md:flex-col">
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex p-3 space-x-3 grow items-center justify-center hover:backdrop-brightness-125 hover:duration-200 hover:ease-in duration-200 ease-in md:justify-start",
              { "bg-secondaryDarker ": pathname === link.href }
            )}
          >
            <LinkIcon className="w-6" color={link.color} />
            <p
              className={clsx("hidden md:block text-white", {
                "text-green-600": pathname === link.href,
              })}
            >
              {link.name}
            </p>
          </Link>
        )
      })}
    </div>
  )
}

export default NavLink
