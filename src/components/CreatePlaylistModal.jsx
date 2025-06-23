import { useState } from 'react'
import { X } from 'lucide-react'

const CreatePlaylistModal = ({ onClose, onCreate, allTracks, isEditing = false, initialName = '' }) => {
  const [playlistName, setPlaylistName] = useState(initialName)
  const [description, setDescription] = useState('')
  const [selectedSongs, setSelectedSongs] = useState([])

  const toggleSong = (track) => {
    setSelectedSongs(prev => 
      prev.find(song => song.id === track.id)
        ? prev.filter(song => song.id !== track.id)
        : [...prev, track]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (playlistName.trim()) {
      onCreate(playlistName.trim(), isEditing ? [] : selectedSongs)
      setPlaylistName('')
      setDescription('')
      setSelectedSongs([])
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-[500px] max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{isEditing ? 'Edit playlist' : 'Create playlist'}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Playlist name
            </label>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="My Playlist #1"
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add an optional description"
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="2"
            />
          </div>

          {!isEditing && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Add songs ({selectedSongs.length} selected)
              </label>
              <div className="max-h-48 overflow-y-auto bg-gray-700 rounded">
                {allTracks.map(track => (
                  <div
                    key={track.id}
                    onClick={() => toggleSong(track)}
                    className={`p-2 cursor-pointer hover:bg-gray-600 flex items-center justify-between ${
                      selectedSongs.find(song => song.id === track.id) ? 'bg-green-600' : ''
                    }`}
                  >
                    <div>
                      <div className="text-white text-sm">{track.title}</div>
                      <div className="text-gray-400 text-xs">{track.artist}</div>
                    </div>
                    <div className="text-gray-400 text-xs">{track.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-300 hover:text-white font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!playlistName.trim()}
              className="px-6 py-2 bg-green-500 text-black font-medium rounded-full hover:bg-green-400 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {isEditing ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePlaylistModal