import { createContext, useContext, useState } from "react";

const StoryContext = createContext();

function StoryProvider({children}) {

  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState([]);


  return (
    <StoryContext.Provider 
      value={{
        loading, 
        setLoading, 
        stories, 
        setStories, 
        story, 
        setStory}}>
      {children}
    </StoryContext.Provider>
  );
}

function useStory() {
  const context = useContext(StoryContext);
 
  return context;
}

export { StoryProvider, useStory };