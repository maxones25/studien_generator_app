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

  @Cron('0 * * * * *')
  async handleCron() {
    const notifications = await this.dataService.getNewEntriesFromNotifications(this.lastChecked);
    notifications.forEach((notification) => {
      this.processEntry(notification, PushNotificationType.Notification);
    });
    const messages = await this.dataService.getNewEntriesFromChat(this.lastChecked);
    messages.forEach(({chat}) => {
      this.processEntry(chat, PushNotificationType.Chat);
    });
    const tasks = await this.dataService.getNewEntriesFromTasks(this.lastChecked);
    tasks.forEach((task) => {
      this.processEntry(task, PushNotificationType.Task);
    });
    const appointments = await this.dataService.getNewEntriesFromAppointments(this.lastChecked);
    appointments.forEach((appointments) => {
      const message = this.processEntry(appointments, PushNotificationType.Appointment);
    });
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
