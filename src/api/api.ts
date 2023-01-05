import { Post, CreatePost } from "./types";

const { REACT_APP_API_URL } = process.env;

export async function getAllPosts(): Promise<ReadonlyArray<Post>> {
  const response = await fetch(`${REACT_APP_API_URL}/api/v1/posts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const posts: ReadonlyArray<Post> = await response.json();
    return posts;
  }

  // ideally, should send error message
  return [];
}

export async function showPost(id: number): Promise<Post | null> {
  const response = await fetch(`${REACT_APP_API_URL}/api/v1/posts/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const post: Post = await response.json();
    return post;
  }

  // ideally, should send error message
  return null;
}

export async function createPost(post: CreatePost): Promise<boolean> {
  const response = await fetch(`${REACT_APP_API_URL}/api/v1/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  return response.ok;
}

export async function editPost(id: number, post: CreatePost): Promise<boolean> {
  const response = await fetch(`${REACT_APP_API_URL}/api/v1/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  return response.ok;
}

export async function deletePost(id: number): Promise<boolean> {
  const response = await fetch(`${REACT_APP_API_URL}/api/v1/posts/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return response.ok;
}
