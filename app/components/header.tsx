"use client"

import Image from "next/image"
import { Banner } from "./banner"
import logo from "@/public/logo.svg"

interface HeaderProps {
  bannerUrl?: string
}

export function Header({ bannerUrl }: HeaderProps) {
  return (
    <div className="w-full">
      {/* Header content */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3 relative">
          {/* Using Next.js Image component for SVG */}
          <div className="relative">
            <Image src={logo || "/placeholder.svg"} alt="DeneyForum Logo" width={40} height={40} />
            {/* Beta label */}
            <div className="absolute -top-2 -right-6 bg-blue-500 text-white text-xs px-1 rounded-md">BETA</div>
          </div>
          <h1 className="font-bold text-2xl">DeneyForum</h1>
        </div>
      </div>

      {/* Banner below header */}
      {bannerUrl && <Banner imageUrl={bannerUrl} height="h-20" fit="contain" infoUrl="https://ads.google.com" />}
    </div>
  )
}
