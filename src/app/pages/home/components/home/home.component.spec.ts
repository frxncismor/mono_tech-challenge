import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a header with h1 title', () => {
    const header = fixture.nativeElement.querySelector('.header');
    expect(header.querySelector('h1')).toBeTruthy();
  });
  it('should create a card with home title', () => {
    const header = fixture.nativeElement.querySelector('.header');
    expect(header.querySelector('h1').innerText).toContain('Home');
  });
  it('should create a card with your transactions as title', () => {
    const card = fixture.nativeElement.querySelectorAll('.card__header')[0];
    expect(card.querySelector('div').innerText).toContain('Your Transactions');
  });
  it('should create a card with leads as title', () => {
    const card = fixture.nativeElement.querySelectorAll('.card__header')[1];
    expect(card.querySelector('div').innerText).toContain('Leads');
  });
});
