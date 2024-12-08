import { Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Favourites } from './pages/Favourites';

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  );
}


