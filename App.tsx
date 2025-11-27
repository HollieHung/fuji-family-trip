import { HashRouter, Routes, Route } from 'react-router-dom';
import ItineraryView from './views/ItineraryView';
import DocsView from './views/DocsView';
import MarathonView from './views/MarathonView';
import GuideChat from './views/GuideChat';
import Navigation from './components/Navigation';

function App() {
  return (
    <HashRouter>
      <div className="max-w-md mx-auto min-h-screen bg-[#fcfaf5] relative shadow-2xl overflow-hidden">
        <Routes>
          <Route path="/" element={<ItineraryView />} />
          <Route path="/docs" element={<DocsView />} />
          <Route path="/marathon" element={<MarathonView />} />
          <Route path="/guide" element={<GuideChat />} />
        </Routes>
        <Navigation />
      </div>
    </HashRouter>
  );
}

export default App;