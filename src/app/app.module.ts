import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AlbumComponent } from './album/album.component';
import { AlbumCollectionComponent } from './album-collection/album-collection.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewSongComponent } from './new-song/new-song.component';
import { NewAlbumComponent } from './new-album/new-album.component';
import { SongListComponent } from './song-list/song-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ProfileComponent } from './user/profile/profile.component';
import { UsersComponent } from './user/users/users.component';
import { CommentsComponent } from './comments/comments.component';
import { LikesComponent } from './likes/likes.component';
import { ModalComponent } from './templates/modal/modal.component';
import { DeleteUserComponent } from './templates/delete-user/delete-user.component';
import { ChangeUserRoleComponent } from './templates/change-user-role/change-user-role.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { ListCollectionComponent } from './templates/list-collection/list-collection.component';


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
    LikesComponent,
    ModalComponent,
    DeleteUserComponent,
    ChangeUserRoleComponent,
    UserInfoComponent,
    ListCollectionComponent
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
      OAuthModule.forRoot(),
      LoadingBarHttpClientModule,
      LoadingBarRouterModule,
      LoadingBarModule,
      NgbModule,
      FontAwesomeModule
  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    entryComponents: [DeleteUserComponent,
                      ChangeUserRoleComponent,
                      ModalComponent
                     ]
})
export class AppModule { }
