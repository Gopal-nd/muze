import { FC, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList";
import { RmoveSong } from "@/actions/addsong";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "./ui/button";

interface Video {
  youtubeId: string;
  title: string;
  thumbnail: string;
}

interface YouTubePlayerProps {
  playlist: any;
  setPlaylist: (playlist: any) => void;
  playlistId: string;
}

const YouTubePlayer: FC<YouTubePlayerProps> = ({ playlist, setPlaylist, playlistId }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleVideoEnd = () => {
    if (currentVideoIndex < playlist.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handleRemove = async (youtubeId: string, index: number) => {
    setLoading(true);
    try {
      const removeSong = await RmoveSong(youtubeId, playlistId);
      if (removeSong) {
        toast({
          title: "Song Removed",
          description: "Your song has been removed successfully.",
        });
      }
      const updatedPlaylist = playlist.filter((_: any, i: number) => i !== index);
      setPlaylist(updatedPlaylist);
      if (currentVideoIndex === index) {
        setCurrentVideoIndex(Math.max(0, currentVideoIndex - 1));
      }
    } catch (error) {
      console.error('Error removing song:', error);
      toast({
        title: "Error",
        description: "Failed to remove the song.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 justify-center my-6">
      {/* Display the currently playing video */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
        <h2 className="text-xl font-semibold">Currently Playing</h2>
        {loading ? (
          <LoadingSpinner />
        ) : playlist.length > 0 ? (
          <div className="w-full mt-10 flex justify-center my-6">
            <VideoPlayer
              videoId={playlist[currentVideoIndex].youtubeId}
              onEnd={handleVideoEnd}
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">No videos in the playlist.</p>
        )}

        {/* Controls for navigating between videos */}
        {playlist.length > 0 && (
          <div className="flex mt-6 justify-center items-center gap-3 text-center">
            {currentVideoIndex > 0 ? (
              <Button onClick={() => setCurrentVideoIndex(currentVideoIndex - 1)}>prev</Button>
            ) : (
              <Button disabled>prev</Button>
            )}

            <p>{currentVideoIndex + 1}</p>

            {currentVideoIndex < playlist.length - 1 ? (
              <Button onClick={() => setCurrentVideoIndex(currentVideoIndex + 1)}>next</Button>
            ) : (
              <Button disabled>next</Button>
            )}
          </div>
        )}
      </div>

      {/* List the videos with title and thumbnail */}
      <VideoList
        playlist={playlist}
        onRemove={handleRemove}
        onSelect={setCurrentVideoIndex}
        currentVideoIndex={currentVideoIndex}
      />
    </div>
  );
};

export default YouTubePlayer;
