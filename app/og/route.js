import { ImageResponse } from 'next/og'

export const runtime = 'edge'

async function fetchImageAsDataURL(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    const buf = await res.arrayBuffer()
    const mime = res.headers.get('content-type') || 'image/png'
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
    return `data:${mime};base64,${b64}`
  } catch (e) {
    return null
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const home = searchParams.get('home') || ''
  const away = searchParams.get('away') || ''
  const lg = (searchParams.get('lg') || 'NHL').toUpperCase()
  const time = searchParams.get('time') || ''

  const sport = lg === 'NFL' ? 'nfl' : lg === 'NBA' ? 'nba' : lg === 'MLB' ? 'mlb' : 'nhl'

  const [homeSrc, awaySrc, leagueSrc, zoneUsSrc] = await Promise.all([
    fetchImageAsDataURL(`https://a.espncdn.com/i/teamlogos/${sport}/500/${home.toLowerCase()}.png`),
    fetchImageAsDataURL(`https://a.espncdn.com/i/teamlogos/${sport}/500/${away.toLowerCase()}.png`),
    fetchImageAsDataURL(`https://a.espncdn.com/i/teamlogos/leagues/500/${sport}.png`),
    fetchImageAsDataURL('https://raw.githubusercontent.com/Oviscores/lukas23/main/logo%20zone%20us.png'),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
          position: 'relative',
        }}
      >
        {/* Logo Zone US */}
        {zoneUsSrc && (
          <img src={zoneUsSrc} width="250" height="70"
            style={{ position: 'absolute', top: '10px', objectFit: 'contain' }} />
        )}
        {/* Logo ligue */}
        {leagueSrc && (
          <img src={leagueSrc} width="60" height="60"
            style={{ position: 'absolute', top: '88px', objectFit: 'contain' }} />
        )}

        {/* Équipes */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '40px' }}>
          {/* Home */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px' }}>
            {homeSrc && <img src={homeSrc} width="300" height="300" style={{ objectFit: 'contain' }} />}
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '36px', fontWeight: 900, marginTop: '12px' }}>{home}</span>
          </div>

          {/* Centre */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '200px' }}>
            <span style={{ color: 'white', fontSize: time ? '56px' : '96px', fontWeight: 900, opacity: 0.9 }}>
              {time || '@'}
            </span>
          </div>

          {/* Away */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px' }}>
            {awaySrc && <img src={awaySrc} width="300" height="300" style={{ objectFit: 'contain' }} />}
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '36px', fontWeight: 900, marginTop: '12px' }}>{away}</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
