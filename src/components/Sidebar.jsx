import { Home, Search, Library, Plus, Heart } from 'lucide-react'

const Sidebar = ({ playlists, setShowCreateModal, currentView, setCurrentView }) => {
  return (
    <div className="w-64 bg-black p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-500">Spotify</h1>
      </div>
      
      <nav className="mb-8">
        <ul className="space-y-4">
          <li 
            className={`flex items-center space-x-4 cursor-pointer ${
              currentView === 'home' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setCurrentView('home')}
          >
            <Home size={24} />
            <span>Home</span>
          </li>
          <li 
            className={`flex items-center space-x-4 cursor-pointer ${
              currentView === 'search' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setCurrentView('search')}
          >
            <Search size={24} />
            <span>Search</span>
          </li>
          <li 
            className={`flex items-center space-x-4 cursor-pointer ${
              currentView === 'library' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setCurrentView('library')}
          >
            <Library size={24} />
            <span>Your Library</span>
          </li>
        </ul>
      </nav>

      <div className="mb-8">
        <ul className="space-y-4">
          <li 
            className="flex items-center space-x-4 text-gray-300 hover:text-white cursor-pointer"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={24} />
            <span>Create Playlist</span>
          </li>
          <li 
            className={`flex items-center space-x-4 cursor-pointer ${
              currentView === 'liked' ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setCurrentView('liked')}
          >
            <Heart size={24} />
            <span>Liked Songs</span>
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <h3 className="text-gray-400 text-sm font-semibold mb-4">PLAYLISTS</h3>
        <ul className="space-y-2">
          {playlists.map((playlist, index) => (
            <li 
              key={playlist.id} 
              className="text-gray-300 hover:text-white cursor-pointer text-sm p-2 rounded hover:bg-gray-800"
              onClick={() => setCurrentView(`playlist-${playlist.id}`)}
            >
              <div>{playlist.name}</div>
              <div className="text-xs text-gray-500">{playlist.songs.length} songs</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar