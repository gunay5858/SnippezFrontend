import {Category} from "./category";
import {User} from "./user";

export class Snippet {
  id: number;
  title: string;
  description: string;
  tags: string;
  code: string;
  shared_users: string[];
  is_public: boolean;
  category: Category;
  creator: User;
  created_at: Date;
  updated_at: Date;
}
