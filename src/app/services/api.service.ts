import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Song } from '../models/song';
import { Playlist } from '../models/playlist';
import { Album } from '../models/album';
import { environment } from '../../environments/environment';
import { Role } from '../models/role';
import { User } from '../models/user';
import { UserStatus } from '../models/status';
import { Comment } from '../models/comment';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private apiURL = `${environment.apiUrl}/api`;
    songs: Array<Song> = [
        {
            id: 1,
            name: 'Risin\' High (feat Raashan Ahmad)',
            artist: 'Ancient Astronauts',
            album: 'We Are to Answer',
            url: 'https://521dimensions.com/song/Ancient Astronauts - Risin\' High (feat Raashan Ahmad).mp3',
            cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg'

            ,totalLikes: 0,
            totalDislikes: 0,
            totalReproductions:0
        },
        {
            id: 2,
            name: 'The Gun',
            artist: 'Lorn',
            album: 'Ask The Dust',
            url: 'https://521dimensions.com/song/08 The Gun.mp3',
            cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/ask-the-dust.jpg'
            ,totalLikes: 0,
            totalDislikes: 0,
            totalReproductions:0
        },
        {
            id: 3,
            name: 'Anvil',
            artist: 'Lorn',
            album: 'Anvil',
            url: 'https://521dimensions.com/song/LORN - ANVIL.mp3',
            cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/anvil.jpg'
            ,totalLikes: 0,
            totalDislikes: 0,
            totalReproductions:0
        },
        {
            id: 4,
            name: 'I Came Running',
            artist: 'Ancient Astronauts',
            album: 'We Are to Answer',
            url: 'https://521dimensions.com/song/ICameRunning-AncientAstronauts.mp3',
            cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg'
            ,totalLikes: 0,
            totalDislikes: 0,
            totalReproductions:0
        },
        {
            id: 5,
            name: 'First Snow',
            artist: 'Emancipator',
            album: 'Soon It Will Be Cold Enough',
            url: 'https://521dimensions.com/song/FirstSnow-Emancipator.mp3',
            cover_art_url: 'https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg'
            ,totalLikes: 0,
            totalDislikes: 0,
            totalReproductions:0
        }
    ];
    constructor(private http: HttpClient) { }

    getPlaylists(): Observable<Array<object>> {
        return this.http.get<Array<object>>(this.apiURL + '/playlists');
    }

    // Albums
    getMostLikedAlbums(): Observable<Array<Album>> {
        return this.http.get<Array<Album>>(`${this.apiURL}/albums/likes/most`);
    }

    getRecentlyPlayedAlbums(): Observable<Array<Album>> {
        return this.http.get<Array<Album>>(`${this.apiURL}/albums/reprs/recent`);
    }

    getRecentAlbums(): Observable<Array<Album>> {
        return this.http.get<Array<Album>>(`${this.apiURL}/albums/recent`);
    }

    getMostReproducedAlbums(): Observable<Array<Album>> {
        return this.http.get<Array<Album>>(`${this.apiURL}/albums/reprs/most`);
    }

    getAlbums(): Observable<Array<Album>> {
        return this.http.get<Array<Album>>(`${this.apiURL}/albums`);
    }

    getAlbumsByUser(userId: number): Observable<Array<Album>> {
        return this.http.get<Array<Album>>(`${this.apiURL}/albums/user/${userId}`);
    }

    getAlbum(id: number): Observable<Album> {
        return this.http.get<Album>(this.apiURL + '/albums/' + String(id));
    }

    newAlbum(album: Album) {
        return this.http.post<Album>(this.apiURL + '/albums', album);
    }

    uploadAlbumCover(data: any) {
        return this.http.post(this.apiURL + '/albums/cover', data);
    }

    deleteAlbum(albumId: number) {
        return this.http.delete(`${this.apiURL}/albums/${albumId}`);
    }

    // Playlists
    getPlaylist(id): Observable<Playlist> {
        return this.http.get<Playlist>(this.apiURL + '/playlists/' + id);
        // return of(data.full_playlists[id]);
    }

    getPlaylistsByUser(userId: number): Observable<Array<Playlist>> {
        return this.http.get<Array<Playlist>>(`${this.apiURL}/playlists/user/${userId}`);
    }

    getCurrentPlaylist(): Observable<Array<Song>> {
        return of(this.songs);
    }

    deletePlaylist(playlistId: number) {
        return this.http.delete(`${this.apiURL}/playlists/${playlistId}`);
    }

    newPlaylist(playlistName: string, songId: number) {
        return this.http.post(`${this.apiURL}/playlists`, {name: playlistName, songId});
    }

    addSongToPlaylist(playlistId: number, songId: number) {
        return this.http.post(`${this.apiURL}/playlists/${playlistId}/add/${songId}`, null);
    }

    // Songs
    newSong(data) {
        return this.http.post<any>(this.apiURL + '/songs', data);
    }

    uploadSong(data) {
        return this.http.post(this.apiURL + '/songs/upload', data);
    }

    getSong(songId: number): Observable<Song> {
        return this.http.get<Song>(`${this.apiURL}/songs/${songId}`);
    }


    // Users
    updateUserRole(userId: number, userRole: Role) {
        const formData = new FormData();
        formData.append('role', userRole);
        console.log(formData);
        return this.http.post(`${this.apiURL}/users/${userId}/update_role`, formData);
    }

    updateUserStatus(userId: number, userStatus: UserStatus) {
        const formData = new FormData();
        formData.append('status', userStatus);
        console.log(formData);
        return this.http.post(`${this.apiURL}/users/${userId}/update_status`, formData);
    }
    deleteUser(userId: number) {
        return this.http.delete(`${this.apiURL}/users/${userId}`);
    }

    getUser(userId: number) {
        return this.http.get(`${this.apiURL}/users/${userId}`);
    }

    getUsers(): Observable<Array<User>> {
        return this.http.get<Array<User>>(`${this.apiURL}/users`);
    }

    // Comments
    getAlbumComments(albumId: number) {
        return this.http.get<Array<Comment>>(`${this.apiURL}/albums/${albumId}/comments`);
    }
    postAlbumComment(albumId: number, comment: any) {
        return this.http.post<Comment>(`${this.apiURL}/albums/${albumId}/comments`, comment);
    }

    getSongComments(songId: number) {
        return this.http.get<Array<Comment>>(`${this.apiURL}/songs/${songId}/comments`);
    }
    postSongComment(songId: number, comment: any) {
        return this.http.post<Comment>(`${this.apiURL}/songs/${songId}/comments`, comment);
    }

    // Likes

    postLike(modelId: number, modelType: string, likeType: string) {
        return this.http.post(`${this.apiURL}/${modelType}/${modelId}/${likeType}`, null);
    }

    deleteLike(modelId: number, modelType: string, likeType: string) {
        return this.http.delete(`${this.apiURL}/${modelType}/${modelId}/${likeType}`);
    }

    isLikedDisliked(modelId: number, modelType: string) {
        return this.http.get(`${this.apiURL}/${modelType}/${modelId}/is_liked_disliked`);
    }

    // Messages

    newMessage(sender_id: number, receiver_id: number, message: string) {
        return this.http.post(`${this.apiURL}/messages`, {sender_id, receiver_id, message});
    }

    getSentMessages() {
        return this.http.get<Array<Message>>(`${this.apiURL}/messages/sent`);
    }

    getReceivedMessages() {
        return this.http.get<Array<Message>>(`${this.apiURL}/messages/received`);
    }

    getAllMessages() {
        const sent = this.getSentMessages();
        const received = this.getReceivedMessages();
        return forkJoin([sent, received]);
    }
    // getConversations() {

    // }

    // Genres
    getGenres() {
        return this.http.get(`${this.apiURL}/genres`);
    }
}
