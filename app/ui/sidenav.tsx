import Link from "next/link"
import React from "react"
import NavLink from "./nav-links"

const SideNav = () => {
  return (
    <div className="flex h-full px-3 py-4 md:px-2">
      <div className="bg-secondary rounded-2xl grow w-full flex flex-col">
        <Link
          href="/"
          className="hidden text-2xl font-bold text-white text-center uppercase my-20 hover:text-primary md:block"
        >
          Kerko Pune
        </Link>
        <NavLink />
      </div>
    </div>
  )
}
export default SideNav
