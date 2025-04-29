"use client"

import { Banner } from "@/app/components/banner"

interface FooterProps {
  bannerUrl?: string
  year?: number
}

export function Footer({
  bannerUrl,
  year = new Date().getFullYear(),
}: FooterProps) {
  return (
    <div className="w-full">
      {/* Banner above footer */}
      {bannerUrl && (
        <Banner imageUrl={bannerUrl} height="h-20" fit="contain" infoUrl="https://example.com/footer-info" />
      )}
      {/* Footer content */}
      <div className="p-4 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {year} DeneyForum. All rights reserved.
          </div>
          <div className="flex gap-6">
            <p className="text-sm text-gray-500">
              Built By <a href="https://atillas.co" className="hover:text-sky-900">Atilla Colak</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
