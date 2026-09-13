import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useStory } from '../contexts/StoryContext';
import Loader from '../components/Loader';

export default function CupStoriesHome() {

  const { loading, setLoading, error, setError } = useStory();
  // const [randoRequested, setRandoRequested] = useState(false);
  const [randoStory, setRandoStory] = useState('');
  const endpoint = import.meta.env.VITE_API_BASE_URL;

  function getRandoStory() {

    setLoading(true);

    axios.get(endpoint + '/stories/random')
      .then((res) => {
        setRandoStory(res.data.results);
      })
      .catch((err) => {
        console.log(err.response);
        const status = err.response?.status;

        if (status === 404) {
          setError('Story not found.');
        } else if (status === 500) {
          setError('Internal server error. Try again later.');
        } else if (!err.response) {
          console.log(err);
          setError('Network error. Try again later.');
        } else {
          setError(err.response?.data.message || 'Sorry, something went wrong.');
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    setRandoStory();
    getRandoStory();
  }, []);

  return (
    <>
      <section id="home_hero my-5">
        <div className="container p-4 my-3">
          <div className="row justify-content-center align-items-center">
            <img src="/cup-stories.png" alt="cup stories logo: a mix of an open book and a tea cup" className="home_hero_logo col-md-10 col-lg-4" />
            <div className="home_hero_text col-sm-12 col-md-8">
              <h2 className="title_font fs-1 mb-4">Welcome to Cup Stories</h2>
              <p className="muted-text fs-4">Cup Stories is an online magazine of short stories for the moments between things: a morning coffee, a quiet evening or a few minutes stolen just for yourself.</p>
              <div className="muted-text fs-4 fst-italic d-flex flex-wrap justify-content-center align-items-center gap-1 my-3">
                <span>Take a pause.</span>
                <span>&nbsp;Pour yourself something warm.</span>
                <span>&nbsp;Find a story.</span>
              </div>
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 py-3">
                <Link to="/short-stories" className="btn btn-warning fs-4 all_stories_btn">Find a story</Link>
                <span>or</span>
                <Link to="/issues" className="btn btn-outline-warning text-dark fs-4 all_issues_btn">Browse an Issue</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home_rando_story my-5">
        <Loader />

        <div className="container p-4">
          <div className="row">

            <div className="col col-12 text-center mb-3">
              <h2 className="title_font fs-1 mb-4">
                A taste of unexpected
              </h2>
              <div className="d-flex gap-3 flex-wrap justify-content-center align-items-start muted-text fs-4">
                <span>Not sure what to read next? &nbsp; Try this serve or pick another</span>
              </div>
            </div>

            <div className="col col-12 d-flex flex-wrap gap-5 justify-content-center align-items-start">

              <div className="col col-12 col-lg-4">
                {randoStory?.cover_img &&
                  <img src={randoStory.cover_img} alt="story cover image" className="rando_story_img img-fluid w-100" />
                }
              </div>

              <div className="col col-12 col-lg-7">
                {(randoStory?.incipit && randoStory?.slug) &&
                  <>
                    <p className="rando_story_incipit fs-4 ">{randoStory.incipit}</p>
                    <div className="d-flex flex-wrap gap-3 justify-content-between align-items-start">
                      <Link to={`/short-stories/${randoStory.slug}`} className="btn btn-outline-warning text-dark keep_reading_btn">KEEP READING</Link>
                      <button onClick={() => getRandoStory()} className="rando_story_btn btn btn-warning text-dark d-flex gap-2 align-items-center align-self-end get_random_story_btn">
                        <i className="bi bi-shuffle"></i> PICK
                      </button>
                    </div>
                  </>
                }
              </div>

            </div>

          </div>

        </div>


      </section >

    </>
  )
}