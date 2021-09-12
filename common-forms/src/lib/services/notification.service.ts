import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {Observer} from 'rxjs';

@Injectable()
export class NotificationService {

  constructor(private readonly translateService: TranslateService, private readonly snackBar: MatSnackBar) {
    Notification.requestPermission().then(
        () => console.log('Browser notifications active'),
        () => console.log('Browser notifications rejected')
    );
  }

  sendNotification(title: string, body: string, sound: boolean) {
    if (sound) {
      // TODO Find a better way of deploying the audio file
      new Audio('assets/notification.ogg').play();
    }
    const notification = new Notification(title, {body});
    setTimeout(() => notification.close(), 3000);
  }

  onError(message: string): Observer<any> {
    return {
      error: e => this.showErrorMessage(message, e),
      next: () => null,
      complete: () => null,
    };
  }

  private showErrorMessage(message: string, e: any) {
    message = this.translateService.instant(message);
    if (e) {
      // TODO i18n, specific validation errors?
      if (e.error && e.error.message) {
        message = `${message}: ${e.error.message}`;
      } else if (e.message) {
        message = `${message}: ${e.message}`;
      }
    }
    this.snackBar.open(message, undefined, {duration: 5000});
  }
}
