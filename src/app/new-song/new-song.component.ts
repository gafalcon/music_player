import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray} from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {

    // name = new FormControl('');

    genres = [
        { id: 1, name: 'rock' },
        { id: 2, name: 'pop' },
        { id: 3, name: 'classical' },
        { id: 4, name: 'r&b' }
    ];

    mediaFile: File;

    form: FormGroup;
    albums: Array<object>;

    constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
        this.form = this.formBuilder.group({
            name: [''],
            genres: this.formBuilder.array([]),
            album: [''],
            media_file: [''],
            lyrics: ['']
        });

        this.addGenreCheckboxes();
    }
    private addGenreCheckboxes() {
        this.genres.forEach((o, i) => {
            const control = new FormControl(i === 0); // if first item set to true, else false
            (this.form.controls.genres as FormArray).push(control);
        });
    }

    ngOnInit() {
        this.apiService.getAlbums(0).subscribe(
             albums => {this.albums = albums;
                        console.log(albums);
            }
        );
    }

    onSubmit() {
        console.warn(this.form.value);
    }

    fileUpload(evt){
        console.log(evt.target.files);
        this.mediaFile = evt.target.files[0];
    }

}
