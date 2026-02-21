import React from "react";
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

  return React.createElement(
    "div",
    { className: "form-container" },
    React.createElement("h2", null, "Registration (Formik + Yup)"),
    React.createElement(
      Formik,
      {
        initialValues: initialValues,
        validationSchema: RegistrationSchema,
        onSubmit: handleSubmit,
      },
      () =>
        React.createElement(
          Form,
          null,
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement("label", { htmlFor: "formik-username" }, "Username"),
            React.createElement(Field, {
              type: "text",
              id: "formik-username",
              name: "username",
              placeholder: "Enter username",
            }),
            React.createElement(ErrorMessage, {
              name: "username",
              component: "p",
              className: "error-message",
            })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement("label", { htmlFor: "formik-email" }, "Email"),
            React.createElement(Field, {
              type: "email",
              id: "formik-email",
              name: "email",
              placeholder: "Enter email",
            }),
            React.createElement(ErrorMessage, {
              name: "email",
              component: "p",
              className: "error-message",
            })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement("label", { htmlFor: "formik-password" }, "Password"),
            React.createElement(Field, {
              type: "password",
              id: "formik-password",
              name: "password",
              placeholder: "Enter password",
            }),
            React.createElement(ErrorMessage, {
              name: "password",
              component: "p",
              className: "error-message",
            })
          ),
          React.createElement("button", { type: "submit" }, "Register")
        )
    )
  );
}

export default FormikForm;
