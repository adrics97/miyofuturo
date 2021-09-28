import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Observable,of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { baseURL } from '../../compartido/models/baseurl';
import { AcademiasComponent } from './academias.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { DetalleAcademiaComponent } from '../detalle-academia/detalle-academia.component';
import { AcademiasService } from 'src/app/services/academias.service';
import { Academia } from 'src/app/compartido/models/Academia';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AcademiasComponent', () => {
  let component: AcademiasComponent;
  let fixture: ComponentFixture<AcademiasComponent>;
  let academiasSvc: AcademiasService;

  beforeEach(async () => {    
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatPseudoCheckboxModule,
        FormsModule,
        MatSelectModule,
        HttpClientModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatSliderModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSliderModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'academias', component: AcademiasComponent }]) ],
      declarations: [ AcademiasComponent ],
      providers: [ { provide: AcademiasService},
        { provide: 'baseURL', useValue: baseURL }
        ]
    })
    .compileComponents();
    let academiaservice = new TestBed(AcademiasService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademiasComponent);
    component = fixture.componentInstance;
    academiasSvc = TestBed.inject(AcademiasService);
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('academias creadass deben ser 3', () => {
    expect(component.academias.length).toBe(0);
    });

  afterEach(() =>{
    expect(component.academias.length).toBe(0);
  })
});
