import { ImageResponse } from 'next/og'
export const config = { runtime: 'edge' }

export default async function handler(req) {
  const { searchParams } = new URL(req.url)
  const home = searchParams.get('home') || ''
  const away = searchParams.get('away') || ''
  const lg = (searchParams.get('lg') || 'NHL').toUpperCase()
  const time = searchParams.get('time') || ''

  const sport = lg === 'NFL' ? 'nfl' : lg === 'NBA' ? 'nba' : lg === 'MLB' ? 'mlb' : 'nhl'
  const homeLogo = `https://a.espncdn.com/i/teamlogos/${sport}/500/${home.toLowerCase()}.png`
  const awayLogo = `https://a.espncdn.com/i/teamlogos/${sport}/500/${away.toLowerCase()}.png`
  const leagueLogo = `https://a.espncdn.com/i/teamlogos/leagues/500/${sport}.png`
  const zoneUsLogo = 'https://raw.githubusercontent.com/Oviscores/lukas23/main/logo%20zone%20us.png'

  return new ImageResponse(
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
      {/* Logo Zone US en haut */}
      <img src={zoneUsLogo} style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', height: 70, objectFit: 'contain' }} />

      {/* Logo ligue */}
      <img src={leagueLogo} style={{ position: 'absolute', top: 88, left: '50%', transform: 'translateX(-50%)', height: 60, width: 60, objectFit: 'contain' }} />

      {/* Logos équipes + centre */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 40 }}>
        {/* Home */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400 }}>
          <img src={homeLogo} style={{ width: 300, height: 300, objectFit: 'contain' }} />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 36, fontWeight: 900, fontFamily: 'sans-serif', marginTop: 12 }}>{home}</span>
        </div>

        {/* Centre : heure ou VS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 200 }}>
          <span style={{ color: 'white', fontSize: time ? 56 : 96, fontWeight: 900, fontFamily: 'sans-serif', opacity: 0.9 }}>
            {time || '@'}
          </span>
        </div>

        {/* Away */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400 }}>
          <img src={awayLogo} style={{ width: 300, height: 300, objectFit: 'contain' }} />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 36, fontWeight: 900, fontFamily: 'sans-serif', marginTop: 12 }}>{away}</span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
