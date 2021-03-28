/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
class FakeQueue {
  queue: { [key: string]: string }[] = [];

  name: string;

  config: { [key: string]: string };

  constructor(name: string, config: { [key: string]: string }) {
    this.name = name;
    this.config = config;
  }

  add(data: { [key: string]: string }): void {
    this.queue.push(data);
  }

  process(handle: any): void {
    this.queue.forEach(p => handle(p));
  }
}

export default FakeQueue;
