
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './Components/NavbarComponent/Navbar';
import SelectBookNav from './Components/SelectBookNav/SelectBookNavbar';
import Englishbook from './Components/EnglishbookComponent/Englishbook';
import{
  BrowserRouter,Routes,Route
} from 'react-router-dom'
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <NavbarComponent />
       
          <Routes>

            <Route path="/" element={<SelectBookNav/>}>

                   
              </Route>
                    
          </Routes>
       
       </BrowserRouter>
    </div>
  );
}

export default App;
