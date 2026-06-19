import React from 'react';

function EqualizerPanel({ bands, gains, onChangeGain, onClose }) {
  const purple = '#800080';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          width: '520px',
          maxWidth: '90%',
          padding: '24px 26px 20px',
          borderRadius: '26px',
          background:
            'linear-gradient(135deg, rgba(15,0,25,0.96), rgba(40,0,60,0.9))',
          boxShadow: '0 30px 70px rgba(0,0,0,0.85)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#f5f5f5'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            Equalizer
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              borderRadius: '999px',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.05))',
              color: '#111',
              fontWeight: 700,
              boxShadow:
                '0 10px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.6)'
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            fontSize: '12px',
            color: '#bbbbbb',
            marginBottom: '20px'
          }}
        >
          Drag the sliders to boost or cut each frequency band.
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {bands.map((band, idx) => (
            <div
              key={band.label}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  marginBottom: '8px',
                  color: '#dddddd'
                }}
              >
                {band.label}
              </div>
              <div
                style={{
                  height: '140px',
                  width: '38px',
                  borderRadius: '18px',
                  padding: '4px',
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(128,0,128,0.3))',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.7)'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    borderRadius: '14px',
                    background:
                      'linear-gradient(180deg, rgba(15,15,25,0.95), rgba(40,0,60,0.9))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 0'
                  }}
                >
                  {/* vertical slider simulated by rotated input */}
                  <input
                    type="range"
                    min={band.min}
                    max={band.max}
                    value={gains[idx]}
                    onChange={(e) =>
                      onChangeGain(idx, Number(e.target.value))
                    }
                    style={{
                      writingMode: 'bt-lr',
                      WebkitAppearance: 'slider-vertical',
                      width: '90%',
                      height: '100%',
                      accentColor: purple
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: '6px',
                  fontSize: '11px',
                  color: '#aaaaaa'
                }}
              >
                {gains[idx]} dB
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#777777'
                }}
              >
                {band.freq} Hz
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EqualizerPanel;