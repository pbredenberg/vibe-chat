import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Chats from './pages/Chats';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center h-screen w-full">
                  <h1 className="text-3xl font-bold text-center">
                    Hello World
                  </h1>
                </div>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chats" element={<Chats />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
