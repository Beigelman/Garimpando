export interface IAdd {
  name: string;
  data: { [key: string]: any };
  options?: { [key: string]: string };
}

export default interface IQueueProvider {
  add({ name, data }: IAdd): void;
  process(): void;
}
