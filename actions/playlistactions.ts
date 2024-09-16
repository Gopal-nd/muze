'use server'

import prisma from "@/utils/db"
import { serverSession } from "@/utils/getserverSession"

export async function CreatePlaylist(name:string){
    console.log(name)
    const id = await serverSession()
    const email:string|null|undefined = id?.user?.email
    if(!email) return
    const playlist = await prisma.playlist.create({
        data:{
            name,
            email:email
        },
        select:{
            name:true
        }
    })   
    return playlist
}


export const allPlaylists = async() => {
    const id = await serverSession()
    const email:string|null|undefined = id?.user?.email
    if(!email) return
    const playlists = await prisma.playlist.findMany({
        where:{
            email
        }
        ,select:{
            name:true,
            id:true,
            email:true,
            
            
        }
    })
    return playlists
}