import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-2">Welcome to Vibe Chat</h1>
        <p className="text-gray-600">
          A place to connect and chat with your vibe.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
