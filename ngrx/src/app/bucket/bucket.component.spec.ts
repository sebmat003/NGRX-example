import { MatIconModule } from '@angular/material/icon';
import { bucketReducer } from './../_store/bucket/bucket.reducer';
import { StoreModule } from '@ngrx/store';
import { BucketService } from './services/bucket.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketComponent } from './bucket.component';

describe('BucketComponent', () => {
  let component: BucketComponent;
  let fixture: ComponentFixture<BucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BucketComponent],
      providers: [BucketService],
      imports: [StoreModule.forRoot({ bucket: bucketReducer }), MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
