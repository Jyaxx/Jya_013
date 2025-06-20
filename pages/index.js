import { useState, useEffect } from 'react'

export default function Home() {
  const [time, setTime] = useState(1500)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if (!isActive && time !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
    if (!isActive) {
      alert(randomCheckIn())
    }
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(1500)
  }

  const randomCheckIn = () => {
    const prompts = [
      'Are you actually focusing or mindlessly scrolling?',
      'Rate your focus out of 10 right now. Improve it.',
      'Deep breath. Check posture. Are you tense?',
      'How meaningful is the task you’re doing?'
    ]
    return prompts[Math.floor(Math.random() * prompts.length)]
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div style={{ background: '#121212', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>FocusForge</h1>
      <div style={{ fontSize: '4rem', marginBottom: '30px' }}>{formatTime(time)}</div>
      <div>
        <button onClick={toggleTimer} style={{ marginRight: '10px', padding: '10px 20px', fontSize: '1.2rem', borderRadius: '8px', background: '#1DB954', color: '#fff', border: 'none' }}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer} style={{ padding: '10px 20px', fontSize: '1.2rem', borderRadius: '8px', background: '#E63946', color: '#fff', border: 'none' }}>Reset</button>
      </div>
    </div>
  )
}
