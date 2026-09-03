import { useState, useEffect } from "react";
import { useStory } from "../contexts/StoryContext";
import axios from 'axios';
import Loader from "../components/Loader";

export default function StoriesList() {

  const endpoint = import.meta.env.VITE_API_BASE_URL;
  const { stories, setStories, loading, setLoading } = useStory();
  // const [ setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);

  function fetchStories() {

    //console.log(loading);
    setLoading(true);

    axios.get(endpoint + '/stories', {
      params: {
        page: currentPage
      }
    })
      .then((res) => {
        //console.log(res.data.results.data);
        setStories(res.data.results.data);
        setCurrentPage(res.data.results.current_page);
        setlastPage(res.data.results.last_page);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
      })
  }

  useEffect(fetchStories, [currentPage]);

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function nextPage() {
    if (currentPage < lastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  return (
    <>
      <div className="container">
        <Loader />
        <div className="row">
          {stories.map((story) => (
            <div className="col-md-6 col-lg-4 my-3" key={story.slug}>
              <div className="card">
                <img src={story.cover_img} className="card-img-top" alt="story cover image" />
                <div className="card-body">
                  <h3 className="card-title">{story.title}</h3>
                  <div className="d-flex justify-content-between">
                    <div className="card-text">{story.author.name} {story.author.surname}</div>
                    <div className="card-text">Issue {story.issue.pubblication_number}</div>
                    <Link to={`/short-stories/${story.slug}`}>read</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center gap-2 p-2">
        <button className="btn btn-light" onClick={prevPage} disabled={currentPage === 1}>prev</button>
        <button className="btn btn-light" onClick={nextPage} disabled={currentPage === lastPage}>next</button>
      </div>
    </>
  )

}