import { type Config, type CxId, type Item, type SsId, type User, type Vote } from '../ddb/types'

export type MessageLogin = {
  cx: CxId;
  action: 'login';
  user: User;
  ss?: SsId;
}

export type MessageConfig = {
  cx: CxId;
  action: 'config';
  config: Config;
}

export type MessageVote = {
  cx: CxId;
  action: 'vote';
  item: Item;
  vote: Vote;
}

export type Message = MessageLogin | MessageConfig | MessageVote
