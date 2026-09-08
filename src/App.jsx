import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoryProvider } from './contexts/StoryContext.jsx';
import "@fontsource-variable/crimson-pro"; 
import '@fontsource-variable/quicksand/wght.css';
import DefaultLayout from './layouts/DefaultLayout.jsx';
import CupStoriesHome from './pages/CupStoriesHome.jsx';
import StoriesList from './pages/StoriesList.jsx';
import StoryDetail from './pages/StoryDetail.jsx';
import IssuesList from './pages/IssuesList.jsx';
import IssueDetail from './pages/IssueDetail.jsx';
import AuthorsList from './pages/AuthorsList.jsx';
import AuthorDetail from './pages/AuthorDetail.jsx';

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
              <Route path='/issues' element={<IssuesList />} />
              <Route path='/issues/issue/:pubblication_number' element={<IssueDetail />} />
              <Route path='/authors' element={<AuthorsList />} />
              <Route path='/authors/:slug' element={<AuthorDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoryProvider>
    </>
  )
}

export default App
