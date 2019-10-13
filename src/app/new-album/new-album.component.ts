import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax
import { NotificationsService } from 'angular2-notifications';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {

    form: FormGroup;
    coverArtUrl: any = 'http://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png';
    public imageFile: File;
    public wasValidated = false;
    public invalidImage = false;
    public imgFileError = '';
    public audioFileError = [];
    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private notifier: NotificationsService,
        private router: Router
    ) {

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            author: ['', Validators.required],
            release_date: ['', Validators.required],
            songs: this.formBuilder.array([]),
            cover_art_img: ['']
        });
    }

    ngOnInit() {
    }
    get songs() {
        return this.form.get('songs') as FormArray;
    }
    addSongForm(event: Event) {
        console.log('Add song form');
        event.preventDefault();
        const songform = this.formBuilder.group({
            name: ['', Validators.required],
            media_file: ['', Validators.required]
        });
        (this.form.controls.songs as FormArray).push(songform);
        this.audioFileError.push('');
    }

    deleteSongForm(i: number) {
        (this.form.controls.songs as FormArray).removeAt(i);
        this.audioFileError.splice(i, 1);
    }

    onSubmit() {
        this.wasValidated = true;
        if (this.form.status !== 'VALID') {
            this.notifier.error('There are errors in your form');
            return;
        }
        // this.apiService.newAlbum(this.form.value).subscribe((res) => console.log(res));
        this.apiService.newAlbum(this.form.value).pipe(
            mergeMap((album) => {
                console.log(album);
                const requests = [];

                album.songs.forEach((song, idx) => {
                    console.log((this.form.controls.songs as FormArray).controls[idx].get('media_file').value);
                    const songdata = new FormData();
                    songdata.append('song_id', String(song.id));
                    songdata.append('media_file', (this.form.controls.songs as FormArray).controls[idx].get('media_file').value);
                    requests.push(this.apiService.uploadSong(songdata));

                });

                if (this.imageFile) {
                    const data = new FormData();
                    data.append('album_id', String(album.id));
                    data.append('cover_file', this.imageFile);
                    requests.push(this.apiService.uploadAlbumCover(data));
                }
                return forkJoin(requests);

            })
        ).subscribe((res) => {
            console.log(res);
            this.notifier.success('Album uploaded!');
            this.router.navigate(['/']);
        });
    }

    imageSelected(files: FileList) {
        if (files.length === 0){
            return;
        }
        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.invalidImage = true;
            this.imgFileError = 'Only images are supported';
            return;

        }

        this.invalidImage = false;
        this.imgFileError = '';
        const reader = new FileReader();
        this.imageFile = files[0];
        reader.readAsDataURL(files[0]);
        reader.onload = (_) => {
            this.coverArtUrl = reader.result;
        };
        // this.form.get('cover_art_img').setValue(this.imageFile)
    }

    songFileSelected(files: FileList, idx: number, evt: any) {
        if (files.length === 0) {
            return;
        }
        const mimeType = files[0].type;
        if (mimeType.match(/audio\/*/) == null) {
            this.audioFileError[idx] = 'You need to select and audio file';
            evt.target.value = '';
            return;
        }
        this.audioFileError[idx] = '';
        (this.form.controls.songs as FormArray).controls[idx].get('media_file').setValue(files[0]);

    }

}
