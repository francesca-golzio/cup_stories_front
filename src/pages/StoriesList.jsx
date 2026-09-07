import { useState, useEffect } from "react";
import { useStory } from "../contexts/StoryContext";
import axios from 'axios';
import Loader from "../components/Loader";
import StoryCard from "../components/StoryCard";
import PaginationNavMenu from "../components/PaginationNavMenu";

export default function StoriesList() {

  const endpoint = import.meta.env.VITE_API_BASE_URL;
  const { stories, setStories, setLoading, error, setError, setCurrentPage, currentPage, setlastPage, lastPage, prevPage, nextPage } = useStory();


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
  }

  useEffect(fetchStories, [currentPage]);


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

      <PaginationNavMenu currentPage={currentPage} lastPage={lastPage} prevPage={prevPage} nextPage={nextPage} setCurrentPage={setCurrentPage} />
    </>
  )

}