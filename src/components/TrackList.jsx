import { Play, MoreHorizontal, Heart, Plus } from 'lucide-react'
import { useState } from 'react'

const TrackList = ({ tracks, onPlay, showHeader = true }) => {
  const [likedTracks, setLikedTracks] = useState(new Set())

  const toggleLike = (trackId) => {
    const newLiked = new Set(likedTracks)
    if (newLiked.has(trackId)) {
      newLiked.delete(trackId)
    } else {
      newLiked.add(trackId)
    }
    setLikedTracks(newLiked)
  }

  return (
    <div className="space-y-2">
      {showHeader && (
        <div className="flex items-center space-x-4 text-gray-400 text-sm border-b border-gray-800 pb-2 px-4">
          <div className="w-8 text-center">#</div>
          <div className="flex-1">TITLE</div>
          <div className="w-32">ALBUM</div>
          <div className="w-16">⏱</div>
          <div className="w-8"></div>
        </div>
      )}
      
      {tracks.map((track, index) => (
        <div 
          key={track.id} 
          className="flex items-center space-x-4 p-2 px-4 rounded hover:bg-gray-800 group cursor-pointer"
          onClick={() => onPlay(track)}
        >
          <div className="w-8 text-center">
            <span className="text-gray-400 text-sm group-hover:hidden">{index + 1}</span>
            <Play size={16} className="hidden group-hover:block text-white" />
          </div>
          
          <div className="flex-1 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center">
              <span className="text-xs">🎵</span>
            </div>
            <div>
              <p className="font-semibold text-white">{track.title}</p>
              <p className="text-gray-400 text-sm">{track.artist}</p>
            </div>
          </div>
          
          <div className="w-32 text-gray-400 text-sm">{track.album}</div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleLike(track.id)
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart 
                size={16} 
                className={likedTracks.has(track.id) ? 'text-green-500 fill-current' : 'text-gray-400 hover:text-white'} 
              />
            </button>
            <span className="text-gray-400 text-sm w-16">{track.duration}</span>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={16} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrackList