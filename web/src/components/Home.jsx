import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const Home = () => {
  return (
    <div>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="grid flex-grow place-items-center w-2/3">
          <LeftPanel />
        </div>
        <div className="relative bg-base-200 w-1/3 mx-4">
          <RightPanel title="You Plan" />
        </div>
      </div>
    </div>
  );
};

export default Home;
