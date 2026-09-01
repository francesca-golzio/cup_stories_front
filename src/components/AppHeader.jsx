import { NavLink } from 'react-router-dom';

export default function AppHeader() {
  return (
    <>

          {/* <li><NavLink to="/short-stories-all">Short Stories</NavLink></li> */}
      <header>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container gap-4">
            <NavLink to="/" className="navbar-brand"> <h1>Cup Stories</h1></NavLink>
            <div className="navbar-text fst-italic fs-4">Small Reading Treats</div>
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
                  <NavLink className="nav-link active"  to="/" aria-current="page">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/short-stories-all">Short Stories</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="#">Issues</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="#">Authors</NavLink>
                </li>
              </ul>
              <form className="d-flex my-2 my-lg-0">
                <input
                  className="form-control me-sm-2"
                  type="text"
                  placeholder="Search"/>
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>


    </>
  )
}