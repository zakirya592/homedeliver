
import './App.css';
import Pagerounter from './Component/Rounter/Pagerounter';
import axios from "axios";
import { ToastProvider } from './Contexts/ToastContext';

axios.defaults.baseURL = "https://161.97.139.96:3030/";
function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
    <ToastProvider > 
       < Pagerounter/>
    </ToastProvider>
      </header>

    </div>
    </>
  );
}

export default App;
