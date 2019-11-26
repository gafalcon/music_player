import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';

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
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ProfileComponent } from './user/profile/profile.component';
import { UsersComponent } from './user/users/users.component';
import { CommentsComponent } from './comments/comments.component';
import { LikesComponent } from './likes/likes.component';

import { AuthService } from "./auth.service";

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
    SignupComponent,
    ProfileComponent,
    UsersComponent,
    CommentsComponent,
    LikesComponent
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
      }),
      OAuthModule.forRoot()
  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AuthService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
