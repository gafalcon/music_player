import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    @Input() title: string;
    @Input() body: string;
    @Input() okMsg = 'Confirm';
    @Input() cancel = true;

    constructor(
        public activeModal: NgbActiveModal
    ) { }

    ngOnInit() {
    }

}
