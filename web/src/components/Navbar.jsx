import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const renderList = (list) => {
  return list.map((item, index) => {
    if (item?.type === "button") {
      return (
        <li key={index}>
          <button
            onClick={item?.function}
            className={`btn ${item?.className ? item?.className : ""}`}
          >
            <span>{item?.text}</span>
          </button>
        </li>
      );
    } else if (item?.type === "link") {
      return (
        <li key={index}>
          <Link
            to={item?.link}
            className={`${item?.className ? item?.className : ""}`}
          >
            <span>{item?.text}</span>
          </Link>
        </li>
      );
    } else if (item?.type === "nested") {
      return (
        <li key={index}>
          <details>
            <summary className={`${item?.className ? item?.className : ""}`}>
              {item?.text}
            </summary>
            <ul className="bg-base-100 rounded-t-none p-1">
              {renderList(item?.children)}
            </ul>
          </details>
        </li>
      );
    } else {
      return (
        <li key={index} className={`${item?.className ? item?.className : ""}`}>
          <span>{item?.text}</span>
        </li>
      );
    }
  });
};

const Navbar = ({ logoComponent, renderingList }) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-6xl text-orange-500">
            {logoComponent}
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              {renderList(renderingList)}
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {renderList(renderingList)}
        </ul>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logoComponent: PropTypes.object.isRequired,
  renderingList: PropTypes.array.isRequired,
};

export default Navbar;
