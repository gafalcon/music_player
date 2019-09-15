import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCollectionComponent } from './album-collection.component';

describe('AlbumCollectionComponent', () => {
  let component: AlbumCollectionComponent;
  let fixture: ComponentFixture<AlbumCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
