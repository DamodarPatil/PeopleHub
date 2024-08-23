import { bellIcon, profileIcon, Divider } from "../assets";

const Navbar = () => {
  return (
    <>
      <nav className="flex flex-wrap justify-between items-center w-full p-4 max-w-[1383px] mx-auto">
        <h1 className="text-4xl font-bold text-violet-700">PEOPLE.CO</h1>
        <div className="flex items-center gap-4">
          <button
            className="flex justify-center items-center w-9 h-9 rounded-full bg-gray-100"
            aria-label="Notifications"
          >
            <img
              loading="lazy"
              src={bellIcon}
              alt="Notifications"
              className="w-5 h-5"
            />
          </button>
          <div className="flex items-center gap-2">
            <img
              loading="lazy"
              src={profileIcon}
              alt="Jane Doe"
              className="w-9 h-9 rounded-full"
            />
            <span className="text-base text-slate-900">Jane Doe</span>
          </div>
        </div>
      </nav>
      <img
        loading="lazy"
        src={Divider}
        alt="Divider"
        className="w-full bg-[#E2E8F0]"
      />
    </>
  );
};

export default Navbar;
