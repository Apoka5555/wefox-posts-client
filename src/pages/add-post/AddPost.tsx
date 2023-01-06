import { ReactElement } from "react";
import PostForm from "../../components/organisms/post-form/PostForm";
import "./AddPost.scss";

export default function AddPost(): ReactElement {
  return (
    <div className="add-post">
      <PostForm />
    </div>
  );
}
