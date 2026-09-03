import { useState, useEffect } from "react";
import { useStory } from "../contexts/StoryContext";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/Loader";

export default function StoryDetail() {

  const { story, setStory, loading, setLoading } = useStory();
  const { slug } = useParams();
  const endpoint = import.meta.env.VITE_API_BASE_URL;
  // const [story, setStory] = useState({});

  function fetchStory() {

    setLoading(true);

    axios.get(endpoint + `/stories/${slug}`)
      .then((res) => {
        console.log(res.data);
        setStory(res.data.results);
      })
      .catch((err) => {
        console.log(err);
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
      <div>
        <Loader />
        <img src={story?.cover_img} alt="" className="w-100" style={{ height: '300px', objectFit: 'cover' }} />
        <div className="container px-5 py-1" style={{ backgroundColor: 'white', maxWidth: '750px' }}>
          <h2 className="m-3 mt-5 mb-4">{story?.title}</h2>
          <p>{story?.content}</p>

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
      </div>
    </>
  )
}