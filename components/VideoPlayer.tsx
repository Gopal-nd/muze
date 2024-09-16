import { FC } from "react";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  videoId: string;
  onEnd: () => void;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoId, onEnd }) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1, // Autoplay the video
    },
  };

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onEnd={onEnd}
      className="shadow-lg rounded-lg"
    />
  );
};

export default VideoPlayer;
