import { NavLink } from 'react-router-dom';

export default function AppHeader() {
  return (
    <>

          {/* <li><NavLink to="/short-stories-all">Short Stories</NavLink></li> */}
      <header>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container gap-4">
            <NavLink to="/" className="navbar-brand"> <h1>Cup Stories</h1></NavLink>
            <div className="navbar-text fst-italic fs-4 text-center d-none d-lg-block w-100">Small Reading Treats</div>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/short-stories">Stories</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/issues">Issues</NavLink>
                </li>
                <li className="nav-item disabled" aria-disabled="true">
                  <NavLink className="nav-link" to="#">Authors</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>


    </>
  )
}