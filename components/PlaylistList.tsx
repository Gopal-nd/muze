
// Playlist.tsx
import React, { Suspense } from 'react';
// Import the fetch function
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { allPlaylists } from '@/actions/playlistactions';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Playlist {
  id: string;
  name: string;
}

const PlaylistList: React.FC = async() => {
  const playlists = await allPlaylists(); // This function should return a promise

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

const PlaylistWithSuspense: React.FC = () => (
  <Suspense fallback={<LoadingSpinner/>}>
    <PlaylistList />
  </Suspense>
);

export default PlaylistWithSuspense;
