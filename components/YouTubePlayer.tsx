import { FC, useState } from "react";
import YouTube, { YouTubeProps, YouTubeEvent } from "react-youtube";
import { Button } from "./ui/button";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface YouTubePlayerProps {
  playlist: Video[];
  setPlaylist: (playlist: Video[]) => void;
}

const YouTubePlayer: FC<YouTubePlayerProps> = ({ playlist, setPlaylist }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  const handleVideoEnd = (event: YouTubeEvent) => {
    if (currentVideoIndex < playlist.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1); // Move to the next video
    }
  };

  const handleRemove = (index: number) => {
    const updatedPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(updatedPlaylist);

    if (currentVideoIndex === index) {
      // Adjust currentVideoIndex if the currently playing video is removed
      setCurrentVideoIndex(Math.max(0, currentVideoIndex - 1));
    }
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1, // Autoplay the video
    },
  };

  return (
    <div className="w-full flex flex-col lg:flex-row  gap-4 justify-center my-6">
      {/* Display the currently playing video */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0 ">
        <h2 className="text-xl font-semibold">Currently Playing</h2>
        {playlist.length > 0 ? (
          <div className="w-full mt-10 flex justify-center my-6">
            <YouTube
              videoId={playlist[currentVideoIndex].id}
              opts={opts}
              onEnd={handleVideoEnd}
              className="shadow-lg rounded-lg"
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No videos in the playlist.
          </p>
        )}

        {/* Controls for navigating between videos */}
        {playlist.length > 0 && (
          <div className="flex mt-6 justify-center items-center gap-3 text-center">
            {currentVideoIndex > 0 ? (
              <Button
                onClick={() => setCurrentVideoIndex(currentVideoIndex - 1)}
              >
                prev
              </Button>
            ) : (
              <Button disabled>prev</Button>
            )}

            <p>{currentVideoIndex + 1}</p>

            {currentVideoIndex < playlist.length - 1 ? (
              <Button
                onClick={() => setCurrentVideoIndex(currentVideoIndex + 1)}
              >
                next
              </Button>
            ) : (
              <Button disabled>next</Button>
            )}
          </div>
        )}
      </div>

      {/* List the videos with title and thumbnail */}
      <div className=" w-full lg:w-1/2">
        <h2 className="text-xl font-semibold">Playlist</h2>
        {playlist.length > 0 && (
          <ul className="flex flex-col gap-4 mt-4 list-none ">
            {playlist.map((video, index) => (
              <li
                key={index}
                className="flex  items-start gap-4 cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-30 h-30 shadow-lg rounded-lg"
                  onClick={() => setCurrentVideoIndex(index)}
                />
                <div className="text-lg font-bold flex items-start justify-between flex-col gap-4 ">
                  <p>
                    {index + 1}. {video.title}
                  </p>
                  <Button
                    onClick={() => handleRemove(index)}
                    className="ml-4 bg-red-500 text-white hover:bg-red-600"
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default YouTubePlayer;
