// src/App.jsx
import WelcomeMessage from './WelcomeMessage';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import UserProfile from './UserProfile';

function App() {
  return (
    <div>
      {/* Task 1 */}
      <WelcomeMessage />

      {/* Task 2 */}
      <Header />
      <MainContent />
      <Footer />

      {/* Task 3 */}
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <UserProfile name="Bob" age="30" bio="Enjoys painting and traveling" />
      <UserProfile name="Charlie" age="28" bio="Fan of tech and coding" />
    </div>
  );
}

export default App;
