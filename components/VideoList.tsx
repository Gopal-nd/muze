import { FC } from "react";
import { Button } from "./ui/button";

interface Video {
  youtubeId: string;
  title: string;
  thumbnail: string;
}

interface VideoListProps {
  playlist: Video[];
  onRemove: (youtubeId: string, index: number) => void;
  onSelect: (index: number) => void;
  currentVideoIndex: number;
}

const VideoList: FC<VideoListProps> = ({ playlist, onRemove, onSelect, currentVideoIndex }) => {
  return (
    <div className="w-full lg:w-1/2">
      <h2 className="text-xl font-semibold">Playlist</h2>
      {playlist.length > 0 && (
        <ul className="flex flex-col gap-4 mt-4 list-none">
          {playlist.map((video, index) => (
            <li key={index} className="flex items-start gap-4 cursor-pointer">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-30 h-30 shadow-lg rounded-lg"
                onClick={() => onSelect(index)}
              />
              <div className="text-lg font-bold flex items-start justify-between flex-col gap-4">
                <p>
                  {index + 1}. {video.title}
                </p>
                <Button
                  onClick={() => onRemove(video.youtubeId, index)}
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
  );
};

export default VideoList;
