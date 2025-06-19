import { useState, useEffect } from 'react'
import { Search, Play, Clock, Music, Filter } from 'lucide-react'
import TrackList from './TrackList'

const MainContent = ({ setCurrentTrack, setIsPlaying, currentView, onSearch, searchResults, allTracks }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  
  const featuredPlaylists = [
    { id: 1, title: 'Today\'s Top Hits', image: 'https://via.placeholder.com/200x200/1db954/ffffff?text=Top+Hits' },
    { id: 2, title: 'RapCaviar', image: 'https://via.placeholder.com/200x200/ff6b35/ffffff?text=RapCaviar' },
    { id: 3, title: 'All Out 2010s', image: 'https://via.placeholder.com/200x200/8b5cf6/ffffff?text=2010s' },
    { id: 4, title: 'Rock Classics', image: 'https://via.placeholder.com/200x200/ef4444/ffffff?text=Rock' },
    { id: 5, title: 'Chill Hits', image: 'https://via.placeholder.com/200x200/06b6d4/ffffff?text=Chill' },
    { id: 6, title: 'Pop Rising', image: 'https://via.placeholder.com/200x200/f59e0b/ffffff?text=Pop' }
  ]

  const genres = [
    { name: 'Pop', color: 'bg-pink-500', image: 'https://via.placeholder.com/200x200/ec4899/ffffff?text=Pop' },
    { name: 'Hip Hop', color: 'bg-orange-500', image: 'https://via.placeholder.com/200x200/f97316/ffffff?text=Hip+Hop' },
    { name: 'Rock', color: 'bg-red-500', image: 'https://via.placeholder.com/200x200/ef4444/ffffff?text=Rock' },
    { name: 'R&B', color: 'bg-purple-500', image: 'https://via.placeholder.com/200x200/a855f7/ffffff?text=R%26B' },
    { name: 'Indie', color: 'bg-blue-500', image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=Indie' },
    { name: 'Electronic', color: 'bg-green-500', image: 'https://via.placeholder.com/200x200/22c55e/ffffff?text=Electronic' }
  ]

  useEffect(() => {
    onSearch(searchTerm)
  }, [searchTerm, onSearch])

  const handlePlayTrack = (track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const renderHomeView = () => (
    <>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Good evening</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPlaylists.slice(0, 6).map((playlist) => (
            <div key={playlist.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4">
                <img src={playlist.image} alt={playlist.title} className="w-16 h-16 rounded" />
                <span className="font-semibold">{playlist.title}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-green-500 rounded-full p-2 hover:bg-green-400">
                    <Play size={16} fill="black" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recently played</h2>
        <div className="space-y-2">
          {allTracks.slice(0, 5).map((track) => (
            <div key={track.id} className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800 group cursor-pointer"
                 onClick={() => handlePlayTrack(track)}>
              <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center">
                <Play size={16} className="opacity-0 group-hover:opacity-100" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{track.title}</p>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
              <div className="text-gray-400 text-sm">{track.album}</div>
              <div className="text-gray-400 text-sm">{track.duration}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Made for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {featuredPlaylists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
              <div className="relative mb-4">
                <img src={playlist.image} alt={playlist.title} className="w-full aspect-square rounded-lg" />
                <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-400">
                  <Play size={20} fill="black" />
                </button>
              </div>
              <h3 className="font-semibold mb-2">{playlist.title}</h3>
              <p className="text-gray-400 text-sm">Your daily update of the most played tracks</p>
            </div>
          ))}
        </div>
      </section>
    </>
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
                <div key={genre.name} className="relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                  <img src={genre.image} alt={genre.name} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{genre.name}</h3>
                  </div>
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
        <TrackList tracks={filteredTracks} onPlay={handlePlayTrack} />
      </section>
    )
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black p-8 overflow-y-auto">
      {currentView === 'home' && renderHomeView()}
      {currentView === 'search' && renderSearchView()}
      {currentView === 'library' && renderLibraryView()}
      {currentView === 'liked' && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Liked Songs</h2>
          <p className="text-gray-400">Your liked songs will appear here</p>
        </section>
      )}
    </div>
  )
}

export default MainContent