import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployerDashboard from './pages/EmployerDashboard';
import EditJobPage from './pages/EditJobPage'; // Importing the EditJobPage

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <header className="App-header">
          {/* Removed the logo, paragraph, and link as instructed */}
        </header>
      </div>
      <Routes>
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/edit-job" element={<EditJobPage />} /> {/* Added EditJobPage route */}
        {/* Add other routes here as necessary */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;