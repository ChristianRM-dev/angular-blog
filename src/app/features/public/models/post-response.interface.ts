export interface PostResponse {
  id: number;
  userId: number;
  title: string;
  body: string;
  author: Author;
  headerImageUrl: string;
  date:Date
}

interface Author {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
