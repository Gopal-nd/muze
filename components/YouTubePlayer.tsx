
import {FC, useState} from 'react'
import YouTube, { YouTubeProps ,YouTubeEvent} from 'react-youtube'
import { Button } from './ui/button'


interface YoutubePlayerProps {
    playlist: string[]
}

const YouTubePlayer: FC<YoutubePlayerProps> = ({playlist}) => {

    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0)

    const handleVideoEnd = (event: YouTubeEvent) => {
        if (currentVideoIndex < playlist.length - 1) {
          setCurrentVideoIndex(currentVideoIndex + 1); // Move to the next video
        }
      };
    
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1, // Autoplay the video
    },
  };

  return (
    <div className="w-full flex flex-col justify-center my-6">


         {/* to list the songs */}
        {
            playlist.length > 0 && (
                <ul className=" ml-8 mt-4 list-none">
                {playlist.map((id, index) => (
                  <li key={index} className="text-gray-700 " onClick={() => setCurrentVideoIndex(index)}>
                    <div className='text-lg font-bold cursor-pointer text-blue-600' >

                  {index + 1}. video id = {id}
                    </div>
                
                  </li>
                ))}
              </ul>
            )
        }

        {/* to display and currently play the song */}

    {playlist.length > 0 ? (
        <div className="w-full mt-10 flex justify-center my-6">

      <YouTube
        videoId={playlist[currentVideoIndex]}
        opts={opts}
        onEnd={handleVideoEnd}
        className="shadow-lg rounded-lg"
        />
        </div>
    ) : (
      <p className="text-center text-gray-500">No videos in the playlist.</p>
    )}


    {/* choosing the songs to play */}

 {playlist.length > 0 &&  <div className='flex mt-6 justify-center items-center gap-3 text-center'>

        { currentVideoIndex > 0 ?
        <Button onClick={() => setCurrentVideoIndex(currentVideoIndex - 1)}>prev</Button>:
        <Button disabled>prev</Button>
        }

        <p>{currentVideoIndex + 1}</p>

        {
         currentVideoIndex < playlist.length - 1 ?
        <Button onClick={() => setCurrentVideoIndex(currentVideoIndex + 1)}>next</Button>:
        <Button disabled>next</Button>
        }
    </div>
 }
  </div>
  );
}


export default YouTubePlayer