import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, getAllPosts } from "../../api/api";
import { Post } from "../../api/types";
import { useModal } from "../../hooks/useModal";
import Button from "../button/Button";
import DeleteConfirmationModal from "../delete-confirmation-modal/delete-confirmation-modal";
import Icon from "../icon/Icon";
import "./DataTable.scss";

export default function DataTable() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<ReadonlyArray<Post>>([]);

  const { modalIsVisible, toggleModal } = useModal();

  const getPostsData = async () => {
    const postsData = await getAllPosts();
    setPosts(postsData);
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const handleDeletePost = async (id: number) => {
    const isSuccessDeleted = await deletePost(id);

    if (isSuccessDeleted) {
      getPostsData();
    } else {
      console.log("Could not delete post");
    }

    toggleModal();
  };

  return (
    <div className="data-container">
      <div className="button-container">
        <Button
          text="Refresh posts"
          onClick={() => {
            getPostsData();
          }}
        />
        <Button
          text="Create new post"
          onClick={() => {
            navigate("/new-post");
          }}
        />
      </div>

      {posts.length ? (
        <div className="table-container">
          <table className="table">
            <thead className="table__head">
              <tr className="table__head__row">
                <th className="table__head__row__cell">ID</th>
                <th className="table__head__row__cell">Title</th>
                <th className="table__head__row__cell">Content</th>
                <th className="table__head__row__cell">Latitude</th>
                <th className="table__head__row__cell">Longitude</th>
                <th className="table__head__row__cell">Image</th>
                <th className="table__head__row__cell"></th>
              </tr>
            </thead>
            <tbody className="table__body">
              {posts.map((post) => (
                <tr key={post.id} className="table__body__row">
                  <td className="table__body__row__cell">{post.id}</td>
                  <td className="table__body__row__cell">
                    {" "}
                    <Link to={`display-post/${post.id}`} className="post-title">
                      {post.title}
                    </Link>
                  </td>
                  <td className="table__body__row__cell">{post.content}</td>
                  <td className="table__body__row__cell">{post.lat}</td>
                  <td className="table__body__row__cell">{post.long}</td>
                  <td className="table__body__row__cell">
                    <img
                      className="table__body__row__cell__img"
                      src={post.image_url}
                      alt={`${post.title} post`}
                    />
                  </td>
                  <td className="table__body__row__cell">
                    <div className="icon-container">
                      <Link to={`edit-post/${post.id}`}>
                        <Icon icon="edit" tooltip="edit post" />
                      </Link>
                      <Icon
                        icon="delete"
                        onClick={toggleModal}
                        tooltip="delete post"
                      />
                      <DeleteConfirmationModal
                        isVisible={modalIsVisible}
                        handleClose={toggleModal}
                        confirmClick={() => handleDeletePost(post.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span>No posts to display</span>
      )}
    </div>
  );
}
