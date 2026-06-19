import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Player from './components/Player';
import SongList from './components/SongList';
import EqualizerPanel from './components/EqualizerPanel';

// Put your real key here, but NEVER share it
const API_KEY = 'AIzaSyDYejHpH7bYmupymKC_CFUUXRkgwISXEmE';

function App() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0); // seconds
  const [currentTime, setCurrentTime] = useState(0); // seconds
  const [volume, setVolume] = useState(0.8);

  // EQ UI state only (does NOT affect sound yet)
  const [eqGains, setEqGains] = useState([0, 0, 0, 0, 0]);
  const eqBands = [
    { label: 'Bass', freq: 60, min: -12, max: 12 },
    { label: 'Low‑Mid', freq: 250, min: -12, max: 12 },
    { label: 'Mid', freq: 1000, min: -12, max: 12 },
    { label: 'High‑Mid', freq: 4000, min: -12, max: 12 },
    { label: 'Treble', freq: 10000, min: -12, max: 12 }
  ];
  const [showEqPanel, setShowEqPanel] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setVideos([]);

    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&videoCategoryId=10&q=${encodeURIComponent(
        query
      )}&key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        setError(data.error.message || 'API error');
      } else {
        setVideos(data.items || []);
      }
    } catch (err) {
      setError('Network error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const setAudioSourceFromVideo = async (video, index) => {
    if (!video || !window.electronAPI) return;

    const videoId = video.id?.videoId;
    if (!videoId) return;

    const audioUrl = await window.electronAPI.getAudioUrl(videoId);

    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);

      if (audioUrl) {
        audioRef.current.src = audioUrl;
        audioRef.current.volume = volume;
        audioRef.current.onloadedmetadata = () => {
          setDuration(audioRef.current.duration || 0);
        };
        await audioRef.current.play().catch(() => {});
        setIsPlaying(true);
        if (typeof index === 'number') {
          setCurrentIndex(index);
        }
      } else {
        console.log('No audio URL returned');
      }
    }
  };

  const handleSelectVideo = (video) => {
    const index = videos.findIndex(
      (v) => v.id.videoId === video.id.videoId
    );

    setCurrentVideo(video);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }

    setAudioSourceFromVideo(video, index);
  };

  const playAtIndex = (index) => {
    if (index < 0 || index >= videos.length) return;
    const nextVideo = videos[index];
    setCurrentVideo(nextVideo);
    setAudioSourceFromVideo(nextVideo, index);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    playAtIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < 0 || currentIndex >= videos.length - 1) return;
    playAtIndex(currentIndex + 1);
  };

  const handleTogglePlay = () => {
    if (!currentVideo || !audioRef.current) return;

    if (!audioRef.current.src) {
      setAudioSourceFromVideo(currentVideo, currentIndex);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const ct = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(ct);
      setDuration(dur);
      const value = (ct / dur) * 100;
      setProgress(value);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const value = Number(e.target.value);
    const newTime = (value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(value);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (v) => {
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  // For now, EQ panel only updates UI state, not sound
  const handleEqGainChange = (index, gainDb) => {
    setEqGains((prev) => {
      const next = [...prev];
      next[index] = gainDb;
      return next;
    });
  };

  useEffect(() => {
    if (!audioRef.current) return;
    setProgress(0);
    setIsPlaying(false);
    setCurrentTime(0);
  }, [currentVideo]);

  const copyVideoId = (video) => {
    const id = video?.id?.videoId;
    if (!id) return;
    navigator.clipboard.writeText(id).catch(() => {});
  };

  return (
    <div
      style={{
        background:
          'radial-gradient(circle at top left, #2b2b52, #121212 50%, #000000)',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      <SearchBar
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        onSubmit={handleSearch}
        loading={loading}
      />

      {error && (
        <div style={{ paddingLeft: '24px', color: '#ff6b6b' }}>
          {error}
        </div>
      )}

      <div
        style={{
          flex: 1,
          display: 'flex',
          padding: '16px 24px',
          gap: '24px',
          boxSizing: 'border-box'
        }}
      >
        <Player
          currentVideo={currentVideo}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          currentTime={currentTime}
          volume={volume}
          onSeek={handleSeek}
          onTogglePlay={handleTogglePlay}
          onPrev={handlePrev}
          onNext={handleNext}
          onVolumeChange={handleVolumeChange}
          onOpenEq={() => setShowEqPanel(true)}
          audioRef={audioRef}
          onTimeUpdate={handleTimeUpdate}
        />

        <SongList
          videos={videos}
          currentVideo={currentVideo}
          onSelect={handleSelectVideo}
          onCopyId={copyVideoId}
        />
      </div>

      {showEqPanel && (
        <EqualizerPanel
          bands={eqBands}
          gains={eqGains}
          onChangeGain={handleEqGainChange}
          onClose={() => setShowEqPanel(false)}
        />
      )}
    </div>
  );
}

export default App;