import './index.css';
import Dashboard from './components/Dashboard'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div className='flex'>
        <Dashboard />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
