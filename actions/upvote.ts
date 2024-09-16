'use server';
import prisma from "@/utils/db";
import { serverSession } from "@/utils/getserverSession"
import { emit } from "process";

export const upvote = async (songId: string,) => {
const user = await serverSession();
const email:string = user?.user?.email!
try {
    
    const exist = await prisma.upvote.findUnique({
        where: {
        email_songId: {
            songId: songId,
            email: email
        }
    }
})

if(exist){
    const deleted = await prisma.upvote.delete({
        where: {
            email_songId: {
                songId: songId,
                email: email
            }
        }
    })  
    await prisma.song.update({
        where: {
            id: songId
        },
        data: {
            upvote: {
                decrement: 1
            }
        }
    })
    return true
} else {
    const created =   await prisma.upvote.create({
        data: {
            email: email,
            songId: songId
        }
    })
    await prisma.song.update({
        where: {
            id: songId
        },
        data: {
            upvote: {
                increment: 1
            }
        }
    })
    return true
}
} catch (error) {
    return false
}
}




export const noofUpvotes = async (songId: string): Promise<any> => {
    
    const songsWithUpvotes = await prisma.song.findMany({
        where: {
            id: songId
        },
        include: {
            _count: {
                select: {
                    upvotes: true
                }
            },
            upvotes:{
                where: {
                    songId: songId
            }
        }
    }
})

return songsWithUpvotes;
  };


  export async function hasUserUpvoted(songId: string, ): Promise<boolean> {
    const id = await serverSession();
    const userEmail = id?.user?.email!
    try {
      const upvote = await prisma.upvote.findUnique({
        where: {
          email_songId: {
            email: userEmail,
            songId,
          },
        },
      });
  
      // If an upvote exists, the user has upvoted the song
      return upvote !== null;
    } catch (error) {
      console.error("Error checking upvote:", error);
      return false;
    }
  }