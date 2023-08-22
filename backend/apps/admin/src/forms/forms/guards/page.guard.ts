import { Injectable, Inject } from '@nestjs/common';
import { RecordGuard } from '@shared/modules/records/record.guard';
import { PagesService } from '../services/page.service';

@Injectable()
export class PageGuard extends RecordGuard {
  constructor(
    @Inject(PagesService)
    service: PagesService,
  ) {
    super(service, 'page', 'pageId');
  }
}
