import { IDBPDatabase, IDBPTransaction } from 'idb';
import { Strategy, StrategyHandler, StrategyOptions } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync';
import { Record } from '@modules/forms/types';
import { Task } from '@modules/tasks/types';
import { getDB } from '../indexedDB/getDB';

export class PostRecord extends Strategy {
  private queue = new Queue('RecordsQueue');
  private dbPromise: Promise<IDBPDatabase>;

  constructor(options?: StrategyOptions) {
    super(options);
    this.dbPromise = getDB();
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    try {
      const response = await handler.fetch(request.clone());
      return response;
    } catch (error) {
      const clone = request.clone();
      const data = await clone.json();
      const record: Record = data;
      const tx = db.transaction(['records', 'tasks'], 'readwrite');
      if (record.taskId) {
        this.putTask(tx, record.taskId, record.createdAt);
      }
      await tx.objectStore("records").add(record);
      await this.queue.pushRequest({request: request});
      return new Response('', { status: 200, statusText: 'Queued' });
    }
  }

  private async putTask(
    tx: IDBPTransaction<unknown, string[], 'readwrite'>, 
    taskId: string, 
    createdAt: Date
  ) {
    const objectStore = tx.objectStore("tasks")
    const task: Task = await objectStore.get(taskId);
    task.completedAt = createdAt;
    await objectStore.put(task);
  }
}
