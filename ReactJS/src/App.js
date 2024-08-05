import Admin from './Admin';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './Menu';
import SanPhamList from './SanPhamList';
import SanPhamThem from './SanPhamThem';
import SanPhamSua from './SanPhamSua';
function App() {
  return (
    <BrowserRouter basename="/">
      <Menu />
      <div className="main--content">
        <div className="header--wrapper">
          <div className="header--title">
            <span>Primary</span>
            <h1>Trang chủ</h1>
          </div>
          <div className="user--info">
            <img src="./img/tom.jfif" alt="" />
          </div>
        </div>
        <div className="main--wrapper">
          <Routes>
            <Route path="/" exact element={<Admin />} />
            <Route path='/admin/sp' element={<SanPhamList />} />
            <Route path='/admin/spthem' element={<SanPhamThem />} />
            <Route path='/admin/spsua/:id' element={<SanPhamSua />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;