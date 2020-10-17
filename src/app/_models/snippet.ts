import {Category} from "./category";
import {User} from "./user";

export class Snippet {
  id: number;
  title: string;
  description: string;
  tags: string;
  code: string;
  codeLanguage: string;
  sharedUsers: User[];
  public: boolean;
  category: Category;
  creator: User;
  createdAt: Date;
  updatedAt: Date;
}
