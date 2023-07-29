import { IDBPDatabase } from 'idb';
import { Strategy, StrategyHandler } from 'workbox-strategies';
import { Record } from '@modules/forms/types';
import { Task } from '@modules/tasks/types';

export class PostRecord extends Strategy {
  private dbPromise: Promise<IDBPDatabase>; 

  constructor(dbPromise: Promise<IDBPDatabase>) {
    super();
    this.dbPromise = dbPromise;
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    return request.json()
    .then(async (data) => {
      const record: Record = JSON.parse(data);
      if (record.taskId) {
        this.putTask(db, record.formId, record.createdAt);
      }
      await db.add('records', {
        id: record.id,
        createdAt: record.createdAt,
      });
      return handler.fetch(request);
    });
  }

  private async putTask(db: IDBPDatabase, formId: string, createdAt: Date) {
    const task: Task = await db.get('tasks', formId);
    task.completedAt = createdAt;
    await db.put('tasks', task);
  }
}