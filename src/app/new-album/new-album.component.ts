import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray} from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {

    form: FormGroup;
    coverArtUrl: any = 'http://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png';
    public imagePath;
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
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_) => {
            this.coverArtUrl = reader.result;
        };
    }
}
