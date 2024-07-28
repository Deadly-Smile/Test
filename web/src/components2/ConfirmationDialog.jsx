import PropTypes from "prop-types";

const ConfirmationDialog = ({
  componentId,
  handlerFunction,
  buttonText,
  title,
  message,
}) => {
  return (
    <dialog id={componentId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <form
          className="flex justify-end"
          onSubmit={(e) => {
            e.preventDefault();
            handlerFunction();
            document.getElementById(componentId).close();
          }}
        >
          <button className="btn btn-error mx-2" type="submit">
            {buttonText}
          </button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

ConfirmationDialog.propTypes = {
  componentId: PropTypes.string.isRequired,
  handlerFunction: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmationDialog;
