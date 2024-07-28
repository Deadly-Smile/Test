import PropTypes from "prop-types";
import { FaCheckToSlot } from "react-icons/fa6";

const RightPanel = ({ title, items, buttonText, handleClick }) => {
  return (
    <div className="card bg-[#EFF3F3] rounded-lg shadow-md flex flex-col justify-between fixed top-26 right-20 border-none">
      <p className="p-4 text-lg">{title}</p>
      <div className="w-full h-px bg-gray-600" />
      <ul className="space-y-2 p-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2 py-1">
            <FaCheckToSlot />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button
        className="btn w-full mt-8 bg-orange-600 text-white font-bold py-2 border-none rounded-b rounded-t-none hover:bg-orange-700"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

RightPanel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
  buttonText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default RightPanel;
