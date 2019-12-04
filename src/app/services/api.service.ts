import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
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
import { mergeMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private apiURL = `${environment.apiUrl}/api`;
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

    // Genres
    getGenres() {
        return this.http.get(`${this.apiURL}/genres`);
    }

    // Search
    findByName(modelType: string, name: string) {
        return this.http.get(`${this.apiURL}/${modelType}/search/name/${name}`);
    }

    findAlbumsByGenre(genre: string) {
        return this.http.get(`${this.apiURL}/albums/search/genre/${genre}`);
    }

    findAll(query: string) {
        const albums = this.findByName('albums', query);
        const songs = this.findByName('songs', query);
        const pls = this.findByName('playlists', query);
        const genres = this.findAlbumsByGenre(query);
        return forkJoin([albums, songs, pls, genres]).pipe(
            map((results: any) => {
                console.log(results);
                results[0].forEach(res => res.model = 'album');
                results[1].forEach(res => res.model = 'song');
                results[2].forEach(res => res.model = 'playlist');
                results[3].forEach(res => res.model = 'album genre');
                results = results.flat();
                return results;
            })
        );
    }
}
