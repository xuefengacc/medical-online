import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreListComponent } from './admin-store-list.component';

describe('AdminStoreListComponent', () => {
  let component: AdminStoreListComponent;
  let fixture: ComponentFixture<AdminStoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
