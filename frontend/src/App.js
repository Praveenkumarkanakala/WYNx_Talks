import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

// import Navbar from "./components/Navbar/navbar";
// import Footer from './components/footer/footer';
// import Voiceofnomination from './components/Events/voicenom';
// import AwardRegistration from './components/Awardregister/awardregister';

import Gallery from './components/Gallary/gallary';
import Awardcategory from './components/Awardctg/awardctg';
import Awardwinners from './components/Awardwinner/winner';
// import NewHome from "./components/NewHome/home";
import Checkout from './components/Awardregister/checkout';
import Newreg from './components/newregister/newreg';
import PreviewPage from './components/newregister/preview';
import Agendapage from './components/Agenda/agenda';

import NewNav from "./Pages/NewNavbar/Navbar";
import LandingPage from "./Pages/Landingpage/landing";
import NewFooter from "./Pages/Footer/footer";
import Contactpage from "./Pages/Contact/contact";
import Aboutpage from "./Pages/About/about";
import Conferencecards from "./Pages/conferences/conference";
import ConferencePage from "./Pages/conferences/insideconference";

import RefundPolicy from "./Pages/Policyconditions/refund";
import PrivacyPolicy from "./Pages/Policyconditions/privacy";
import TermsConditions from "./Pages/Policyconditions/termsconditions";


if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function App() {
  return (
    <Router>
      <ScrollToTop />
        <Routes>
          {/* <Route path="/navbar" element={<Navbar />} />
          <Route path="/footer" element={<Footer />} /> */
          /* <Route path='/awardsnom' element={<AwardRegistration />} /> */
          /* <Route path="/Events" element={<Voiceofnomination/>} /> */}

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/awardcategories" element={<Awardcategory />} />
          <Route path="/awardwinners" element={<Awardwinners />} />
          {/* <Route path='/landing' element={<NewHome />} /> */}
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/success" element={<h2>Payment Successful!</h2>} />
          <Route path="/awardsnomination" element={<Newreg/>} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/newyorkagenda2026" element={<Agendapage />} />
          <Route path="/newnavbar" element={<NewNav />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/newfooter" element={<NewFooter />} />
          <Route path='/contact' element={<Contactpage />} />
          <Route path='/about' element={<Aboutpage />} />
          <Route path='/conferences' element={<Conferencecards />} />
          <Route path="/wynxconferences/:id" element={<ConferencePage />} />

          <Route path="/refundpolicy" element={<RefundPolicy />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsconditions" element={<TermsConditions />} />
          </Routes>
    </Router>
  );
}

export default App;
