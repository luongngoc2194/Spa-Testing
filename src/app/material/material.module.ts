import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';


const material = [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatListModule, MatSliderModule, MatCardModule, MatMenuModule, MatDialogModule];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule {
}
