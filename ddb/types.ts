export type Item = string
export type Name = string
export type CxId = string
export type SsId = `${string}-${string}-${string}-${string}-${string}`
export type Vote = [x: number, y: number]
export type User = { cx?: CxId, votes: Record<Item, Vote> }

export type Config = {
  items: Item[];
  dimensions: [x: [lo: number, hi: number], y: [lo: number, hi: number]];
}

export type Session = {
  pk: SsId;
  cfg: Config;
  usrs: Record<Name, User>;
}
