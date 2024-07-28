import { useState } from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { AiFillFire } from "react-icons/ai";
import RightPanel from "./components/RightPanel";

const App = () => {
  const [navbarList, setNavbarList] = useState([
    {
      text: "Features",
      type: "nested",
      function: (e) => console.log(e),
      link: "#",
      className: "hover:text-blue-700",
      children: [
        {
          text: "Feature 1",
          type: "ordinary",
          children: [],
          function: (e) => console.log(e),
          link: "#",
          className: "hover:text-blue-700",
        },
        {
          text: "Feature 2",
          type: "ordinary",
          children: [],
          function: (e) => console.log(e),
          link: "#",
          className: "hover:text-blue-700",
        },
      ],
    },
    {
      text: "Apps",
      type: "nested",
      function: (e) => console.log(e),
      link: "#",
      className: "hover:text-blue-700",
      children: [
        {
          text: "App 1",
          type: "ordinary",
          children: [],
          function: (e) => console.log(e),
          link: "#",
          className: "hover:text-blue-700",
        },
        {
          text: "App 2",
          type: "ordinary",
          children: [],
          function: (e) => console.log(e),
          link: "#",
          className: "hover:text-blue-700",
        },
      ],
    },
    {
      text: "Pricing",
      type: "ordinary",
      function: (e) => console.log(e),
      link: "#",
      className: "hover:text-blue-700",
      children: [],
    },
    {
      text: "Blog",
      type: "ordinary",
      function: (e) => console.log(e),
      link: "#",
      className: "hover:text-blue-700",
      children: [],
    },
    {
      text: "Sign In",
      type: "button",
      function: () => console.log("sign in button pressed"),
      link: "#",
      children: [],
      className: "bg-orange-500 hover:bg-orange-600 mr-2 text-white",
    },
    {
      text: "Log In",
      type: "button",
      function: () => console.log("log in button pressed"),
      link: "#",
      children: [],
      className:
        "hover:bg-orange-600 border-orange-500 bg-white text-orange-700 hover:text-white",
    },
  ]);
  return (
    <div className="px-8">
      <Navbar logoComponent={<AiFillFire />} renderingList={navbarList} />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
