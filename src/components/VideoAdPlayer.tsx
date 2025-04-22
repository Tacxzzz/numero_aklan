import { useState } from 'react'
import { Button } from '@/components/ui/button'
import VideoAd from '@/files/PisoPlay Ad 1.mp4'

export function VideoAdPlayer() {
  const [overlayVisible, setOverlayVisible] = useState(true)

  // Hide overlay on hover (desktop)
  const handleMouseEnter = () => setOverlayVisible(false)
  const handleMouseLeave = () => setOverlayVisible(true)

  // Toggle overlay on tap (mobile)
  const handleTouchStart = () => setOverlayVisible((prev) => !prev)

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
      >
        <video
          src={VideoAd}
          controls
          className="w-full h-48 object-cover"
          poster="/placeholder-video-thumbnail.jpg"
        >
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
          <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
          AD
        </div>

        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
          Sponsored
        </div>

        {overlayVisible && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transition-opacity duration-200">
            <h3 className="font-bold text-white text-lg">Paano Kikita sa PisoPlay?</h3>
            <p className="text-white/80 text-sm">Enjoy this sponsored content</p>
          </div>
        )}
      </div>

      <div className="p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">
            P
          </div>
          <span className="ml-2 text-sm font-medium">Paano Kikita sa PisoPlay?</span>
        </div>

        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
        >
          Learn More
        </Button>
      </div>
    </div>
  )
}
