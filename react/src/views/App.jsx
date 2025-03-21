import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import SideBare from "../components/common/SideBare";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-screen flex flex-col">
        <header className="w-full h-auto">
          <Header />
        </header>
        <div className="h-full w-full flex flex-row">
          <nav className="bg-gray-100 h-full">
            <SideBare />
          </nav>
          <main className="w-full h-full p-3 bg-[#cacaca4f]">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
