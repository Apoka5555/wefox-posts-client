import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import PostForm from "../../components/organisms/post-form/PostForm";

export default function EditPost(): ReactElement {
  const { id } = useParams();

  const postId = id ? parseInt(id) : 0;

  return (
    <div>
      <PostForm postId={postId} />
    </div>
  );
}
