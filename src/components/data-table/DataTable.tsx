import { useEffect, useState } from "react";
import { getAllPosts } from "../../api/api";
import { Post } from "../../api/types";
import { useModal } from "../../hooks/useModal";
import Button from "../button/Button";
import DeleteConfirmationModal from "../delete-confirmation-modal/delete-confirmation-modal";
import Icon from "../icon/Icon";
import "./DataTable.scss";

export default function DataTable() {
  const [posts, setPosts] = useState<ReadonlyArray<Post>>([]);

  const { modalIsVisible, toggleModal } = useModal();

  useEffect(() => {
    getAllPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  const handleDeletePost = (id: number) => {
    // delete post

    toggleModal();
  };

  return (
    <div className="table-container">
      <div className="button-container">
        <Button text="Refresh posts" onClick={() => {}} />
        <Button text="Create new post" onClick={() => {}} />
      </div>

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
              <td className="table__body__row__cell">{post.title}</td>
              <td className="table__body__row__cell">{post.content}</td>
              <td className="table__body__row__cell">{post.lat}</td>
              <td className="table__body__row__cell">{post.long}</td>
              <td className="table__body__row__cell">
                <img
                  className="table__body__row__cell__img"
                  src={post.image_url}
                  alt={post.title}
                />
              </td>
              <td className="table__body__row__cell">
                <div className="icon-container">
                  <Icon icon="edit" onClick={() => {}} />
                  <Icon icon="delete" onClick={toggleModal} />
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
  );
}
