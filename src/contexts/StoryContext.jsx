import { createContext, useContext, useState } from "react";

const StoryContext = createContext();

function StoryProvider({ children }) {

  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState([]);
  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);

  function getIncipit(text) {
    const incipit = text.slice(0, 120);
    return incipit + '...';
  }

  function getYearMonth(datestring) {
    const months_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(datestring);
    const year = date.getFullYear();
    const month_index = date.getMonth();
    const month = months_names[month_index];

    return `${month} ${year}`
  }

  function prevPage(currentPage) {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function nextPage(currentPage, lastPage) {
    if (currentPage < lastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  return (
    <StoryContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        stories,
        setStories,
        story,
        setStory,
        getIncipit,
        issues,
        setIssues,
        issue,
        setIssue,
        getYearMonth,
        prevPage,
        nextPage,
        currentPage,
        setCurrentPage,
        lastPage,
        setlastPage
      }}>
      {children}
    </StoryContext.Provider>
  );
}

function useStory() {
  const context = useContext(StoryContext);

  return context;
}

export { StoryProvider, useStory };