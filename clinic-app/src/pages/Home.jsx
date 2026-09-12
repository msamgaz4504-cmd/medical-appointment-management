import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Services from '../components/Services';
import ReservationSection from '../components/ReservationSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
    <Navbar type="Home" />
    <Header />
    <Services />
    <ReservationSection />
    <Contact />
    <Footer />
    </>
  )
  
};

export default Home;