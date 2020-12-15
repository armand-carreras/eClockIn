import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

const materials= [
  ReactiveFormsModule,
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  FormsModule,
  MatFormFieldModule,
  MatListModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
];

@NgModule({

  declarations: [],
  imports: [
    CommonModule,
    ...materials
  ],
  exports: [...materials]
})
export class MaterialModule { }
