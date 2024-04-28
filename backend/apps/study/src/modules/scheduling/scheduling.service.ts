import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataService } from './scheduling-data.service';
import { PushNotificationType } from './push-notification-type.enum';
import datetime from '@shared/modules/datetime/datetime';
import { addMinutes } from 'date-and-time';
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
    try {   
      const messages = await this.dataService.getNewEntriesFromChat(this.lastChecked);
      messages.forEach(({chat}) => {
        this.processEntry(chat, PushNotificationType.Chat);
      });
      this.lastChecked = addMinutes(this.lastChecked, 1);
      const tasks = await this.dataService.getNewEntriesFromTasks(this.lastChecked);
      tasks.forEach((task) => {
        this.processEntry(task, PushNotificationType.Task);
      });
      const appointments = await this.dataService.getNewEntriesFromAppointments(this.lastChecked);
      appointments.forEach((appointments) => {
        this.processEntry(appointments, PushNotificationType.Appointment);
      });
      this.lastChecked = new Date();
      this.lastChecked.setMilliseconds(0);
      this.lastChecked.setSeconds(0);
    } catch (error) {
      
    }
  }

  processEntry(entry: any, type: PushNotificationType) {
    try {
      const message = this.createNotificationMessage(type, entry);
      const subscription = entry.participant?.subscription;
      this.sendPushNotification(subscription, type, message, entry.participant?.id);      
    } catch (error) {

    }
  }

  sendPushNotification(subscription: string, type: PushNotificationType, message: string, id: string) {
    webpush.sendNotification(
      JSON.parse(subscription),
      JSON.stringify({
        title: 'StudyApp',
        type,
        message,
        id,
      }),
      { vapidDetails: this.VAPID_DETAILS }
    ).catch(() => {

    });
  }

  createNotificationMessage(type: PushNotificationType, entry: any): string {
    switch (type) {
      case PushNotificationType.Chat:
        return `Neue Chatnachricht`;
      case PushNotificationType.Task:
        return `${entry?.form?.name} muss um ${datetime.formatTime(entry?.scheduledAt)} bearbeitet werden`;
      case PushNotificationType.Appointment:
        return `Sie haben den Termin '${entry?.subject}' um ${entry?.startTime}`;
      default:
        return '';
    }
  }
}
