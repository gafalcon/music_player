import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumCollectionComponent } from './album-collection/album-collection.component';
import { AlbumComponent } from './album/album.component';
import { NewSongComponent } from './new-song/new-song.component';
import { NewAlbumComponent } from './new-album/new-album.component';
import { PlaylistComponent } from './playlist/playlist.component';



const routes: Routes = [
    { path: '', component: AlbumCollectionComponent },
    { path: 'album/create', component: NewAlbumComponent},
    { path: 'album/:id', component: AlbumComponent },
    { path: 'playlist/:id', component: PlaylistComponent },
    { path: 'new_song', component: NewSongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
