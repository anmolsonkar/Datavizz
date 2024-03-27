import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav
      className={`flex justify-between w-full p-4 align-middle items-center fixed z-10 ${
        darkMode
          ? "text-white border-b border-slate-800 bg-slate-950"
          : "border-b-2 text-gray-800 bg-white"
      }`}
    >
      <div className="flex items-center cursor-pointer">
        <span className="text-lg font-bold">DATAVIZZ</span>
      </div>
      <div>
        <div className="flex cursor-pointer lg:space-x-7 space-x-5 lg:mr-4 items-center">
          <span className="cursor-pointer" onClick={toggleTheme}>
            {darkMode ? <DarkMode sx={{ fontSize: 27 }} /> : <LightMode sx={{ fontSize: 27 }} />}
          </span>
          {/* <img className="w-9 cursor-pointer" src="https://i.imgur.com/izjKYfy.png" alt="Profile" /> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
