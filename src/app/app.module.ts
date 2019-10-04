import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AlbumComponent } from './album/album.component';
import { AlbumCollectionComponent } from './album-collection/album-collection.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NewSongComponent } from './new-song/new-song.component';
import { NewAlbumComponent } from './new-album/new-album.component';
import { SongListComponent } from './song-list/song-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlaylistComponent,
    AlbumComponent,
    AlbumCollectionComponent,
    NavbarComponent,
    NewSongComponent,
    NewAlbumComponent,
    SongListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      SimpleNotificationsModule.forRoot({
          position: ['top', 'right'],
          timeOut: 5000,
          showProgressBar: true,
          maxStack: 3
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
