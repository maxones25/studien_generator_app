import { Participant } from "@entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePushDto } from "./dto/createPushDto";
const webpush = require('web-push');

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
  ) {}

  async create(id: string, { subscription }: CreatePushDto) {
    const { affected } =  await this.participantsRepository.update(id, { subscription })
    return affected
  }

  async send(id: string) {
    const { subscription } = await this.participantsRepository.findOne({ where: { id } })
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
        notification: {
          title: 'Our first push notification',
          body: 'Here you can add some text',
        },
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
}