import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

import {AuthService} from '../../services/auth.service';

/**
 * TODO add validation to form
 */

@Component({
  selector: 'mls-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;
  credentialsForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly translateService: TranslateService,
    private readonly snackBar: MatSnackBar) {
  }

  onLoginClick() {
    this.loading = true;
    this.authService.login(
      this.credentialsForm.controls.username.value,
      this.credentialsForm.controls.password.value
    ).subscribe(
      () => {
        this.loading = false;
        this.snackBar.dismiss();
        console.log('Successfully logged in.');
      },
      error => {
        this.loading = false;
        this.translateService.get(error.status === 403 ? 'login.errors.credentials' : 'login.errors.failed', error).subscribe(message =>
          this.snackBar.open(message, null, {verticalPosition: 'top'})
        );
      }
    );
  }
}
