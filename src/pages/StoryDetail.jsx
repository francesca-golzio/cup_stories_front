import { useState, useEffect } from "react";
import { useStory } from "../contexts/StoryContext";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/Loader";

export default function StoryDetail() {

  const { story, setStory, loading, setLoading, error, setError } = useStory();
  const { slug } = useParams();
  const endpoint = import.meta.env.VITE_API_BASE_URL;
  // const [story, setStory] = useState({});

  function fetchStory() {

    setLoading(true);

    axios.get(endpoint + `/stories/${slug}`)
      .then((res) => {
        //console.log(res.data);
        setStory(res.data.results);
      })
      .catch((err) => {
        //console.log(err.response);
        const status = err.response?.status;

        if (status === 404) {
          setError('Story not found.');
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

  useEffect(() => {
    setStory({});
    fetchStory();
  }, [slug]);


  return (
    <>
      {
        error
          ? (<p className="alert alert-secondary text-center w-50 mx-auto m-3">{error}</p>)
          : (<div style={{ '--issue-color': story?.issue?.color, '--issue-color-light': story?.issue?.color + '40' }}>
            <Loader />
            <img src={story?.cover_img} alt="" className="w-100" style={{ height: '300px', objectFit: 'cover' }} />
            <div className="container px-5 py-1" style={{ backgroundColor: 'white', maxWidth: '750px' }}>
              <h2 className="m-3 mt-5 mb-4 title_font">{story?.title}</h2>
              <p className="story_text">{story?.content}</p>

              <div className="d-flex justify-content-between my-5">
                <div className="d-flex flex-column">
                  {story?.tags && story?.tags.map((tag) => (
                    <div className="story_tag_container" key={tag?.label}>
                      <div className="story_tag px-2">&nbsp;{tag?.label}&nbsp;&nbsp;</div>
                      <div className="story_tag_description p-3 rounded">
                        <div className="d-flex justify-content-between">
                          <h5>{tag?.name}</h5>
                          <small>{tag?.label}</small>
                        </div>
                        <small>{tag?.description}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to={`/issues/issue/${story?.issue?.pubblication_number}`}>from Issue {story?.issue?.pubblication_number}</Link>
              </div>

              <address className="d-flex flex-column text-muted gap-2 m-3 my-5">
                <div className="d-flex gap-3 text-muted">
                  <img src={story?.author?.photo} className="rounded-circle" style={{ width: '75px', height: '75px' }} alt="" />
                  <div className="d-flex flex-column gap-2 pt-2">
                    <div>by <span className="fw-bold">{story?.author?.name} {story?.author?.surname}</span></div>
                    <p>{story?.author?.bio}</p>
                  </div>
                </div>
                <span className="btn btn-sm btn-outline-secondary">about {story?.author?.name}</span>
              </address>
            </div>
          </div>)
      }
    </>
  )
}