import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataService } from './scheduling-data.service';
import { PushNotificationType } from './push-notification-type.enum';
const webpush = require('web-push');

@Injectable()
export class SchedulingService {
  private lastChecked: Date;
  private readonly VAPID_DETAILS = {
    subject: 'mailto:myuserid@email.com',
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
  };
  
    constructor(private readonly dataService: DataService) {
      this.lastChecked = new Date();
    }

  private readonly handlers = [
    { func: this.dataService.getNewEntriesFromNotifications, type: PushNotificationType.Notification },
    { func: this.dataService.getNewEntriesFromChat, type: PushNotificationType.Chat },
    { func: this.dataService.getNewEntriesFromTasks, type: PushNotificationType.Task },
    { func: this.dataService.getNewEntriesFromAppointments, type: PushNotificationType.Appointment },
  ];

  @Cron('0 * * * * *')
  async handleCron() {
    for (const handler of this.handlers) {
      const entries = await handler.func(this.lastChecked);
      entries.forEach((entry) => this.processEntry(entry, handler.type));
    }

    this.lastChecked = new Date();
    this.lastChecked.setMilliseconds(0);
    this.lastChecked.setSeconds(0);
  }

  processEntry(entry: any, type: PushNotificationType) {
    const message = this.createNotificationMessage(type, entry);
    const subscription = entry.participant?.subscription || entry.chat?.participant?.subscription;
    this.sendPushNotification(subscription, type, message);
  }

  sendPushNotification(subscription: string, type: PushNotificationType, message: string, date?: Date) {
    webpush.sendNotification(
      JSON.parse(subscription),
      JSON.stringify({
        title: 'StudyApp',
        type,
        message,
        date,
      }),
      { vapidDetails: this.VAPID_DETAILS }
    );
  }

  createNotificationMessage(type: PushNotificationType, entry: any): string {
    switch (type) {
      case PushNotificationType.Chat:
        return `Neue Chatnachricht`;
      case PushNotificationType.Notification:
        return `${entry.name} wurde vom ${entry.oldDate} auf den ${entry.newDate} verschoben`;
      case PushNotificationType.Task:
        return `${entry.form.name} muss um ${entry.scheduledAt} bearbeitet werden`;
      case PushNotificationType.Appointment:
        return `Sie haben den Termin '${entry.subject}' um ${new Date(entry.startDate + 'T' + entry.startTime)}`;
      default:
        return '';
    }
  }
}
