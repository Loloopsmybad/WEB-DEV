import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const DEVICE_ID = 'my-phone'

export default function MobileReporter() {
  const [status, setStatus] = useState('Connecting...')
  const [data, setData] = useState<any>({})
  const [weather, setWeather] = useState<any>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
      const json = await res.json()
     const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      )
      const geoJson = await geoRes.json()
      const city = geoJson.address.city || geoJson.address.town || geoJson.address.village || null
      setWeather({ ...json.current_weather, city })
    })
  }, [])

  useEffect(() => {
    const pushData = async () => {
        const title = (navigator as any).mediaSession?.metadata?.title
        const artist = (navigator as any).mediaSession?.metadata?.artist
        
      
      const nav = navigator as any
      let battery_level = null, battery_charging = null
      try {
        const bat = await nav.getBattery?.()
        if (bat) {
          battery_level = Math.round(bat.level * 100)
          battery_charging = bat.charging
        }
      } catch {}

      const conn = nav.connection || nav.mozConnection || nav.webkitConnection
      const network_type = conn?.effectiveType || (navigator.onLine ? 'online' : 'offline')

      const payload = {
        device_id: DEVICE_ID,
        battery_level,
        battery_charging,
        network_type,
        online: navigator.onLine,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        device_memory: nav.deviceMemory || null,
        weather_temp: weather?.temperature ?? null,
        weather_wind: weather?.windspeed ?? null,
        weather_code: weather?.weathercode ?? null,
        weather_city: weather?.city ?? null,
        now_playing_title: (navigator as any).mediaSession?.metadata?.title || null,
        now_playing_artist: (navigator as any).mediaSession?.metadata?.artist || null,
        updated_at: new Date().toISOString(),
      }

      setData(payload)

      const { error } = await supabase
        .from('device_data')
        .upsert(payload, { onConflict: 'device_id' })

      setStatus(error ? '❌ Error: ' + error.message : '✅ Live — sending data')
    }

    pushData()
    const interval = setInterval(pushData, 5000)
    return () => clearInterval(interval)
  }, [weather])

  return (
    <div style={{ fontFamily: 'monospace', padding: 24, background: '#111', color: '#eee', minHeight: '100vh' }}>
      <h2 style={{ color: '#22c55e' }}>📡 Mobile Reporter</h2>
      <p style={{ color: '#aaa', marginTop: 8 }}>{status}</p>
      <pre style={{ marginTop: 16, background: '#1a1a1a', padding: 16, borderRadius: 8, fontSize: 13 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}