// src/App.jsx
import WelcomeMessage from "./components/WelcomeMessage";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import Counter from "./components/Counter";

function App() {
  return (
    <div>
      {/* Task 1 */}
      <WelcomeMessage />

      {/* Task 2 */}
      <Header />
      <MainContent />
      <UserProfile name="John Doe" age={25} bio="React learner" />
      <Counter />
      <Footer />

      {/* Task 3 */}
      <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
      <UserProfile name="Bob" age={30} bio="Enjoys painting and traveling" />
      <UserProfile name="Charlie" age={28} bio="Fan of tech and coding" />
    </div>
  );
}

export default App;
