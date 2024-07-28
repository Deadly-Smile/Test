import PropTypes from "prop-types";

const FeatureCard = ({ icon, title, onSelect }) => {
  return (
    <div className="flex bg-[#EFF5F5] p-4 my-2 rounded-lg">
      <div>
        <div className="flex mb-2">
          <span className="text-3xl">{icon}</span>
          <span className="text-lg mx-2">{title}</span>
        </div>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
          voluptatum obcaecati sed commodi eius laborum aspernatur qui sequi.
        </div>
      </div>

      <button
        type="button"
        className="btn no-animation bg-base-100 hover:bg-base-100 border m-auto"
      >
        <div className="flex">
          <input type="checkbox" className="mr-2" onChange={onSelect} />
          <span>Add Module</span>
        </div>
      </button>
    </div>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
};

export default FeatureCard;
