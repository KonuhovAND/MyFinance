import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Add from './pages/Add'
import Delete from './pages/Delete'
import Home from './pages/Home'
import Stats from './pages/Statictics'
import Categories from './pages/Categories';


function App() {
  return (
    <BrowserRouter>
   <nav className='navigation_bar'>
    <a className='navigation_bar--element' href='/'>Home</a>
    <a className='navigation_bar--element' href='/add'>Add</a>
    <a className='navigation_bar--element' href='/delete'>Delete</a>
    <a className='navigation_bar--element' href='/stats'>Statistics</a>
    <a className='navigation_bar--element' href='/categories'>Categories</a>
   </nav> 
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/categories" element={<Categories />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
