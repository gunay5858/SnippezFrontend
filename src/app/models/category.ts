import {User} from "./user";

export class Category {
  id: number;
  name: string;
  icon: string;
  snippetCount: number;
  creator: User;
  created_at: Date;
  updated_at: Date;
}
