import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './pages/Add'
import Edit from './pages/Edit.js'
import EditCategories from './pages/EditCategories';
import Stats from './pages/Statictics'
import Categories from './pages/Categories';
import ShowIncomes from './pages/ShowIncomes';
import ShowSpendings from './pages/ShowSpendings';



function App() {
  return (
    <BrowserRouter>
      <nav className='navigation_bar'>
        <a className='navigation_bar--element' href='/'>Statistics</a>
        <a className='navigation_bar--element' href='/see_spendings'>See spengins</a>
        <a className='navigation_bar--element' href='/see_incomes'>See incomes</a>
        <a className='navigation_bar--element' href='/add'>Add</a>
        <a className='navigation_bar--element' href='/edit'>Edit</a>
        <a className='navigation_bar--element' href='/categories'>Categories</a>
        <a className='navigation_bar--element' href='/edit_categories'>Edit categories</a>
      </nav>
      <Routes>
        <Route path="/" element={<Stats />} />
        <Route path="/see_spendings" element={<ShowSpendings />} />
        <Route path="/see_incomes" element={<ShowIncomes />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edit_categories" element={<EditCategories />} />
        <Route path="/" element={<Stats />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
