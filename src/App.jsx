import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoryProvider } from './contexts/StoryContext.jsx';
import DefaultLayout from './layouts/DefaultLayout.jsx';
import CupStoriesHome from './pages/CupStoriesHome.jsx';
import StoriesList from './pages/StoriesList.jsx';
import StoryDetail from './pages/StoryDetail.jsx';
import "@fontsource-variable/crimson-pro"; 
import '@fontsource-variable/quicksand/wght.css';

function App() {

  /* code here */

  return (
    <>
      <StoryProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />} >
              <Route index element={<CupStoriesHome />} />
              <Route path='/short-stories' element={<StoriesList />} />
              <Route path='/short-stories/:slug' element={<StoryDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoryProvider>
    </>
  )
}

export default App
