import { Play, Music, Heart } from 'lucide-react'

const HomeView = ({ recentlyPlayed, allTracks, likedSongs, toggleLikedSong, handlePlayTrack }) => {
  const featuredPlaylists = [
    { id: 1, title: 'Today\'s Top Hits', color: 'bg-green-500' },
    { id: 2, title: 'RapCaviar', color: 'bg-orange-500' },
    { id: 3, title: 'All Out 2010s', color: 'bg-purple-500' },
    { id: 4, title: 'Rock Classics', color: 'bg-red-500' },
    { id: 5, title: 'Chill Hits', color: 'bg-cyan-500' },
    { id: 6, title: 'Pop Rising', color: 'bg-yellow-500' }
  ]

  return (
    <>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Good evening</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPlaylists.slice(0, 6).map((playlist) => (
            <div key={playlist.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded ${playlist.color} flex items-center justify-center`}>
                  <Music size={24} className="text-white" />
                </div>
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
          {(recentlyPlayed.length > 0 ? recentlyPlayed : allTracks).slice(0, 5).map((track) => (
            <div key={track.id} className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800 group cursor-pointer"
                 onClick={() => handlePlayTrack(track, recentlyPlayed.length > 0 ? recentlyPlayed : allTracks)}>
              <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center">
                <Play size={16} className="opacity-0 group-hover:opacity-100" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{track.title}</p>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
              <div className="text-gray-400 text-sm">{track.album}</div>
              <div className="text-gray-400 text-sm">{track.duration}</div>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLikedSong(track)
                }}
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

      <section>
        <h2 className="text-2xl font-bold mb-6">Made for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {featuredPlaylists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
              <div className="relative mb-4">
                <div className={`w-full aspect-square rounded-lg ${playlist.color} flex items-center justify-center`}>
                  <Music size={40} className="text-white" />
                </div>
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
}

export default HomeView