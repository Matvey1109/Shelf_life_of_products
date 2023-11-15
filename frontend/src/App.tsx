import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import ShelfLifeProducts from './pages/ShelfLifeProductsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header className="bg-[#0C1F45] text-white p-7 flex justify-between items-center">
          <Link
            to="/"
            className="text-4xl font-bold focus:outline-none pl-4 underline"
          >
            Shelf Life Products
          </Link>
          <Link
            to="/notes"
            className="text-xl focus:outline-none pr-4 underline"
          >
            Примечания
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<ShelfLifeProducts />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
