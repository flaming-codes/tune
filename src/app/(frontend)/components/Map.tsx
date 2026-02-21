'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Office coordinates
const OFFICE_COORDINATES: [number, number] = [48.292619935041195, 16.417253828838724]

// Create a custom div icon to avoid image loading issues
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-neutral-900">
        <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

export function Map() {
  const [icon, setIcon] = useState<L.DivIcon | null>(null)

  useEffect(() => {
    setIcon(createCustomIcon())
  }, [])

  if (!icon) {
    return <div className="w-full h-full min-h-[400px] bg-neutral-100 animate-pulse" />
  }

  return (
    <div className="w-full h-full min-h-[400px] relative">
      <MapContainer
        center={OFFICE_COORDINATES}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '100%', minHeight: '400px', width: '100%' }}
        className="z-0 grayscale-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={OFFICE_COORDINATES} icon={icon}>
          <Popup>
            <div className="text-sm">
              <p className="font-medium">Tierarztpraxis Dr. Tune Lazri</p>
              <p className="text-neutral-600">Brünnerstraße 219-221</p>
              <p className="text-neutral-600">1210 Wien</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
