'use client'
import { useState } from "react"
import YouTubePlayer from "@/components/YouTubePlayer"
import axios from "axios"


const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY ?? 'AIzaSyDbmp10rFr_H5g6UO9NCig7e7Nj3kNCfbI'; // Replace with your API key

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const Home = () => {
  const [playlist, setPlaylist] = useState<Video[]>([]);
  const [url, setUrl] = useState<string>('');


  const addVideo = async() => {
    // Extract the YouTube video ID from the URL
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) {
      try {
        // Fetch video metadata from YouTube API
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
        );

        if (response.data.items.length > 0) {
          const videoData = response.data.items[0].snippet;
          const newVideo: Video = {
            id: videoId,
            title: videoData.title,
            thumbnail: videoData.thumbnails.medium.url,
          };

          setPlaylist([...playlist, newVideo]);
          setUrl('');
        } else {
          alert('Video not found');
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
        alert('Failed to fetch video details');
      }
    } else {
      alert('Invalid YouTube URL');
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
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

  

    <YouTubePlayer playlist={playlist} setPlaylist={setPlaylist} />

  </div>
  )
}

export default Home