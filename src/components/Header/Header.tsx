import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-success-subtle">
      <div className="container d-flex  justify-content-between">
        <NavLink to="/" className="navbar-brand">Finance Tracer</NavLink>
        <div id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/add">Add</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;