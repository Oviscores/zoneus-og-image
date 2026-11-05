import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const home = searchParams.get('home') || ''
  const away = searchParams.get('away') || ''
  const lg = (searchParams.get('lg') || 'NHL').toUpperCase()
  const time = searchParams.get('time') || ''

  const sport = lg === 'NFL' ? 'nfl' : lg === 'NBA' ? 'nba' : lg === 'MLB' ? 'mlb' : 'nhl'
  const zoneUsLogo = 'https://raw.githubusercontent.com/Oviscores/lukas23/main/logo%20zone%20us.png'
  const bgImageUrl = lg === 'NFL'
    ? 'https://zoneus-og-image-nine.vercel.app/32adbd87-image.jpg'
    : lg === 'MLB'
    ? 'https://zoneus-og-image-nine.vercel.app/d517eae8-image.jpg'
    : lg === 'NBA'
    ? 'https://zoneus-og-image-nine.vercel.app/6d51a2c9-image.jpg'
    : 'https://zoneus-og-image-nine.vercel.app/977b26b0-image.jpg'

  const toBase64 = async (url) => {
    const res = await fetch(url)
    const buf = await res.arrayBuffer()
    const mime = res.headers.get('content-type') || 'image/png'
    return `data:${mime};base64,${Buffer.from(buf).toString('base64')}`
  }

  const [bgImage, homeLogo, awayLogo, leagueLogo] = await Promise.all([
    toBase64(bgImageUrl),
    toBase64(`https://a.espncdn.com/i/teamlogos/${sport}/500/${home.toLowerCase()}.png`),
    toBase64(`https://a.espncdn.com/i/teamlogos/${sport}/500/${away.toLowerCase()}.png`),
    toBase64(`https://a.espncdn.com/i/teamlogos/leagues/500/${sport}.png`),
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img src={bgImage} width="1200" height="630"
          style={{ position: 'absolute', top: 0, left: 0, width: '1200px', height: '630px', objectFit: 'cover' }} />
        <img src={zoneUsLogo} width="300" height="84"
          style={{ position: 'absolute', top: '14px', objectFit: 'contain' }} />
        <img src={leagueLogo} width="90" height="90"
          style={{ position: 'absolute', top: '108px', objectFit: 'contain' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px' }}>
            <img src={homeLogo} width="300" height="300" style={{ objectFit: 'contain' }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '36px', fontWeight: 900, marginTop: '12px' }}>{home}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '200px' }}>
            <span style={{ color: 'white', fontSize: time ? '64px' : '96px', fontWeight: 900, textShadow: '0 2px 12px rgba(0,0,0,0.9)', letterSpacing: time ? '2px' : '0' }}>
              {time || '@'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px' }}>
            <img src={awayLogo} width="300" height="300" style={{ objectFit: 'contain' }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '36px', fontWeight: 900, marginTop: '12px' }}>{away}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
