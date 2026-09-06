import { useState, useEffect } from "react";
import { useStory } from "../contexts/StoryContext";
import axios from 'axios';
import Loader from "../components/Loader";
import StoryCard from "../components/StoryCard";

export default function StoriesList() {

  const endpoint = import.meta.env.VITE_API_BASE_URL;
  const { stories, setStories, loading, setLoading, error, setError } = useStory();
  // const [ setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);

  function fetchStories() {

    //console.log(loading);
    setLoading(true);
    setError(null);

    axios.get(endpoint + '/stories', {
      params: {
        page: currentPage
      }
    })
      .then((res) => {
        //console.log(res.data.results.data);
        setStories(Array.isArray(res.data?.results?.data) ? res.data.results.data : []);
        //setStories(res.data.results.data);
        setCurrentPage(res.data.results.current_page);
        setlastPage(res.data.results.last_page);
      })
      .catch((err) => {
        //console.log(err.response);
        const status = err.response?.status;

        if (status === 404) {
          setError('No stories found.');
        } else if (status === 500) {
          setError('Internal server error. Try again later.');
        } else if (!err.response) {
          setError('Network error. Try again later.');
        } else {
          setError(err.response?.data.message || 'Sorry, something went wrong.');
        }
      })
      .then(() => {
        setLoading(false);
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
          {
            error
              ? (<p className="alert alert-secondary text-center w-50 mx-auto m-3">{error}</p>)
              : (stories.map((story) => (
                <StoryCard story={story} key={story.slug} />
              ))
              )}
        </div>
      </div>

      <div className="d-flex justify-content-center gap-2 p-2">
        <button className="btn btn-light" onClick={prevPage} disabled={currentPage === 1}>prev</button>
        <button className="btn btn-light" onClick={nextPage} disabled={currentPage === lastPage}>next</button>
      </div>
    </>
  )

}