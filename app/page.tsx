'use client'
import { useState } from "react"
import YouTubePlayer from "@/components/YouTubePlayer"

const Home = () => {
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [url, setUrl] = useState<string>('');


  const addVideo = () => {
    // Extract the YouTube video ID from the URL
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) {
      setPlaylist([...playlist, videoId]);
      setUrl(''); // Clear the input after adding
    } else {
      alert('Invalid YouTube URL');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center mt-10">

<div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-10">YouTube Playlist App</h1>

      <div className="flex justify-center mt-8">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="border rounded-lg px-4 py-2 w-2/3 sm:w-1/3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addVideo}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Video
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Playlist</h2>
      </div>

      <YouTubePlayer playlist={playlist} />
    </div>
    </div>
  )
}

export default Home