import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrosoftGraphComponent } from './microsoft-graph.component';

describe('MicrosoftGraphComponent', () => {
  let component: MicrosoftGraphComponent;
  let fixture: ComponentFixture<MicrosoftGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrosoftGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicrosoftGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
