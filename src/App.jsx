import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout.jsx';
import CupStoriesHome from './pages/CupStoriesHome.jsx';
import StoriesList from './pages/StoriesList.jsx';

function App() {

  /* code here */

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />} >
            <Route index element={<CupStoriesHome />} />
            <Route path='/short-stories-all' element={<StoriesList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
