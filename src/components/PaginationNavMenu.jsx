
export default function PaginationNavMenu({currentPage, lastPage, prevPage, nextPage}) {


  return (

    <div className="d-flex justify-content-center gap-2 p-2">
      <button className="btn btn-light" onClick={() => prevPage(currentPage)} disabled={currentPage === 1}>prev</button>
      <button className="btn btn-light" onClick={() => nextPage(currentPage, lastPage)} disabled={currentPage === lastPage}>next</button>
    </div>
  )
}