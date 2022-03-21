import './App.css'
import { Route, Router } from 'react-router-dom'
import History from './components/History'
import Home from "./pages/Home"
import Addproduct from "./pages/Addproduct"
import Footer from './components/Footer/Footer'


function App() {
  return (
    <Router history={History}>
      <div className="body position">
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/add-product">
          <Addproduct/>
        </Route>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
