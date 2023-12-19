import ResponsiveAppBar from './Nav';
import Footer from './components/Footer';
import Header from './components/Header';
import ServicesInformation from './components/Information';
import PostListComponent from './components/PostList';
import { ServicesComponent } from './components/Services';

const LandingPageComponent = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Header />
      <ServicesInformation />
      <ServicesComponent />
      <PostListComponent />
      <Footer />
    </>
  );
};

export default LandingPageComponent;
