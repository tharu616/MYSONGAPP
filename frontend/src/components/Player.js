import React from 'react';

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

function Player({
  currentVideo,
  isPlaying,
  progress,          // 0–100
  duration,          // seconds
  currentTime,       // seconds
  volume,            // 0–1
  onSeek,
  onTogglePlay,
  onPrev,
  onNext,
  onVolumeChange,
  onOpenEq,          // NEW: open EQ panel
  audioRef,
  onTimeUpdate
}) {
  const thumb =
    currentVideo?.snippet?.thumbnails?.high?.url ||
    currentVideo?.snippet?.thumbnails?.medium?.url ||
    currentVideo?.snippet?.thumbnails?.default?.url;

  const purple = '#800080';

  return (
    <div
      style={{
        flex: 1.3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          padding: '3px',
          borderRadius: '32px',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.6), rgba(128,0,128,0.45))',
          boxShadow: '0 28px 60px rgba(0,0,0,0.7)'
        }}
      >
        <div
          style={{
            borderRadius: '30px',
            padding: '22px 22px 26px',
            background:
              'linear-gradient(145deg, rgba(10,10,20,0.95), rgba(20,0,30,0.9))',
            backdropFilter: 'blur(26px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '380px'
          }}
        >
          {currentVideo ? (
            <>
              {/* liquid glass cover */}
              <div
                style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  marginBottom: '18px',
                  boxShadow:
                    '0 18px 40px rgba(0,0,0,0.85), inset 0 2px 0 rgba(255,255,255,0.22)',
                  background:
                    'radial-gradient(circle at 10% 0%, rgba(255,255,255,0.5), #800080 60%)'
                }}
              >
                {thumb && (
                  <img
                    src={thumb}
                    alt={currentVideo.snippet.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      mixBlendMode: 'screen',
                      opacity: 0.96
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '6px',
                  fontWeight: 600,
                  fontSize: '15px'
                }}
              >
                {currentVideo.snippet.title}
              </div>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  color: '#cccccc',
                  marginBottom: '10px'
                }}
              >
                {currentVideo.snippet.channelTitle}
              </div>

              {/* time row */}
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: '#bbbbbb',
                  marginBottom: '4px'
                }}
              >
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* purple liquid progress pill */}
              <div
                style={{
                  width: '100%',
                  height: '46px',
                  borderRadius: '999px',
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(128,0,128,0.15))',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 18px',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 26px rgba(0,0,0,0.85)',
                  marginBottom: '18px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${Math.max(6, progress)}%`,
                    height: '60%',
                    borderRadius: '999px',
                    background:
                      'radial-gradient(circle at 0% 0%, #ffb3ff, #800080)',
                    boxShadow:
                      '0 0 18px rgba(255,179,255,0.9), 0 0 26px rgba(128,0,128,0.7)',
                    transition: 'width 0.12s linear'
                  }}
                />
              </div>

              {/* transport controls */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '18px',
                  marginBottom: '10px'
                }}
              >
                {/* prev */}
                <button
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '999px',
                    border: 'none',
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(128,0,128,0.2))',
                    color: '#f4f4f4',
                    fontSize: '18px',
                    cursor: 'pointer',
                    boxShadow:
                      '0 12px 26px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.4)'
                  }}
                  onClick={onPrev}
                >
                  «
                </button>

                {/* play / pause */}
                <button
                  onClick={onTogglePlay}
                  style={{
                    width: '82px',
                    height: '82px',
                    borderRadius: '999px',
                    border: 'none',
                    background:
                      'radial-gradient(circle at 30% 0%, #ffe9ff, #d680ff 35%, #800080 75%)',
                    color: '#1b021f',
                    fontSize: '30px',
                    cursor: 'pointer',
                    boxShadow:
                      '0 20px 40px rgba(0,0,0,0.85), inset 0 2px 0 rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isPlaying ? 'scale(0.97)' : 'scale(1)',
                    transition:
                      'transform 0.12s ease, box-shadow 0.12s ease'
                  }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>

                {/* next */}
                <button
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '999px',
                    border: 'none',
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(128,0,128,0.2))',
                    color: '#f4f4f4',
                    fontSize: '18px',
                    cursor: 'pointer',
                    boxShadow:
                      '0 12px 26px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.4)'
                  }}
                  onClick={onNext}
                >
                  »
                </button>
              </div>

              {/* volume slider */}
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11px',
                  color: '#cccccc'
                }}
              >
                <span style={{ width: '22px', textAlign: 'right' }}>
                  🔊
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(volume * 100)}
                  onChange={(e) =>
                    onVolumeChange(Number(e.target.value) / 100)
                  }
                  style={{
                    flex: 1,
                    accentColor: purple
                  }}
                />
              </div>

              {/* EQ button */}
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '10px'
                }}
              >
                <button
                  onClick={onOpenEq}
                  style={{
                    border: 'none',
                    borderRadius: '999px',
                    padding: '6px 16px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    color: '#130013',
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(128,0,128,0.8))',
                    boxShadow:
                      '0 10px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.6)'
                  }}
                >
                  EQ
                </button>
              </div>

              {/* hidden range for actual seeking */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={onSeek}
                style={{ width: 0, height: 0, opacity: 0 }}
              />

              <audio
                ref={audioRef}
                onTimeUpdate={onTimeUpdate}
                onEnded={() => {
                  onNext();
                }}
              />
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999'
              }}
            >
              Search and select a song to start
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Player;