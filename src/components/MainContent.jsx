import { useState, useEffect } from 'react'
import { Search, Play, Clock, Music, Filter, MoreHorizontal, Edit, Trash2, Heart } from 'lucide-react'
import TrackList from './TrackList'
import HomeView from './views/HomeView'

const MainContent = ({ setCurrentTrack, setIsPlaying, currentView, onSearch, searchResults, allTracks, playlists, addSongToPlaylist, removeSongFromPlaylist, onEditPlaylist, onDeletePlaylist, likedSongs, recentlyPlayed, toggleLikedSong, onPlayTrackList }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [showMenu, setShowMenu] = useState(null)
  
  const genres = [
    { name: 'Pop', color: 'bg-pink-500' },
    { name: 'Hip Hop', color: 'bg-orange-500' },
    { name: 'Rock', color: 'bg-red-500' },
    { name: 'R&B', color: 'bg-purple-500' },
    { name: 'Indie', color: 'bg-blue-500' },
    { name: 'Electronic', color: 'bg-green-500' }
  ]

  useEffect(() => {
    onSearch(searchTerm)
  }, [searchTerm])

  const handlePlayTrack = (track, trackList = null) => {
    if (trackList) {
      onPlayTrackList(track, trackList)
    } else {
      setCurrentTrack(track)
    }
  }

  const renderHomeView = () => (
    <HomeView 
      recentlyPlayed={recentlyPlayed}
      allTracks={allTracks}
      likedSongs={likedSongs}
      toggleLikedSong={toggleLikedSong}
      handlePlayTrack={handlePlayTrack}
    />
  )

  const renderSearchView = () => (
    <>
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:bg-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {searchTerm && searchResults.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold mb-6">Search Results ({searchResults.length})</h2>
          <TrackList tracks={searchResults} onPlay={handlePlayTrack} showHeader={false} />
        </section>
      ) : searchTerm && searchResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No results found for "{searchTerm}"</p>
          <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
        </div>
      ) : (
        <>
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {genres.map((genre) => (
                <div key={genre.name} className={`relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform h-32 ${genre.color} flex items-center justify-center`}>
                  <h3 className="text-white text-xl font-bold">{genre.name}</h3>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  )

  const renderLibraryView = () => {
    const filteredTracks = selectedGenre === 'all' 
      ? allTracks 
      : allTracks.filter(track => track.genre.toLowerCase().includes(selectedGenre.toLowerCase()))

    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Library</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <select 
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-gray-800 text-white px-3 py-1 rounded focus:outline-none"
              >
                <option value="all">All Genres</option>
                <option value="pop">Pop</option>
                <option value="hip hop">Hip Hop</option>
                <option value="rock">Rock</option>
                <option value="r&b">R&B</option>
                <option value="indie">Indie</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {filteredTracks.map((track) => (
            <div key={track.id} className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800 group">
              <button 
                onClick={() => handlePlayTrack(track, filteredTracks)}
                className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center hover:bg-green-500"
              >
                <Play size={16} />
              </button>
              <div className="flex-1">
                <p className="font-semibold">{track.title}</p>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
              <div className="text-gray-400 text-sm">{track.album}</div>
              <div className="text-gray-400 text-sm">{track.duration}</div>
              <button 
                onClick={() => toggleLikedSong(track)}
                className={`opacity-0 group-hover:opacity-100 ${
                  likedSongs.find(s => s.id === track.id) ? 'text-green-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Heart size={16} fill={likedSongs.find(s => s.id === track.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const renderPlaylistView = (playlistId) => {
    const playlist = playlists.find(p => p.id === parseInt(playlistId))
    if (!playlist) return null

    const availableSongs = allTracks.filter(track => 
      !playlist.songs.find(song => song.id === track.id)
    )

    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{playlist.name}</h2>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(showMenu === playlist.id ? null : playlist.id)}
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <MoreHorizontal size={20} />
            </button>
            {showMenu === playlist.id && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">
                <button 
                  onClick={() => {
                    onEditPlaylist(playlist)
                    setShowMenu(null)
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-700 rounded-t-lg"
                >
                  <Edit size={16} />
                  <span>Edit playlist</span>
                </button>
                <button 
                  onClick={() => {
                    onDeletePlaylist(playlist.id)
                    setShowMenu(null)
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-700 text-red-400 rounded-b-lg"
                >
                  <Trash2 size={16} />
                  <span>Delete playlist</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {playlist.songs.length > 0 ? (
          <div className="space-y-2">
            {playlist.songs.map((track) => (
              <div key={track.id} className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800 group">
                <button 
                  onClick={() => handlePlayTrack(track, playlist.songs)}
                  className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center hover:bg-green-500"
                >
                  <Play size={16} />
                </button>
                <div className="flex-1">
                  <p className="font-semibold">{track.title}</p>
                  <p className="text-gray-400 text-sm">{track.artist}</p>
                </div>
                <div className="text-gray-400 text-sm">{track.album}</div>
                <div className="text-gray-400 text-sm">{track.duration}</div>
                <button 
                  onClick={() => toggleLikedSong(track)}
                  className={`opacity-0 group-hover:opacity-100 ${
                    likedSongs.find(s => s.id === track.id) ? 'text-green-500' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart size={16} fill={likedSongs.find(s => s.id === track.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No songs in this playlist. Click "Edit playlist" to add songs.</p>
        )}
      </section>
    )
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black p-8 overflow-y-auto" key={likedSongs.length}>
      {currentView === 'home' && renderHomeView()}
      {currentView === 'search' && renderSearchView()}
      {currentView === 'library' && renderLibraryView()}
      {currentView === 'liked' && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Liked Songs</h2>
          {likedSongs.length > 0 ? (
            <div className="space-y-2">
              {likedSongs.map((track) => (
                <div key={track.id} className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800 group">
                  <button 
                    onClick={() => handlePlayTrack(track, likedSongs)}
                    className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center hover:bg-green-500"
                  >
                    <Play size={16} />
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold">{track.title}</p>
                    <p className="text-gray-400 text-sm">{track.artist}</p>
                  </div>
                  <div className="text-gray-400 text-sm">{track.album}</div>
                  <div className="text-gray-400 text-sm">{track.duration}</div>
                  <button 
                    onClick={() => toggleLikedSong(track)}
                    className="text-green-500 opacity-0 group-hover:opacity-100"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No liked songs yet. Like songs by clicking the heart icon!</p>
          )}
        </section>
      )}
      {currentView.startsWith('playlist-') && renderPlaylistView(currentView.split('-')[1])}
    </div>
  )
}

export default MainContent