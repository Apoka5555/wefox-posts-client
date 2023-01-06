import { Link } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <header className="nav-bar">
      <Link to="/" className="home-link">
        Home
      </Link>
    </header>
  );
}
