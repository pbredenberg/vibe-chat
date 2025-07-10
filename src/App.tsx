import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Chats from './pages/Chats';
import Home from './pages/Home';
import ChatDetail from './pages/ChatDetail';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chats/:id" element={<ChatDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
