export interface Post {
  content: string;
  created_at: string;
  id: number;
  image_url: string;
  lat: string;
  long: string;
  title: string;
  updated_at: string;
}

export interface CreatePost {
  content: string;
  image_url: string;
  lat: string;
  long: string;
  title: string;
}
