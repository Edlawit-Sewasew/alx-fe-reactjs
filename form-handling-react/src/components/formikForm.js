import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/**
 * Validation schema using Yup
 */
const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

/**
 * FormikForm - Formik implementation with built-in state and Yup validation
 */
function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    // Mock API submission - simulate user registration
    console.log("Registration submitted (Formik):", values);

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Registration success:", data);
        alert("Registration successful!");
      })
      .catch((err) => {
        console.error("Registration error:", err);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <div className="form-container">
      <h2>Registration (Formik + Yup)</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="formik-username">Username</label>
              <Field
                type="text"
                id="formik-username"
                name="username"
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="p" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="formik-email">Email</label>
              <Field
                type="email"
                id="formik-email"
                name="email"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="p" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="formik-password">Password</label>
              <Field
                type="password"
                id="formik-password"
                name="password"
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="p" className="error-message" />
            </div>
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormikForm;
