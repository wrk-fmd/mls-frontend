import {Injectable} from '@angular/core';

@Injectable()
export class NotificationService {

  constructor() {
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
}
