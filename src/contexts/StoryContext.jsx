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
        setIssue
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