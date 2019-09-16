import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumCollectionComponent } from './album-collection/album-collection.component';
import { AlbumComponent } from './album/album.component';
import { NewSongComponent } from './new-song/new-song.component';



const routes: Routes = [
    { path: '', component: AlbumCollectionComponent },
    { path: 'album/:id', component: AlbumComponent },
    { path: 'new_song', component: NewSongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
