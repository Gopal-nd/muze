'use client'
import { useEffect, useState } from "react"
import YouTubePlayer from "@/components/YouTubePlayer"
import axios from "axios"
import { Addsong, GetAllSongs } from "@/actions/addsong";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { getEmailofId } from "@/actions/playlistactions";


const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
export interface Video {
  
  youtubeId: string;
  title: string;
  thumbnail: string;
}

const Home = ({params}: {params: {id: string}}) => {


  const [playlist, setPlaylist] = useState<any[]>([]);
  const [url, setUrl] = useState<string>('');
  const [email, setEmail] = useState<any>('');
  const {toast} = useToast()
  const user = useSession()
  const addVideo = async() => {


    // Extract the YouTube video ID from the URL
    const videoId = url.split("v=")[1]?.split("&")[0]



    const exist = playlist.some((video:any) => video.youtubeId === videoId) 
     if(exist){
       alert('Video already added')
       setUrl('')
      }
      
    
    if (!exist && videoId) {

      // Check if the video is already in the playlist

      try {
        // Fetch video metadata from YouTube API
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
        );
        console.log("response", response.data)
        // Check if the video was found
        if (response.data.items.length > 0) {
          const videoData = response.data.items[0].snippet;
          const newVideo: Video = {
            youtubeId: videoId,
            title: videoData.title,
            thumbnail: videoData.thumbnails.medium.url,
          };


          // Add the new video to the playlist
          setPlaylist([...playlist, newVideo]);

          const res = await Addsong(newVideo,params.id)
          if(res){
            toast({
              title: "Song Added",
              description: "Your song has been added successfully.",
            })
          }
          setUrl('');
        } else {
          setUrl('');
          alert('Video not found');
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
        alert('Failed to fetch video details');
      }
    } else{
      setUrl('');
      alert('Invalid URL')
    }
  };

  useEffect(() => {
    const fetchPlaylist = async() => {
      const songs = await GetAllSongs(params.id)
      setPlaylist(songs)
      const platlistEmail = await getEmailofId(params.id)
      setEmail(platlistEmail)
      console.log("createor email " + platlistEmail)
      
    }
    fetchPlaylist()
  },[])

  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="flex justify-evenly items-center mt-20">
    <h1 className="text-3xl font-bold text-center ">YouTube Playlist App</h1>
        <Button onClick={() => { navigator.clipboard.writeText(window.location.href),
        toast({
          title: "Link Copied",
        })
        }}><CopyIcon className="mr-2"/> Copy Link</Button>
      </div>
{ user.data?.user?.email ===  email   &&

    <div className="flex justify-center px-10 flex-grow mt-8">
      

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        className="border rounded-lg px-4 py-2 w-full sm:w-1/3   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      <button
        onClick={addVideo}
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
        Add Video
      </button>
        
    </div>
        }

  

    <YouTubePlayer playlist={playlist} setPlaylist={setPlaylist} playlistId={params.id} />

  </div>
  )
}

export default Home