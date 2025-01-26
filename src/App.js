
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectBookNav from './Components/SelectBookNav/SelectBookNavbar';
import Englishbook from './Components/MUI/english/parent';
import Englishbook1 from './Components/MUI/english/englishbook';
import Layout from './Components/MUI/layout';
import{
  BrowserRouter,Routes,Route
} from 'react-router-dom'
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       
       <Layout>
          <Routes>

            <Route path="/admin" element={<Englishbook1 />} />
            <Route path="/*" element={<Englishbook1 />} />
                   
              
                    
          </Routes>
          </Layout>
       </BrowserRouter>
    </div>
  );
}

export default App;
