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

  // Gradient CSS par ligue — pas de fetch image, instantané
  const bgGradient = lg === 'NFL'
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)'   // bleu nuit NFL
    : lg === 'MLB'
    ? 'linear-gradient(135deg, #1a0a0a 0%, #3d1515 40%, #6b0f0f 100%)'   // rouge sombre MLB
    : lg === 'NBA'
    ? 'linear-gradient(135deg, #0a0a1a 0%, #1a1060 40%, #2d1b8e 100%)'   // bleu/violet NBA
    : 'linear-gradient(135deg, #001a2e 0%, #003d6b 40%, #005fa3 100%)'   // bleu glace NHL

  // URLs directes — next/og charge les images lui-même (pas de fetch base64)
  const homeLogo = `https://a.espncdn.com/i/teamlogos/${sport}/500/${home.toLowerCase()}.png`
  const awayLogo = `https://a.espncdn.com/i/teamlogos/${sport}/500/${away.toLowerCase()}.png`
  const leagueLogo = `https://a.espncdn.com/i/teamlogos/leagues/500/${sport}.png`

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
          background: bgGradient,
        }}
      >
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
