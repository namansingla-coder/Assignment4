import { useState } from 'react'
import { X, Play, Heart } from 'lucide-react'

const EditPlaylistModal = ({ playlist, allTracks, onClose, onUpdatePlaylist }) => {
  const [playlistName, setPlaylistName] = useState(playlist.name)
  const [playlistSongs, setPlaylistSongs] = useState([...playlist.songs])

  const availableSongs = allTracks.filter(track => 
    !playlistSongs.find(song => song.id === track.id)
  )

  const addSong = (song) => {
    setPlaylistSongs([...playlistSongs, song])
  }

  const removeSong = (songId) => {
    setPlaylistSongs(playlistSongs.filter(song => song.id !== songId))
  }

  const handleSave = () => {
    onUpdatePlaylist({
      ...playlist,
      name: playlistName,
      songs: playlistSongs
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Edit playlist</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Playlist name
          </label>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {playlistSongs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Songs in playlist ({playlistSongs.length})</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {playlistSongs.map((song) => (
                <div key={song.id} className="flex items-center space-x-3 p-2 bg-gray-700 rounded">
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{song.title}</p>
                    <p className="text-gray-400 text-xs">{song.artist}</p>
                  </div>
                  <span className="text-gray-400 text-xs">{song.duration}</span>
                  <button 
                    onClick={() => removeSong(song.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {availableSongs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Add songs</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableSongs.map((song) => (
                <div key={song.id} className="flex items-center space-x-3 p-2 bg-gray-700 rounded">
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{song.title}</p>
                    <p className="text-gray-400 text-xs">{song.artist}</p>
                  </div>
                  <span className="text-gray-400 text-xs">{song.duration}</span>
                  <button 
                    onClick={() => addSong(song)}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-300 hover:text-white font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!playlistName.trim()}
            className="px-6 py-2 bg-green-500 text-black font-medium rounded-full hover:bg-green-400 disabled:bg-gray-600 disabled:text-gray-400"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditPlaylistModal