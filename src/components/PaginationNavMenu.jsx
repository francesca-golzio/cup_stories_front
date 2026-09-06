import { useStory } from "../contexts/StoryContext";

export default function PaginationNavMenu(currentPage, lastPage) {

  const { prevPage, nextPage } = useStory();

  return (

    <div className="d-flex justify-content-center gap-2 p-2">
      <button className="btn btn-light" onClick={prevPage} disabled={currentPage === 1}>prev</button>
      <button className="btn btn-light" onClick={nextPage} disabled={currentPage === lastPage}>next</button>
    </div>
  )
}