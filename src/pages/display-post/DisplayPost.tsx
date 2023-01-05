import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showPost } from "../../api/api";
import { Post } from "../../api/types";
import "./DisplayPost.scss";

export default function DisplayPost(): ReactElement {
  const { id } = useParams();

  const [postInfo, setPostInfo] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const postId = parseInt(id);

    showPost(postId).then((post) => {
      setPostInfo(post);
    });
  }, [id]);

  return (
    <div className="display-post">
      <div className="post-info-container">
        <div className="post-info">
          <div className="field-info">
            <label className="field-label">Title:</label>
            <span className="field-value">{postInfo?.title}</span>
          </div>
          <div className="field-info">
            <label className="field-label">Content:</label>
            <span className="field-value">{postInfo?.content}</span>
          </div>
          <div className="field-info">
            <label className="field-label">Latitude:</label>
            <span className="field-value">{postInfo?.lat}</span>
          </div>
          <div className="field-info">
            <label className="field-label">Longitude:</label>
            <span className="field-value">{postInfo?.long}</span>
          </div>
        </div>
        <div className="post-info-img">
          <img src={postInfo?.image_url} alt="" />
        </div>
      </div>
    </div>
  );
}
