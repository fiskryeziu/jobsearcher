import React from "react"

export default function ListingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 animate-pulse">
      {Array.from({ length: 6 }, (_, x) => x).map((_, idx) => (
        <div key={idx} className="flex h-28 w-full bg-secondary rounded-md">
          <div className="w-[100px] h-[100px] block bg-secondaryDarker my-auto mx-2" />
          <div className="flex flex-col text-white p-2 justify-evenly">
            <div className="w-36 h-2 bg-secondaryDarker"></div>
            <div className="w-28 h-2 bg-secondaryDarker"></div>
            <div className="w-28 h-2 bg-secondaryDarker"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
