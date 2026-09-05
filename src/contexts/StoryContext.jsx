import { createContext, useContext, useState } from "react";

const StoryContext = createContext();

function StoryProvider({ children }) {

  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState([]);
  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState([]);

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

  return (
    <StoryContext.Provider
      value={{
        loading,
        setLoading,
        stories,
        setStories,
        story,
        setStory,
        getIncipit,
        issues,
        setIssues,
        issue,
        setIssue,
        getYearMonth
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