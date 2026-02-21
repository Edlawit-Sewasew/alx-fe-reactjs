import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div>
      <div className="form-section">
        <RegistrationForm />
      </div>
      <div className="form-section">
        <FormikForm />
      </div>
    </div>
  );
}

export default App;
