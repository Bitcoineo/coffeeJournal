import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const STREAM_URL = 'https://streams.ilovemusic.de/iloveradio17.mp3'

const playerBtnStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'white',
  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
  border: 'none',
  cursor: 'pointer',
  fontFamily: "'Caveat', cursive",
  fontSize: 20,
  color: '#2a9d8f',
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL)
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const handlePlay = () => {
    audioRef.current?.play()
    setPlaying(true)
  }

  const handlePause = () => {
    audioRef.current?.pause()
    setPlaying(false)
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 text-center">
      {playing && (
        <div
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 14,
            color: '#2a9d8f',
            marginBottom: 8,
          }}
        >
          cosy jazz ♪
        </div>
      )}

      {playing ? (
        <motion.button
          onClick={handlePause}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={playerBtnStyle}
        >
          ■
        </motion.button>
      ) : (
        <button onClick={handlePlay} style={playerBtnStyle}>
          ♪
        </button>
      )}
    </div>
  )
}

export default MusicPlayer
