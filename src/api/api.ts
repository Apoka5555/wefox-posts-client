import { Post } from "./types";

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

  // TODO: handle error
  return [];
}
