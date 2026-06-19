import React from 'react';

function SearchBar({ query, onChange, onSubmit, loading }) {
  return (
    <header
      style={{
        padding: '18px 26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '0.06em'
        }}
      >
        MySongApp
      </div>

      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '520px',
          maxWidth: '65%'
        }}
      >
        {/* glass search pill */}
        <div
          style={{
            flex: 1,
            padding: '2px',
            borderRadius: '999px',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.02))',
            boxShadow: '0 16px 40px rgba(0,0,0,0.4)'
          }}
        >
          <div
            style={{
              borderRadius: '999px',
              padding: '0 14px',
              background: 'rgba(8,8,8,0.82)',
              display: 'flex',
              alignItems: 'center',
              backdropFilter: 'blur(18px)'
            }}
          >
            <input
              type="text"
              value={query}
              onChange={onChange}
              placeholder="Search Sinhala or English songs..."
              style={{
                flex: 1,
                padding: '10px 8px',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: '#f5f5f5',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* liquid glass button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            position: 'relative',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '999px',
            padding: '10px 28px',
            color: '#111',
            fontWeight: 600,
            fontSize: '14px',
            background:
              'radial-gradient(circle at 0% 0%, #ffffff, #ffd1a1 35%, #ff8fd5 70%, #ffea90)',
            boxShadow:
              '0 18px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.6)',
            opacity: loading ? 0.7 : 1,
            transition: 'transform 0.12s ease, box-shadow 0.12s ease'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.96)';
            e.currentTarget.style.boxShadow =
              '0 10px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.4)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow =
              '0 18px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.6)';
          }}
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>
    </header>
  );
}

export default SearchBar;