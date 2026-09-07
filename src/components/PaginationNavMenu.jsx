
export default function PaginationNavMenu({ currentPage, lastPage, prevPage, nextPage, setCurrentPage }) {

  //console.log(typeof page, currentPage);
            
  return (

    <div className="d-flex justify-content-center gap-2 p-2">
      <button className="btn btn-light pagination_btn" onClick={() => prevPage(currentPage)} disabled={currentPage === 1}>prev</button>
      
      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
        <button
        key={page}
        className={`btn pagination_btn ${page === currentPage ? "btn_active" : "btn-light"}`}
        onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}

      <button className="btn btn-light pagination_btn" onClick={() => nextPage(currentPage, lastPage)} disabled={currentPage === lastPage}>next</button>
    </div>
  )
}