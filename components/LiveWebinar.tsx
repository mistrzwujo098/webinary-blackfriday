'use client'

import { Radio } from 'lucide-react'

interface LiveWebinarProps {
  streamUrl: string
}

export default function LiveWebinar({ streamUrl }: LiveWebinarProps) {
  return (
    <section className="bg-gradient-to-r from-red-600 to-pink-600 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative">
            <Radio className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Webinar trwa na żywo!
          </h2>
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={`${streamUrl}?embed=true`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
