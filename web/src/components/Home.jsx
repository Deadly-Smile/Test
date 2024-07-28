import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const Home = () => {
  const items = [
    "Lorem Ipsum Dolor",
    "Lorem Ipsum Dolor ipsum",
    "Lorem Ipsum Dolor ipsum omit",
    "Lorem Ipsum Dolor ipsum omit Notor Choose",
  ];
  const rightPanelFunction = () => {
    console.log("Right panel button clicked");
  };
  return (
    <div className="my-4">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="grid flex-grow w-[70%]">
          <LeftPanel />
        </div>
        <div className="relative mx-4 w-[30%]">
          <RightPanel
            title="You Plan"
            items={items}
            buttonText={"Contact Sales"}
            handleClick={rightPanelFunction}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
