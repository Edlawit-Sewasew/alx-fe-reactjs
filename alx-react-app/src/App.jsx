import UserProfile from './UserProfile';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';

function App() {
  return (
    <div>
      
      <Header />
      <MainContent />
      <Footer />

     
      <UserProfile name="Abel" age="25" bio="Loves hiking and photography" />
      <UserProfile name="Barkot" age="30" bio="Enjoys painting and traveling" />
      <UserProfile name="Christian" age="28" bio="Fan of tech and coding" />
    </div>
  );
}

export default App;
