import './App.css';
import Login from './Login';
import Profile from './Profile';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './ProductList';
import Cart from './Cart';


function App() {
  return (
    <div className="App">
      <div  className="title"><h1>Redux toolkit</h1></div>
      <Provider store={store}>
      <div className="app-container">
        {/* <Login/>
        <Profile/> */}
        <ProductList/>
        <Cart/>
      </div>
      
      </Provider>
    </div>
  );
}

export default App;
