import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/navbar";
import Footer from './components/footer/footer';
import Sponsor from './components/sponsorship/sponsor';
import Gallery from './components/Gallary/gallary';
import Awardcategory from './components/Awardctg/awardctg';
import Awardwinners from './components/Awardwinner/winner';
import Voiceofnomination from './components/Events/voicenom';
import Whynominate from './components/whynominate/whynominate';
import AwardRegistration from './components/Awardregister/awardregister';
import NewHome from "./components/NewHome/home";
import Nominatedvideos from "./components/voiceofnominated/nominatedvideo";
import Checkout from './components/Awardregister/checkout';
import Newreg from './components/newregister/newreg';
import PreviewPage from './components/newregister/preview';
import Agendapage from './components/Agenda/agenda';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/awardcategories" element={<Awardcategory />} />
          <Route path="/awardwinners" element={<Awardwinners />} />
          <Route path="/whynominate" element={<Whynominate />} />
          <Route path='/awardsnom' element={<AwardRegistration />} />
          <Route path="/Events" element={<Voiceofnomination/>} />
          <Route path="/3minvideo" element={<Nominatedvideos/>} />
          <Route path='/' element={<NewHome />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/success" element={<h2>Payment Successful!</h2>} />
          <Route path="/awardsnomination" element={<Newreg/>} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/parisagenda2026" element={<Agendapage />} />
        </Routes>
    </Router>
  );
}

export default App;
