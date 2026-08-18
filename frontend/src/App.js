import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './pages/Add'
import Edit from './pages/Edit'
import Show_spendings from './pages/Spend.js'
import Show_incomes from './pages/Income.js'
import Stats from './pages/Statictics'
import Categories from './pages/Categories';


function App() {
  return (
    <BrowserRouter>
      <nav className='navigation_bar'>
        <a className='navigation_bar--element' href='/'>Statistics</a>
        <a className='navigation_bar--element' href='/see_spendings'>See spengins</a>
        <a className='navigation_bar--element' href='/see_incomes'>See incomes</a>
        <a className='navigation_bar--element' href='/add'>Add</a>
        <a className='navigation_bar--element' href='/categories'>Categories</a>
        <a className='navigation_bar--element' href='/edit'>Edit categories</a>
      </nav>
      <Routes>
        <Route path="/" element={<Stats />} />
        <Route path="/see_spendings" element={<Show_spendings />} />
        <Route path="/see_incomes" element={<Show_incomes />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/" element={<Stats />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
