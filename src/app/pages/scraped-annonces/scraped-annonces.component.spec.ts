import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapedAnnoncesComponent } from './scraped-annonces.component';

describe('ScrapedAnnoncesComponent', () => {
  let component: ScrapedAnnoncesComponent;
  let fixture: ComponentFixture<ScrapedAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrapedAnnoncesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapedAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
