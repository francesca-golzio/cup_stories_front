import { useEffect } from "react";
import { useStory } from "../contexts/StoryContext";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/Loader";


export default function IssueDetail() {

  const endpoint = import.meta.env.VITE_API_BASE_URL;
  const { issue, setIssue, loading, setLoading, getYearMonth, error, setError } = useStory();
  const { pubblication_number } = useParams();
  const stories = issue?.stories || [];

  function fetchIssue() {

    setLoading(true);

    axios.get(endpoint + `/issues/${pubblication_number}`)
      .then((res) => {
        setIssue(res.data.results);
      })
      .catch((err) => {
        //console.log(err.response);
        const status = err.response?.status;

        if (status === 404) {
          setError('Issue not found.');
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

  useEffect(fetchIssue, [pubblication_number]);



  return (
    <>
      {error
        ? <p className="alert alert-secondary text-center w-50 mx-auto m-3">{error}</p>
        : (
          <div className="issue_upper_container" style={{
            '--issue-color': issue?.color, '--issue-image': 'url(' + issue?.cover_img + ')'
          }}>

            {loading && <Loader />}

            {(!loading && !error) && (
              <div className="issue_container">

                <div className="jumbo_bg_color" style={{ backgroundColor: issue?.color }}></div>
                
                <div className="issue_details">
                  {/* <div className="issue_jumbo_bg"> */}
                  <div className="d-flex justify-content-between">
                    <div className="issue_jumbo_detail">{getYearMonth(issue?.published_at)}</div>
                    <div className="issue_jumbo_detail">Issue {issue?.pubblication_number}</div>
                  </div>
                  {/* </div> */}

                  <h2 className="issue_jumbo_title title_font">{issue?.title}</h2>
                </div>

                <div className="issue_stories_container">

                  <h4 className="title_font mb-4">In this issue</h4>

                  <div className="container">
                    {stories.map((story) => {
                      return (
                        <div className="row issue_story_block my-3" key={story?.slug}>
                          <div className="col">
                            <Link to={`/short-stories/${story?.slug}`}>
                              <div className="d-flex gap-3 align-items-center">
                                <i className="bi bi-bookmark-star"></i>
                                <div className="issue_story_title">{story?.title}</div>
                              </div>
                            </ Link>
                            <div className="d-flex gap-3">
                              <div className="issue_story_author text-muted">
                                <small>by </small>
                                <Link to={`/authors/${story?.author?.slug}`}>{story?.author?.name} {story?.author?.surname}</Link>
                              </div>
                              <div className="issue_story_tags d-flex gap-3">
                                {story?.tags && story?.tags.map((tag) => (
                                  <div className="story_tag_container" key={tag?.label}>
                                    <div className="issue_story_tag" key={tag.label}>{tag.label}</div>
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
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>
            )}

          </div>
        )
      }

    </>
  )
}