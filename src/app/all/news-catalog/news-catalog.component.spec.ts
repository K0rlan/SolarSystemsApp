import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCatalogComponent } from './news-catalog.component';

describe('NewsCatalogComponent', () => {
  let component: NewsCatalogComponent;
  let fixture: ComponentFixture<NewsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
