import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumCollectionComponent } from './album-collection/album-collection.component';
import { AlbumComponent } from './album/album.component';
import { NewSongComponent } from './new-song/new-song.component';
import { NewAlbumComponent } from './new-album/new-album.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './helpers/auth.guard';



const routes: Routes = [
    { path: '', component: AlbumCollectionComponent },
    { path: 'album/create', component: NewAlbumComponent, canActivate: [AuthGuard]},
    { path: 'album/:id', component: AlbumComponent },
    { path: 'playlist/:id', component: PlaylistComponent },
    { path: 'new_song', component: NewSongComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
