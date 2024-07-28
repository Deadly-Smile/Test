import PropTypes from "prop-types";
import {
  AiFillYoutube,
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = ({ signupClassname }) => {
  return (
    <div className="bg-[#253053] text-white">
      <footer className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          <nav>
            <h6 className="footer-title mb-6 font-normal">Software</h6>
            <a className="link link-hover block mb-2">Features overview</a>
            <a className="link link-hover block mb-2">Solutions</a>
            <a className="link link-hover block mb-2">Free time tracking app</a>
            <a className="link link-hover block mb-2">Integrations</a>
            <a className="link link-hover block mb-2">Download app</a>
            <a className="link link-hover block mb-2">Demo</a>
            <a className="link link-hover block mb-2">Time tracking API</a>
          </nav>
          <nav>
            <h6 className="footer-title mb-6 font-normal">Learning center</h6>
            <a className="link link-hover block mb-2">
              Time tracking resources
            </a>
            <a className="link link-hover block mb-2">
              Workforce management resources
            </a>
            <a className="link link-hover block mb-2">Business resources</a>
            <a className="link link-hover block mb-2">Blog</a>
          </nav>
          <nav>
            <h6 className="footer-title mb-6 font-normal">More</h6>
            <a className="link link-hover block mb-2">Help Center</a>
            <a className="link link-hover block mb-2">FAQ</a>
            <a className="link link-hover block mb-2">Status</a>
          </nav>
          <nav>
            <h6 className="footer-title mb-6 font-normal">Company</h6>
            <a className="link link-hover block mb-2">About us</a>
            <a className="link link-hover block mb-2">Contact Us</a>
            <a className="link link-hover block mb-2">Reviews</a>
            <a className="link link-hover block mb-2">Customer stories</a>
            <a className="link link-hover block mb-2">Careers</a>
            <a className="link link-hover block mb-2">Press</a>
          </nav>
          <div className="grid mx-auto grow col-span-2">
            <h1 className="text-2xl  mb-6">Ready to get started?</h1>
            <button
              className={`btn ${
                signupClassname ? signupClassname : "btn-primary"
              } btn-2xl`}
            >
              Sign me up
            </button>
            <div className="w-full my-12 h-[2px] bg-gray-400" />
            <p className="text-lg">Follow us</p>
            <div className="flex text-gray-300 text-3xl gap-2">
              <AiFillFacebook />
              <AiFillLinkedin />
              <AiFillYoutube />
              <AiOutlineTwitter />
              <AiFillInstagram />
            </div>
          </div>
        </div>
      </footer>
      <footer className="border-base-300 px-10 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <aside className="flex items-center mb-4 lg:mb-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current mr-2"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>
              ACME Industries Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>
          <nav className="flex space-x-4">
            <p className="text-sm">Terms</p>
            <p className="text-sm">Privacy</p>
            <p className="text-sm">GDPR compliance</p>
          </nav>
        </div>
      </footer>
    </div>
  );
};

Footer.propTypes = {
  signupClassname: PropTypes.string.isRequired,
};
export default Footer;
