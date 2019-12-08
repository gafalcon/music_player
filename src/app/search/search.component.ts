import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap, switchMap, catchError } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    searching = false;
    searchFailed = false;
    constructor(
        private api: ApiService,
        private router: Router
    ) { }

    selectedSearch: any;
    formatter = (term) => `${term.model}: ${term.name}`;
    rformatter = (term) => '';
    ngOnInit() {
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            filter(term => term.length > 3),
            tap(() => this.searching = true),
            switchMap(term =>
                      this.api.findAll(term).pipe(
                          tap(() => this.searchFailed = false),
                          catchError(() => {
                              this.searchFailed = true;
                              return of([]);
                          }))
                     ),
            tap(() => this.searching = false)
        )


    SearchSelected(selectedItem: NgbTypeaheadSelectItemEvent) {
        const selected = (selectedItem.item);
        if (selected.model.startsWith('album')) {
            this.router.navigate(['/album', selected.id]);
        } else if (selected.model === 'song') {
            this.router.navigate(['/songs', selected.id]);
        } else if (selected.model === 'playlist') {
            this.router.navigate(['/playlist', selected.id]);
        }
        this.selectedSearch = '';
    }

    submit() {
      console.log(this.selectedSearch);
      if (this.selectedSearch != undefined) {
        this.router.navigateByUrl('/search')
      }
    }
}
