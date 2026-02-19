import { useState, useRef } from 'react'
import type { CoffeeEntry } from '../types'

interface AddEntryProps {
  onAdd: (entry: Omit<CoffeeEntry, 'id' | 'date'>) => void
}

const inputStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #eee',
  color: '#1a1a1a',
  padding: '8px 0',
  width: '100%',
  fontFamily: "'Caveat', cursive",
  fontSize: 20,
  outline: 'none',
}

function AddEntry({ onAdd }: AddEntryProps) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({ name, location, rating, notes, ...(image ? { image } : {}) })
    setName('')
    setLocation('')
    setRating(0)
    setNotes('')
    setImage(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'white',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        borderRadius: 16,
        padding: 32,
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="coffee shop name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="diary-input"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="diary-input"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: '#888' }}>rate it:</span>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: 'pointer',
                fontSize: 24,
                color: star <= rating ? '#2a9d8f' : '#ddd',
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <textarea
          placeholder="notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="diary-input"
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handlePhoto}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          style={{
            background: 'transparent',
            border: '1px dashed #2a9d8f',
            color: '#2a9d8f',
            padding: '10px 16px',
            fontFamily: "'Caveat', cursive",
            fontSize: 18,
            cursor: 'pointer',
            borderRadius: 8,
            width: '100%',
          }}
        >
          attach photo +
        </button>
        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ marginTop: 12, width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 8 }}
          />
        )}
      </div>

      <button
        type="submit"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#2a9d8f',
          fontFamily: "'Caveat', cursive",
          fontSize: 20,
          cursor: 'pointer',
          padding: '8px 0',
          width: '100%',
        }}
      >
        save entry →
      </button>
    </form>
  )
}

export default AddEntry
