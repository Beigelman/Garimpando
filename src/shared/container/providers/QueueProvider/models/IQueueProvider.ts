export interface IAdd {
  name: string;
  data: { [key: string]: string };
  options?: { [key: string]: string };
}

export interface IQueueProvider {
  add({ name, data }: IAdd): void;
  process(): void;
}
