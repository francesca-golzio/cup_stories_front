import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStory } from "../contexts/StoryContext";
import Loader from "../components/Loader";

export default function AuthorDetail() {

  const { error, setError, setLoading } = useStory();

  const { slug } = useParams();
  const endpoint = import.meta.env.VITE_API_BASE_URL;
  const [author, setAuthor] = useState();

  function fetchAuthor() {

    setLoading(true);

    axios.get(endpoint + `/authors/${slug}`)
      .then((res) => {
        //console.log(res.data);
        setAuthor(res.data.results);
      })
      .catch((err) => {
        console.log(err.response);
        const status = err.response?.status;

        if (status === 404) {
          setError('Author not found.');
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
    fetchAuthor();
  }, [slug]);

  return (
    <>


      {
        error
          ? (<p className="alert alert-secondary text-center w-50 mx-auto m-3">{error}</p>)
          : (
            <>
              <Loader />


              <div className="container author_box">
                <div className="row justify-content-center">
                  <div className="col col-12 col-md-8 d-flex flex-column gap-2 pt-5">
                    <h2 className="title_font">~ {author?.name} {author?.surname} ~</h2>
                    <h3 className="px-3">About {author?.name + ' ' + author?.surname}</h3>
                    <p className="text-body-secondary px-3">{author?.bio}</p>
                  </div>
                  <div className="col col-10 col-sm-8 col-md-4 author_photo_container">
                    <img src={author?.photo} className="author_photo img-fluid" alt="" />
                  </div>
                </div>
                <div className="author_stories container pb-3">
                  <h3 className="mb-4">Short Stories by {author?.name + ' ' + author?.surname}</h3>
                  {author?.stories.map((story) => {
                    return (
                      <div className="row issue_story_block my-3" key={story?.slug} style={{ '--issue-color': story?.issue?.color }}>
                        <div className="col">
                          <Link to={`/short-stories/${story?.slug}`}>
                            <div className="d-flex gap-3 align-items-center">
                              <i className="bi bi-bookmark-star"></i>
                              <div className="issue_story_title">{story?.title}</div>
                            </div>
                          </ Link>
                            <div className="author_story_tags d-flex gap-3">
                              {story?.tags && story?.tags.map((tag) => (
                                <div className="story_tag_container" key={tag?.label}>
                                  <div className="author_story_tag">{tag.label}</div>
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
                        </div>
                      </div>
                    )
                  })}

                </div>


              </div>

            </>
          )
      }

    </>
  )
}