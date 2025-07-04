import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonToggleComponent } from '../../ui/button-toggle/button-toggle.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputComponent } from '../../ui/input/input.component';
import { SearchComponent } from '../../ui/search/search.component';
@Component({
  selector: 'app-create-app',
  standalone: true,
  imports: [
    MatDialogModule,
    ButtonComponent,
    ButtonToggleComponent,
    CommonModule,
    FormsModule,
    InputComponent,
    SearchComponent,
  ],
  templateUrl: './create-app.component.html',
  styleUrl: './create-app.component.css',
})
export class CreateAppComponent {
  selected_form = 'app';
  form_types = [
    { name: 'App', value: 'app' },
    { name: 'Creator', value: 'creator' },
    { name: 'App Creator', value: 'appcreator' },
    { name: 'Job', value: 'job' },
  ];

  forms: any = {
    app: [{ placeholder: 'App name', name: 'name', value: '' }],
  };
  form: any = this.forms['app'];

  constructor(private dialogRef: MatDialogRef<CreateAppComponent>) {}
  changeForm(event: any) {
    this.selected_form = event;
    this.form = this.forms[this.selected_form] || [];
  }
  applySearch(event: any) {}
  submit() {
    this.dialogRef.close(true);
  }
}
