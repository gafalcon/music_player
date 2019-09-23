import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray} from '@angular/forms';
import { ApiService } from '../api.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {

    form: FormGroup;
    coverArtUrl: any = 'http://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png';
    public imageFile: File;
    constructor(private formBuilder: FormBuilder, private apiService: ApiService) {

        this.form = this.formBuilder.group({
            name: [''],
            author: [''],
            release_date: [''],
            songs: this.formBuilder.array([]),
            album: [''],
            cover_art_img: ['']
        });
    }

    ngOnInit() {
    }
    get songs() {
        return this.form.get('songs') as FormArray;
    }
    addSongForm(event) {
        console.log('Add song form');
        event.preventDefault();
        const songform = this.formBuilder.group({
            name: [''],
            media_file: ['']
        });
        (this.form.controls.songs as FormArray).push(songform);
    }

    onSubmit() {
        console.log(this.form.value);
        // this.apiService.newAlbum(this.form.value).subscribe((res) => console.log(res));
        this.apiService.newAlbum(this.form.value).pipe(
            mergeMap((album) => {
                console.log(album);
                const data = new FormData();
                data.append('album_id', String(album.id));
                data.append('cover_file', this.imageFile);

                album.songs.forEach((song, idx) => {
                    console.log((this.form.controls.songs as FormArray).controls[idx].get('media_file').value);
                    const songdata = new FormData();
                    songdata.append('song_id', String(song.id));
                    songdata.append('media_file', (this.form.controls.songs as FormArray).controls[idx].get('media_file').value);
                    this.apiService.uploadSong(songdata).subscribe((res) => {
                        console.log('media file uploaded!');
                        console.log(res);
                    });

                });

                return this.apiService.uploadAlbumCover(data);

            })
        ).subscribe((res) => console.log(res));
    }

    imageSelected(files: FileList) {
        if (files.length === 0)
            return;

        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            // this.message = "Only images are supported.";
            return;
        }

        const reader = new FileReader();
        this.imageFile = files[0];
        reader.readAsDataURL(files[0]);
        reader.onload = (_) => {
            this.coverArtUrl = reader.result;
        };
        // this.form.get('cover_art_img').setValue(this.imageFile)
    }

    songFileSelected(files: FileList, idx: number) {
        if (files.length === 0)
            return;
        // TODO Check mimeType
        (this.form.controls.songs as FormArray).controls[idx].get('media_file').setValue(files[0]);

    }
}
