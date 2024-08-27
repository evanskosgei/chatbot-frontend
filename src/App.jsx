import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routing from './routing';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routing />
    </Router>
  )
}

export default App