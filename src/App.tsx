import { useState, useEffect } from 'react'
import AddEntry from './components/AddEntry'
import EntryList from './components/EntryList'
import MusicPlayer from './components/MusicPlayer'
import type { CoffeeEntry } from './types'

const filters: { label: string; value: number | null }[] = [
  { label: 'all', value: null },
  { label: '★★★★★', value: 5 },
  { label: '★★★★', value: 4 },
  { label: '★★★', value: 3 },
]

function playShutterSound() {
  const ctx = new AudioContext()

  // White noise burst (0.08s)
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  const noiseGain = ctx.createGain()
  noiseGain.gain.setValueAtTime(0.3, ctx.currentTime)
  noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)
  noise.connect(noiseGain).connect(ctx.destination)
  noise.start()

  // Low thud (80Hz, 0.1s)
  const osc = ctx.createOscillator()
  osc.frequency.value = 80
  const oscGain = ctx.createGain()
  oscGain.gain.setValueAtTime(0.4, ctx.currentTime)
  oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
  osc.connect(oscGain).connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.1)
}

function App() {
  const [entries, setEntries] = useState<CoffeeEntry[]>(() => {
    const saved = localStorage.getItem('coffeeEntries')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState<number | null>(null)

  useEffect(() => {
    localStorage.setItem('coffeeEntries', JSON.stringify(entries))
  }, [entries])

  const handleAdd = (entry: Omit<CoffeeEntry, 'id' | 'date'>) => {
    const newEntry: CoffeeEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
    }
    setEntries((prev) => [newEntry, ...prev])
    playShutterSound()
  }

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  const filtered = filter ? entries.filter((e) => e.rating >= filter) : entries

  return (
    <>
      <div className="min-h-screen" style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 16px' }}>
        <h1
          className="text-center"
          style={{ fontFamily: "'Caveat', cursive", fontSize: 42, color: '#2a9d8f', marginBottom: 4 }}
        >
          my coffee diary ☕
        </h1>
        <p
          className="text-center"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 14, color: '#888', marginBottom: 8 }}
        >
          places i've been. cups i've loved.
        </p>

        {entries.length > 0 && (
          <p className="text-center" style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>
            {entries.length} places visited
          </p>
        )}

        <div className="flex items-center justify-center gap-2" style={{ marginBottom: 48 }}>
          <span style={{ fontSize: 12, color: '#aaa' }}>show:</span>
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setFilter(f.value)}
              style={{
                background: filter === f.value ? '#2a9d8f' : 'transparent',
                color: filter === f.value ? 'white' : '#aaa',
                border: 'none',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col-reverse md:flex-row" style={{ gap: 48 }}>
          <div style={{ flex: 1 }}>
            <EntryList entries={filtered} onDelete={handleDelete} />
          </div>
          <div className="md:sticky" style={{ width: undefined, flexShrink: 0, top: 24, alignSelf: 'flex-start' }}>
            <div className="w-full md:w-[380px]">
              <AddEntry onAdd={handleAdd} />
            </div>
          </div>
        </div>
      </div>
      <MusicPlayer />
    </>
  )
}

export default App
