'use client'

import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PlusIcon, SearchIcon } from 'lucide-react'
import prisma from "@/utils/db"
import { allPlaylists, CreatePlaylist } from "@/actions/playlistactions"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function PlaylistManager() {
  const [playlists, setPlaylists] = useState<any>()
  const [searchTerm, setSearchTerm] = useState('')
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const session = useSession()
  const { toast } = useToast()
 
  if(!session.data?.user?.email){
    router.push("/login")
  }

  const handleCreatePlaylist = async() => {
    
        if(!newPlaylistName) return
    
    const res  = await CreatePlaylist(newPlaylistName)
        console.log(res)
      setSearchTerm('')
      setIsModalOpen(false)
      toast({
        title: "Playlist Created",
        description: "Your playlist has been created successfully.",
      })
    
  }


useEffect(() => {
  const fetchPlaylists = async() => {
    const playlist = await allPlaylists()
    setPlaylists(playlist)
  }
  fetchPlaylists()
},[])

  return (
    <div className="container mt-20 mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="flex items-center mb-6 space-x-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search playlists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2" size={20} />
              Create New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleCreatePlaylist}>Create Playlist</Button>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        { playlists && playlists.map((playlist:any) => (
          <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
          <Card key={playlist.id}>
            <CardHeader>
              <CardTitle>{playlist.name}</CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}