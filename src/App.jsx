import { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Player from './components/Player'
import CreatePlaylistModal from './components/CreatePlaylistModal'

function App() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlists, setPlaylists] = useState([
    'My Playlist #1',
    'Discover Weekly',
    'Release Radar',
    'Liked Songs',
    'Recently Played'
  ])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [currentView, setCurrentView] = useState('home')
  const [searchResults, setSearchResults] = useState([])

  const allTracks = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', genre: 'Pop' },
    { id: 2, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', genre: 'Pop' },
    { id: 3, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', genre: 'Pop' },
    { id: 4, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58', genre: 'Pop Rock' },
    { id: 5, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'F*CK LOVE 3', duration: '2:21', genre: 'Pop' },
    { id: 6, title: 'Heat Waves', artist: 'Glass Animals', album: 'Dreamland', duration: '3:58', genre: 'Indie Pop' },
    { id: 7, title: 'Bad Habits', artist: 'Ed Sheeran', album: 'Bad Habits', duration: '3:51', genre: 'Pop' },
    { id: 8, title: 'Industry Baby', artist: 'Lil Nas X, Jack Harlow', album: 'MONTERO', duration: '3:32', genre: 'Hip Hop' },
    { id: 9, title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', duration: '3:18', genre: 'R&B' },
    { id: 10, title: 'Deja Vu', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '3:35', genre: 'Pop Rock' }
  ]

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }
    
    const results = allTracks.filter(track =>
      track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.genre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  const createPlaylist = (name) => {
    setPlaylists([...playlists, name])
    setShowCreateModal(false)
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1">
        <Sidebar 
          playlists={playlists}
          setShowCreateModal={setShowCreateModal}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <MainContent 
          setCurrentTrack={setCurrentTrack}
          setIsPlaying={setIsPlaying}
          currentView={currentView}
          onSearch={handleSearch}
          searchResults={searchResults}
          allTracks={allTracks}
        />
      </div>
      <Player 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onCreate={createPlaylist}
        />
      )}
    </div>
  )
}

export default App
