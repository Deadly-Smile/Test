import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { IoPeople } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import { IoPerson } from "react-icons/io5";
import FeatureCard from "./FeatureCard";
const LeftPanel = () => {
  const [timeOption, setTimeOption] = useState([
    { text: "Billed Monthly", isSelected: true },
    { text: "Billed Yearly", isSelected: false },
    { text: "Billed Quarterly", isSelected: false },
  ]);
  const featureList = [
    { user: "Employee", icon: <IoPeople /> },
    { user: "Manager", icon: <GrUserManager /> },
    { user: "Client", icon: <IoPerson /> },
    { user: "Client", icon: <IoPerson /> },
    { user: "Client", icon: <IoPerson /> },
    { user: "Client", icon: <IoPerson /> },
    { user: "Client", icon: <IoPerson /> },
    { user: "Client", icon: <IoPerson /> },
  ];
  const renderTimelyButtons = (
    <div className="flex mt-4">
      {timeOption.map((option, index) => (
        <button
          key={index}
          className={`btn btn-ghost mr-2 ${
            option.isSelected ? "bg-blue-700 text-white" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            setTimeOption(
              timeOption.map((option, i) => ({
                ...option,
                isSelected: i === index,
              }))
            );
          }}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
  return (
    <div className="card rounded-lg shadow-md w-full bg-white">
      <p className="flex p-4">
        <GoArrowLeft className="text-blue-600 text-2xl mr-6" />
        <span className="text-lg">Customise your plan</span>
      </p>
      <div className="w-full h-px bg-gray-600" />
      <form className="form">
        <div id="billing-time" className="form-control p-4">
          <label className="label text-lg">Choose Billing Type</label>
          {renderTimelyButtons}
        </div>
        <div id="manager-number" className="form-control p-4">
          <label className="label text-lg">How Many Manager Do You Want?</label>
          <select className="select select-bordered w-full max-w-xs">
            <option defaultValue>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
        <div id="employee-number" className="form-control p-4">
          <label className="label text-lg">
            How Many Employee Do You Need?
          </label>
          <select className="select select-bordered w-full max-w-xs">
            <option defaultValue>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
        <div id="storage-size" className="form-control p-4">
          <label className="label text-lg">How Many Storage Do You Need?</label>
          <select className="select select-bordered w-full max-w-xs">
            <option defaultValue>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
        <div id="choose-feature" className="form-control p-4">
          <label className="label text-lg">Choose Feature</label>
          {featureList.map((item, index) => {
            return (
              <FeatureCard
                title={item?.user}
                key={index}
                icon={item?.icon}
                onSelect={() => {
                  console.log(`Feature ${item?.user} selected`);
                }}
              />
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default LeftPanel;
