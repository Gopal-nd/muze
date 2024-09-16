'use client'
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { hasUserUpvoted, upvote } from "@/actions/upvote";
import { useRouter } from "next/navigation";

interface Video {
  youtubeId: string;
  title: string;
  thumbnail: string;
  email: string;
  id: string;
  upvote: number;
}

interface VideoListProps {
  playlist: Video[];
  onRemove: (youtubeId: string, index: number) => void;
  onSelect: (index: number) => void;
  currentVideoIndex: number;
}

const VideoList: FC<VideoListProps> = ({ playlist, onRemove, onSelect, currentVideoIndex }) => {
  const { data: session } = useSession();
  const [userUpvotes, setUserUpvotes] = useState<{ [key: string]: boolean }>({});
    const router = useRouter()
  // Fetch user's upvote status for each video
  useEffect(() => {
    async function fetchUpvotes() {
      const upvoteStatuses: { [key: string]: boolean } = {};
      for (const video of playlist) {
        const hasUpvoted = await hasUserUpvoted(video.id);
        upvoteStatuses[video.id] = hasUpvoted;
      }
      setUserUpvotes(upvoteStatuses);
    }
    fetchUpvotes();
  }, [playlist]);

  const toggleVote = async (id: string) => {
    const currentStatus = userUpvotes[id];
    
    // Toggle vote status
    await upvote(id);
    router.refresh()
    // Optimistically update the UI
    setUserUpvotes((prevUpvotes) => ({
      ...prevUpvotes,
      [id]: !currentStatus,
    }));
  };

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
                <div className="flex items-center gap-4">
                  {session?.user?.email === video.email && (
                    <Button
                      onClick={() => onRemove(video.youtubeId, index)}
                      className="ml-4 bg-red-500 text-white hover:bg-red-600"
                    >
                      Remove
                    </Button>
                  )}
                  <p>{
                    session?.user?.email &&
                    <Button onClick={() => toggleVote(video.id)}>
                      {userUpvotes[video.id] ? "Upvoted" : "Vote"}
                    </Button>
}
                    <span className="ml-2"> vote {video.upvote}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoList;
