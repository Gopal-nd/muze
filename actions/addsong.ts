"use server";
import { Video } from "@/app/playlist/[id]/page";
import prisma from "@/utils/db";
import { serverSession } from "@/utils/getserverSession";

export const Addsong = async (video: Video, playlistId: string) => {
  const id = await serverSession();
  const email: string  = id.user?.email ||""

  try {
    
      const exist = await prisma.song.findUnique({
          where: {
              youtubeId_playListId_email: {
                  youtubeId: video.youtubeId,
                  playListId: playlistId,
                  email: email,
                },
            },
            select: {
                youtubeId: true,
                title: true,
                email: true,
                thumbnail: true,
                playListId: true,
                id: true,
                
            }
        });
        
        if (exist) {
            return false
        }
        
        if (!exist) {
            const newsong = await prisma.song.create({
                data: {
                    title: video.title,
                    thumbnail: video.thumbnail,
                    youtubeId: video.youtubeId,
                    email: email,
                    playListId: playlistId,
                },
            });
            
            return true;
        } 
    } catch (error) {
        console.log(error)
      return false
    }
};

export async function GetAllSongs(playListId: string) {
  const songs = await prisma.song.findMany({
    where: {
      playListId: playListId,
    },
    select: {
      title: true,
      thumbnail: true,
      youtubeId: true,
      email: true,
      id:true,
      upvotes: true,
      upvote: true
    },
    orderBy:{
        upvote: 'desc'
    }
    
  });
  return songs;
}

export async function RmoveSong(youtubeId: string, playListId: string) {
  const user = await serverSession();
  const email: string = user?.user?.email!;
  try {
    const song = await prisma.song.delete({
      where: {
        youtubeId_playListId_email: {
          youtubeId: youtubeId,
          playListId: playListId,
          email: email,
        },
        
      },
      
    });
    return true;
  } catch {
    return false;
  }
}
