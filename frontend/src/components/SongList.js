import React from 'react';

function SongList({ videos, currentVideo, onSelect, onCopyId }) {
  return (
    <div
      style={{
        flex: 1,
        background:
          'linear-gradient(145deg, rgba(15,15,15,0.9), rgba(35,35,35,0.85))',
        borderRadius: '28px',
        padding: '16px',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 160px)',
        boxShadow: '0 22px 50px rgba(0,0,0,0.75)',
        backdropFilter: 'blur(18px)'
      }}
    >
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '10px',
          padding: '0 4px'
        }}
      >
        Songs
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {videos.map((video) => (
          <li
            key={video.id.videoId}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 8px',
              borderRadius: '16px',
              cursor: 'pointer',
              marginBottom: '6px',
              background:
                currentVideo &&
                currentVideo.id.videoId === video.id.videoId
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(255,255,255,0.01)',
              transition: 'background 0.12s ease, transform 0.1s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => onSelect(video)}
          >
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                marginRight: '10px',
                objectFit: 'cover'
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  marginBottom: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {video.snippet.title}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#aaaaaa'
                }}
              >
                {video.snippet.channelTitle}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopyId(video);
              }}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '999px',
                border: 'none',
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.06))',
                color: '#111',
                cursor: 'pointer',
                boxShadow:
                  '0 8px 18px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.5)'
              }}
            >
              ID
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;