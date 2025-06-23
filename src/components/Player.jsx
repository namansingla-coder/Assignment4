import { useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat, VolumeX, Maximize2, List } from 'lucide-react'

const Player = ({ 
  currentTrack, 
  isPlaying, 
  setIsPlaying, 
  onNext, 
  onPrevious, 
  shuffle, 
  setShuffle, 
  repeat, 
  setRepeat, 
  volume, 
  setVolume, 
  progress, 
  setProgress, 
  duration,
  queue,
  likedSongs,
  toggleLikedSong
}) => {
  const [isMuted, setIsMuted] = useState(false)
  const [showQueue, setShowQueue] = useState(false)

  useEffect(() => {
    if (isPlaying && currentTrack && duration > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1
          if (newProgress >= duration) {
            if (repeat === 'one') {
              setProgress(0)
              return 0
            } else {
              onNext()
              return 0
            }
          }
          return newProgress
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, currentTrack, duration, repeat, onNext])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = (clickX / rect.width) * duration
    setProgress(newProgress)
  }

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newVolume = (clickX / rect.width) * 100
    setVolume(newVolume)
    setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one']
    const currentIndex = modes.indexOf(repeat)
    const nextIndex = (currentIndex + 1) % modes.length
    setRepeat(modes[nextIndex])
  }

  const getRepeatIcon = () => {
    if (repeat === 'one') {
      return <span className="text-xs absolute -top-1 -right-1">1</span>
    }
    return null
  }

  const isLiked = likedSongs?.find(s => s.id === currentTrack?.id)

  if (!currentTrack) {
    return (
      <div className="h-24 bg-gray-900 border-t border-gray-800 flex items-center justify-center">
        <p className="text-gray-400">Select a song to play</p>
      </div>
    )
  }

  return (
    <div className="h-24 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4 w-1/4">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">🎵</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm truncate">{currentTrack.title}</p>
          <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
        </div>
        <button onClick={() => toggleLikedSong(currentTrack)}>
          <Heart 
            size={16} 
            className={`cursor-pointer transition-colors ${
              isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'
            }`}
            fill={isLiked ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="flex flex-col items-center w-2/4">
        <div className="flex items-center space-x-6 mb-2">
          <button onClick={() => setShuffle(!shuffle)}>
            <Shuffle 
              size={16} 
              className={`cursor-pointer transition-colors ${
                shuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'
              }`} 
            />
          </button>
          <button onClick={onPrevious} className="text-gray-400 hover:text-white cursor-pointer">
            <SkipBack size={20} />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white rounded-full p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" />}
          </button>
          <button onClick={onNext} className="text-gray-400 hover:text-white cursor-pointer">
            <SkipForward size={20} />
          </button>
          <button onClick={toggleRepeat} className="relative">
            <Repeat 
              size={16} 
              className={`cursor-pointer transition-colors ${
                repeat !== 'off' ? 'text-green-500' : 'text-gray-400 hover:text-white'
              }`} 
            />
            {getRepeatIcon()}
          </button>
        </div>
        
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(Math.floor(progress))}
          </span>
          <div 
            className="flex-1 bg-gray-600 rounded-full h-1 cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div 
              className="bg-white h-1 rounded-full transition-all duration-300 group-hover:bg-green-500"
              style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400 w-10">{currentTrack.duration}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 w-1/4 justify-end">
        <button onClick={toggleMute}>
          {isMuted || volume === 0 ? (
            <VolumeX size={16} className="text-gray-400 hover:text-white" />
          ) : (
            <Volume2 size={16} className="text-gray-400 hover:text-white" />
          )}
        </button>
        <div 
          className="w-24 bg-gray-600 rounded-full h-1 cursor-pointer group"
          onClick={handleVolumeChange}
        >
          <div 
            className="bg-white h-1 rounded-full group-hover:bg-green-500"
            style={{ width: `${isMuted ? 0 : volume}%` }}
          ></div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default Player