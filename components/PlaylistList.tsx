"use client";
// Playlist.tsx
import React, { Suspense, useEffect, useState } from 'react';
// Import the fetch function
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { allPlaylists } from '@/actions/playlistactions';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Playlist {
  id: string;
  name: string;
  email: string;
}

const PlaylistList: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
    async function fetchData() {

      const playlists = await allPlaylists();
      if(!playlists) return
      setPlaylists(playlists);
    }
    fetchData()
  },[])

  return (
    <div className=" container grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {playlists && playlists.map((playlist: Playlist) => (
        <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
          <Card key={playlist.id}>
            <CardHeader>
              <CardTitle>{playlist.name}</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PlaylistList;
    

