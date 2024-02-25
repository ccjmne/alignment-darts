export type Item = string
export type User = string
export type CxId = string
export type SsId = `${string}-${string}-${string}-${string}-${string}`
export type Vote = [x: number, y: number]

export type Config = {
  items: Item[];
  dimensions: [x: [lo: number, hi: number], y: [lo: number, hi: number]];
}

export type Session = {
  pk: SsId;
  cx: Record<CxId, User>;
  cfg: Config;
  votes: Record<Item, Record<User, Vote>>;
}
