import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { OrderHistoryComponent } from './order-history/order-history.component'; // Asegúrate de importar el componente correcto
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatTableModule,
        MatCheckboxModule,
        MatIconModule,
        MatNativeDateModule, //DateAdapter
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AppComponent,
        OrderHistoryComponent
      ],
      providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        provideClientHydration(),
        provideHttpClient(withFetch()),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have as title "cemex-tech-test"', () => {
    expect(app.title).toEqual('cemex-tech-test');
  });
});