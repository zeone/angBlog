export interface User {
  email: string;
  password: string;
}

export interface Post {
  id?: string;
  title: string;
  author: string;
  text: string;
  date: Date;
}
