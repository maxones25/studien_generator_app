import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataService } from './scheduling-data.service';
import { ParticipantNotification } from '@entities';
import { PushNotificationType } from './push-notification-type.enum';
const webpush = require('web-push');

@Injectable()
export class SchedulingService {

  private lastChecked: Date;
  private readonly logger = new Logger(SchedulingService.name);

  constructor(private readonly dataService: DataService) {
    this.lastChecked = new Date();
  }
  

  @Cron('0 * * * * *')
  async handleCron() {
    const notifications = await this.dataService.getNewEntriesFromNotifications(this.lastChecked);
    notifications.forEach(({participant, newDate, oldDate}) => {
      const type = PushNotificationType.Notification
      const message = this.createNotificationMessage(type, 'test', newDate, oldDate)
      this.sendPushNotification(participant.subscription, type, message);
    })
    const messages = await this.dataService.getNewEntriesFromChat(this.lastChecked);
    messages.forEach(({participant}) => {
      const type = PushNotificationType.Chat
      const message = this.createNotificationMessage(type)
      this.sendPushNotification(participant.subscription, type, message);
    })
    const tasks = await this.dataService.getNewEntriesFromTasks(this.lastChecked);
    tasks.forEach(({participant, scheduledAt, form}) => {
      const type = PushNotificationType.Task
      const message = this.createNotificationMessage(type, form.name, scheduledAt)
      this.sendPushNotification(participant.subscription, type, message);
    })
    this.lastChecked = new Date
  }

  sendPushNotification(
    subscription: string, type: PushNotificationType, message: string, date?: Date
  ) {
    const options = {
      vapidDetails: {
        subject: 'mailto:myuserid@email.com',
        publicKey: process.env.VAPID_PUBLIC_KEY,
        privateKey: process.env.VAPID_PRIVATE_KEY,
      },
    }
    webpush
    .sendNotification(
      JSON.parse(subscription),
      JSON.stringify({
        title: 'StudyApp',
        type,
        message,
        date
      }),
      options,
    )
    .then((log) => {
      console.log('Push notification sent.');
      console.log(log);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  createNotificationMessage(type: PushNotificationType, name?: string, newDate?: Date, oldDate?: Date ) {
    switch (type) {
      case PushNotificationType.Chat:
        return `Neue Chatnachricht`;
      case PushNotificationType.Notification:
        return `${name} wurde vom ${oldDate} auf den ${newDate} verschoben`;
      case PushNotificationType.Task:
        return `${name} muss um ${newDate} bearbeitet werden`;
      default:
        break;
    }
  }
}