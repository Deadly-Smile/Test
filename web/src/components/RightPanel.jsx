import PropTypes from "prop-types";
import { FaCheckToSlot } from "react-icons/fa6";

const RightPanel = ({ title }) => {
  const items = [
    "Lorem Ipsum Dolor",
    "Lorem Ipsum Dolor ipsum",
    "Lorem Ipsum Dolor ipsum omit",
    "Lorem Ipsum Dolor ipsum omit Notor Choose",
  ];

  return (
    <div className="card rounded-lg shadow-md w-full text-gray-700">
      <h2 className="p-4 text-lg">{title}</h2>
      <div className="w-full h-px bg-gray-600" />
      <ul className="space-y-2 p-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2 py-1">
            <FaCheckToSlot />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button className="w-full mt-8 bg-orange-500 text-white py-2 rounded-b hover:bg-orange-600">
        Contact Sales
      </button>
    </div>
  );
};

RightPanel.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RightPanel;
