import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCatalogComponent } from './type-catalog.component';

describe('TypeCatalogComponent', () => {
  let component: TypeCatalogComponent;
  let fixture: ComponentFixture<TypeCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
