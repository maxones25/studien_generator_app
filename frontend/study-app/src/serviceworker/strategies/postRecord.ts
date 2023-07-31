import { IDBPDatabase, IDBPTransaction } from 'idb';
import { Strategy, StrategyHandler, StrategyOptions } from 'workbox-strategies';
import { Record } from '@modules/forms/types';
import { Task } from '@modules/tasks/types';

export class PostRecord extends Strategy {
  private dbPromise: Promise<IDBPDatabase>;

  constructor(dbPromise: Promise<IDBPDatabase>, options: StrategyOptions) {
    super(options);
    this.dbPromise = dbPromise;
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    const clone = request.clone()
    return clone.json()
    .then(async (data) => {
      const record: Record = data;
      const tx = db.transaction(['records', 'tasks'], 'readwrite');
      if (record.taskId) {
        this.putTask(tx, record.formId, record.createdAt);
      }
      await tx.objectStore("records").add({
        id: record.id,
        createdAt: record.createdAt,
      });
      return handler.fetch(request);
    });
  }

  private async putTask(
    tx: IDBPTransaction<unknown, string[], 'readwrite'>, 
    formId: string, 
    createdAt: Date
  ) {
    const objectStore = tx.objectStore("tasks")
    const task: Task = await objectStore.get(formId);
    task.completedAt = createdAt;
    await objectStore.put(task);
  }
}