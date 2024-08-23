import { sidebarItems } from "../data";
import { IconsLucide } from "../assets";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); 

  return (
    <aside className="w-[208px] bg-white h-screen  border-gray-200">
      {sidebarItems.map((item) => {
        const path = item.id === 1 ? "/" : "/people"; 
        const isActive = location.pathname === path;

        return (
          <Link
            key={item.id}
            to={path}
            className={`flex items-center gap-2 p-2 cursor-pointer ${
              isActive ? "bg-violet-50 text-violet-700" : "text-stone-900"
            }`}
          >
            <div
              className={`flex w-6 h-6 p-1 justify-center items-center rounded-[4px] ${
                isActive ? "bg-[#6941C6]" : "bg-[#1E1E1E]"
              }`}
            >
              <img
                loading="lazy"
                src={IconsLucide}
                alt={item.text}
                className={isActive ? "text-white" : "text-gray-400"}
              />
            </div>
            <span>{item.text}</span>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
