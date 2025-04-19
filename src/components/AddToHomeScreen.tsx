import React, { useEffect, useState } from 'react'

const AddToHomeScreen = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler as any)

    return () => window.removeEventListener('beforeinstallprompt', handler as any)
  }, [])

  const handleClick = async () => {
    if (!deferredPrompt) return
    ;(deferredPrompt as any).prompt()

    const { outcome } = await (deferredPrompt as any).userChoice
    if (outcome === 'accepted') {
      console.log('User accepted the A2HS prompt')
    } else {
      console.log('User dismissed the A2HS prompt')
    }
    setDeferredPrompt(null)
    setShowButton(false)
  }

  if (!showButton) return null

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
    >
      Add to Home Screen
    </button>
  )
}

export default AddToHomeScreen
