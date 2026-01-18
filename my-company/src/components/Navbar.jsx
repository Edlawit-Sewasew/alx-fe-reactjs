import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "navy",
        padding: "10px",
        textAlign: "center"
      }}
    >
      <Link style={{ color: "white", margin: "10px" }} to="/">Home</Link>
      <Link style={{ color: "white", margin: "10px" }} to="/about">About</Link>
      <Link style={{ color: "white", margin: "10px" }} to="/services">Services</Link>
      <Link style={{ color: "white", margin: "10px" }} to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
