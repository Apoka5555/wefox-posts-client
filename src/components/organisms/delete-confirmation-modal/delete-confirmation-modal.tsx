import classNames from "classnames";
import Overlay from "../../atoms/overlay/overlay";
import Button from "../../atoms/button/Button";
import "./delete-confirmation-modal.scss";

interface DeleteConfirmationModalProps {
  className?: string;
  isVisible: boolean;
  handleClose: () => void;
  confirmClick: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  className,
  isVisible,
  handleClose,
  confirmClick,
}) => {
  const classes = classNames(
    "delete-confirmation",
    isVisible && "is-visible",
    className
  );

  return (
    <>
      {isVisible && <Overlay handleClick={handleClose} isVisible={isVisible} />}
      <div className={classes}>
        <div className="modal-content">
          <div>
            <span>Are you sure that you want to delete this post?</span>
          </div>
          <div className="button-container">
            <Button text="Yes" onClick={confirmClick} />
            <Button text="No" onClick={handleClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
