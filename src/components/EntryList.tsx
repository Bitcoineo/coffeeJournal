import type { CoffeeEntry } from '../types'

interface EntryListProps {
  entries: CoffeeEntry[]
  onDelete: (id: string) => void
}

function EntryList({ entries, onDelete }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <p
        className="text-center"
        style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: '#aaa', marginTop: 48 }}
      >
        no entries yet. go find some coffee.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, marginTop: 48 }}>
      {entries.map((entry) => {
        const tilt = (entry.id.charCodeAt(0) % 7) - 3
        return (
        <div
          key={entry.id}
          style={{
            position: 'relative',
            transform: `rotate(${tilt}deg)`,
            marginBottom: 32,
          }}
        >
          {/* Pin */}
          <div
            style={{
              position: 'absolute',
              top: -7,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#e63946',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 1,
            }}
          />

          {/* Polaroid card */}
          <div
            style={{
              position: 'relative',
              background: 'white',
              padding: '16px 16px 48px 16px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <button
              className="delete-btn"
              onClick={() => onDelete(entry.id)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.08)',
                color: '#999',
                fontSize: 12,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>

            {/* Image or placeholder */}
            {entry.image ? (
              <img
                src={entry.image}
                alt={entry.name}
                style={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  marginBottom: 12,
                }}
              />
            ) : (
              <div
                style={{
                  height: 120,
                  background: '#f5f0e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: '#ccc' }}>
                  no photo 📷
                </span>
              </div>
            )}

            <div style={{ fontFamily: "'Caveat', cursive", color: '#1a1a1a', marginTop: 8 }}>
              {entry.name}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#aaa' }}>{entry.location}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#aaa' }}>{entry.date}</span>
            </div>

            <div style={{ marginTop: 4 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: 12,
                    color: star <= entry.rating ? '#2a9d8f' : '#ddd',
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {entry.notes && (
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: '#666', lineHeight: 1.6, marginTop: 8 }}>
                {entry.notes}
              </p>
            )}
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default EntryList
