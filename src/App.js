import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page1 from './components/Page1';

function App() {
  return (
    <div >
      <ToastContainer />
     <Page1 />
    </div>
  );
}

export default App;
