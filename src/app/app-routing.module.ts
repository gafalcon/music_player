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
import { ProfileComponent } from './user/profile/profile.component';
import { UsersComponent } from './user/users/users.component';
import { MessagesViewComponent } from './messages/messages-view/messages-view.component';
import { SongComponent } from './song/song.component';
import { HomeComponent } from './home/home.component';
import { PlaylistsModalComponent } from './playlists-modal/playlists-modal.component';
import { SearchComponent } from './search/search.component';



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'album/new', component: NewAlbumComponent, canActivate: [AuthGuard]},
    { path: 'album/:id', component: AlbumComponent },
    { path: 'playlist/:id', component: PlaylistComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'users/profile', component: ProfileComponent },
    { path: 'users/messages', component: MessagesViewComponent },
    { path: 'users/:id', component: ProfileComponent },
    { path: 'admin/users', component: UsersComponent },
    { path: 'songs/new', component: NewSongComponent, canActivate: [AuthGuard]},
    { path: 'songs/:id', component: SongComponent},
    { path: 'test', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
