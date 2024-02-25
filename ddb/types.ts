export type Item = string
export type User = string
export type Socket = string
export type Vote = [x: number, y: number]

export type Config = {
  items: Item[];
  dimensions: [x: [lo: number, hi: number], y: [lo: number, hi: number]];
}

export type Session = {
  pk: `${string}-${string}-${string}-${string}-${string}`;
  cx: Record<Socket, User>;
  cfg: Config;
  votes: Record<Item, Record<User, Vote>>;
}
