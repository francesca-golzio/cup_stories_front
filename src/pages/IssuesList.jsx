import { useState, useEffect } from "react";
import { useStory } from "../contexts/StoryContext";
import axios from 'axios';
import Loader from "../components/Loader"; 
import IssueCard from "../components/IssueCard";

export default function IssuesList() {

  const endpoint = import.meta.env.VITE_API_BASE_URL;
  const { issues, setIssues, loading, setLoading } = useStory();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);

  function fetchIssues() {

    //console.log(loading);
    setLoading(true);

    axios.get(endpoint + '/issues', {
      params: {
        page: currentPage
      }
    })
      .then((res) => {
        //console.log(res.data.results.data);
        setIssues(res.data.results.data);
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

  useEffect(fetchIssues, [currentPage]);

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
          {issues.map((issue) => (
            <IssueCard issue={issue} key={issue.slug} />
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