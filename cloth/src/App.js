import './App.css';
import EllaMenu from './Component/EllaMenu';
import MenShirt from './Component/MenShirt';
import MenPant from './Component/MenPant';
import WShirt from './Component/WShirt';
import WPant from './Component/WPant';
import EthnicFashion from './Component/EthnicFashion';
import Tshirt from './Component/Tshirt';
import Brand from './Component/Brand';
import MenStyle from './Component/MenStyle';
import NewArrival from './Component/NewArrival';
import Shorts from './Component/Shorts';
import ProductDetail from './Component/ProductDetail';
import SignIn from './Component/SignIn';
import Cart from './Component/Cart';
import Profile from './Component/Profile'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/menu' element={<EllaMenu/>}/>
        <Route path='/menshirt' element={<MenShirt/>}/>
        <Route path='/menpant' element={<MenPant/>}/>
        <Route path='/womenshirt' element={<WShirt/>}/>
        <Route path='/womenpant' element={<WPant/>}/>
        <Route path='/ethnic' element={<EthnicFashion/>}/>
        <Route path='/short' element={<Shorts/>}/>
        <Route path='/tshirt' element={<Tshirt/>}/>
        <Route path='/brand' element={<Brand/>}/>
        <Route path='/menstyle' element={<MenStyle/>}/>
        <Route path='/newarrival' element={<NewArrival/>}/>
        <Route path='/product' element={<ProductDetail/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/' element={<Navigate to="/menu" />} />
      </Routes>
    </Router>
  );
}

export default App;
