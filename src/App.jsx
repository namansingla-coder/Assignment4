import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Player from './components/Player'
import CreatePlaylistModal from './components/CreatePlaylistModal'
import EditPlaylistModal from './components/EditPlaylistModal'

function App() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlists, setPlaylists] = useLocalStorage('spotify-playlists', [])
  const [likedSongs, setLikedSongs] = useLocalStorage('spotify-liked-songs', [])
  const [recentlyPlayed, setRecentlyPlayed] = useLocalStorage('spotify-recently-played', [])
  const [currentView, setCurrentView] = useLocalStorage('spotify-current-view', 'home')
  const [volume, setVolume] = useLocalStorage('spotify-volume', 50)
  const [shuffle, setShuffle] = useLocalStorage('spotify-shuffle', false)
  const [repeat, setRepeat] = useLocalStorage('spotify-repeat', 'off')
  
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPlaylist, setEditingPlaylist] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

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

  const createPlaylist = (name, selectedSongs = []) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: selectedSongs
    }
    setPlaylists([...playlists, newPlaylist])
    setShowCreateModal(false)
  }

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, songs: [...playlist.songs, song] }
        : playlist
    ))
  }

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, songs: playlist.songs.filter(song => song.id !== songId) }
        : playlist
    ))
  }

  const editPlaylist = (playlistId, newName) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, name: newName }
        : playlist
    ))
    setShowEditModal(false)
    setEditingPlaylist(null)
  }

  const deletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== playlistId))
    setCurrentView('home')
  }

  const toggleLikedSong = (song) => {
    setLikedSongs(prev => 
      prev.find(s => s.id === song.id)
        ? prev.filter(s => s.id !== song.id)
        : [...prev, song]
    )
  }

  const handlePlayTrack = (track, trackList = []) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setProgress(0)
    setDuration(parseInt(track.duration.split(':')[0]) * 60 + parseInt(track.duration.split(':')[1]))
    
    if (trackList.length > 0) {
      setQueue(trackList)
      setCurrentIndex(trackList.findIndex(t => t.id === track.id))
    }
    
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(t => t.id !== track.id)
      return [track, ...filtered].slice(0, 10)
    })
  }

  const playNext = () => {
    if (queue.length === 0) return
    
    let nextIndex
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length)
    } else {
      nextIndex = currentIndex + 1
      if (nextIndex >= queue.length) {
        if (repeat === 'all') nextIndex = 0
        else return
      }
    }
    
    const nextTrack = queue[nextIndex]
    setCurrentTrack(nextTrack)
    setCurrentIndex(nextIndex)
    setProgress(0)
    setDuration(parseInt(nextTrack.duration.split(':')[0]) * 60 + parseInt(nextTrack.duration.split(':')[1]))
  }

  const playPrevious = () => {
    if (queue.length === 0) return
    
    let prevIndex = currentIndex - 1
    if (prevIndex < 0) prevIndex = queue.length - 1
    
    const prevTrack = queue[prevIndex]
    setCurrentTrack(prevTrack)
    setCurrentIndex(prevIndex)
    setProgress(0)
    setDuration(parseInt(prevTrack.duration.split(':')[0]) * 60 + parseInt(prevTrack.duration.split(':')[1]))
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
          setCurrentTrack={handlePlayTrack}
          setIsPlaying={setIsPlaying}
          currentView={currentView}
          onSearch={handleSearch}
          searchResults={searchResults}
          allTracks={allTracks}
          playlists={playlists}
          addSongToPlaylist={addSongToPlaylist}
          removeSongFromPlaylist={removeSongFromPlaylist}
          onEditPlaylist={(playlist) => {
            setEditingPlaylist(playlist)
            setShowEditModal(true)
          }}
          onDeletePlaylist={deletePlaylist}
          likedSongs={likedSongs}
          recentlyPlayed={recentlyPlayed}
          toggleLikedSong={toggleLikedSong}
          onPlayTrackList={(track, trackList) => handlePlayTrack(track, trackList)}
        />
      </div>
      <Player 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onNext={playNext}
        onPrevious={playPrevious}
        shuffle={shuffle}
        setShuffle={setShuffle}
        repeat={repeat}
        setRepeat={setRepeat}
        volume={volume}
        setVolume={setVolume}
        progress={progress}
        setProgress={setProgress}
        duration={duration}
        queue={queue}
        likedSongs={likedSongs}
        toggleLikedSong={toggleLikedSong}
      />
      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onCreate={createPlaylist}
          allTracks={allTracks}
        />
      )}
      {showEditModal && editingPlaylist && (
        <EditPlaylistModal
          playlist={editingPlaylist}
          allTracks={allTracks}
          onClose={() => {
            setShowEditModal(false)
            setEditingPlaylist(null)
          }}
          onUpdatePlaylist={(updatedPlaylist) => {
            setPlaylists(playlists.map(p => 
              p.id === updatedPlaylist.id ? updatedPlaylist : p
            ))
            setShowEditModal(false)
            setEditingPlaylist(null)
          }}
        />
      )}
    </div>
  )
}

export default App
