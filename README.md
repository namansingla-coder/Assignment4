# 🎵 Spotify Clone

A modern, feature-rich Spotify clone built with React, Vite, and Tailwind CSS. Experience seamless music streaming with advanced player controls, playlist management, and real-time search functionality.

## ✨ Features

### 🎧 Core Music Features
- **Interactive Music Player** with play/pause, skip controls
- **Real-time Search** across songs, artists, albums, and genres
- **Playlist Creation** with custom names and descriptions
- **Library Management** with genre filtering
- **Like/Unlike Songs** functionality

### 🎛️ Advanced Player Controls
- Clickable progress bar for track seeking
- Volume control with mute functionality
- Shuffle and repeat modes (off/all/one)
- Skip forward/backward navigation
- Visual feedback and animations

### 🎨 Modern UI/UX
- Spotify-inspired dark theme design
- Responsive layout for all screen sizes
- Smooth hover animations and transitions
- Professional component architecture
- Interactive sidebar navigation

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Navigation and playlists
│   ├── MainContent.jsx      # Home, search, and library views
│   ├── Player.jsx           # Music player controls
│   ├── TrackList.jsx        # Reusable track display
│   └── CreatePlaylistModal.jsx # Playlist creation
├── App.jsx                  # Main application component
└── index.css               # Global styles and Tailwind imports
```

## 🎯 Key Components

### Sidebar
- Navigation between Home, Search, and Library
- Playlist management and creation
- Interactive menu with active states

### MainContent
- **Home View**: Featured playlists and recent tracks
- **Search View**: Real-time search with genre browsing
- **Library View**: All tracks with genre filtering

### Player
- Full music player with all standard controls
- Interactive progress and volume bars
- Shuffle, repeat, and like functionality

### TrackList
- Reusable component for displaying tracks
- Hover effects and play buttons
- Like functionality for individual tracks

## 🎵 Sample Music Library

The app includes 10 sample tracks across various genres:
- Pop, Hip Hop, Rock, R&B, Indie Pop
- Artists: The Weeknd, Harry Styles, Dua Lipa, Olivia Rodrigo, and more

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

Fully responsive design that works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 Design Features

- **Dark Theme**: Professional Spotify-inspired color scheme
- **Smooth Animations**: Hover effects and transitions
- **Interactive Elements**: Clickable progress bars and controls
- **Visual Feedback**: Active states and loading indicators

---

Built with ❤️ using React + Vite + Tailwind CSS
