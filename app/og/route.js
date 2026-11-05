import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const home = searchParams.get('home') || ''
  const away = searchParams.get('away') || ''
  const lg = (searchParams.get('lg') || 'NHL').toUpperCase()
  const time = searchParams.get('time') || ''

  const sport = lg === 'NFL' ? 'nfl' : lg === 'NBA' ? 'nba' : lg === 'MLB' ? 'mlb' : 'nhl'
  const espnSport = sport
  const homeLogo = `https://a.espncdn.com/i/teamlogos/${espnSport}/500/${home.toLowerCase()}.png`
  const awayLogo = `https://a.espncdn.com/i/teamlogos/${espnSport}/500/${away.toLowerCase()}.png`
  const leagueLogo = `https://a.espncdn.com/i/teamlogos/leagues/500/${sport}.png`
  const zoneUsLogo = 'https://raw.githubusercontent.com/Oviscores/lukas23/main/logo%20zone%20us.png'
  const bgImage = lg === 'NFL'
    ? 'https://raw.githubusercontent.com/Oviscores/zoneus-og-image/main/public/32adbd87-image.jpg'
    : lg === 'MLB'
    ? 'https://raw.githubusercontent.com/Oviscores/zoneus-og-image/main/public/d517eae8-image.jpg'
    : lg === 'NBA'
    ? 'https://raw.githubusercontent.com/Oviscores/zoneus-og-image/main/public/6d51a2c9-image.jpg'
    : 'https://raw.githubusercontent.com/Oviscores/zoneus-og-image/main/public/977b26b0-image.jpg'

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
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <img src={zoneUsLogo} width="250" height="70"
          style={{ position: 'absolute', top: '10px', objectFit: 'contain' }} />
        <img src={leagueLogo} width="60" height="60"
          style={{ position: 'absolute', top: '88px', objectFit: 'contain' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px' }}>
            <img src={homeLogo} width="300" height="300" style={{ objectFit: 'contain' }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '36px', fontWeight: 900, marginTop: '12px' }}>{home}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '200px' }}>
            <span style={{ color: 'white', fontSize: time ? '56px' : '96px', fontWeight: 900, opacity: 0.9 }}>
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
