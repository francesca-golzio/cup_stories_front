import { useEffect } from "react";
import { useStory } from "../contexts/StoryContext";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/Loader";


export default function IssueDetail() {

  const endpoint = import.meta.env.VITE_API_BASE_URL;
  const { issue, setIssue, setLoading, getYearMonth } = useStory();
  const { pubblication_number } = useParams();
  const stories = issue?.stories || [];

  function fetchIssue() {

    setLoading(true);

    axios.get(endpoint + `/issues/${pubblication_number}`)
      .then((res) => {
        setIssue(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
      })
  }

  useEffect(fetchIssue, [pubblication_number]);



  return (
    <>
      <div className="issue_detail_container" style={{
        '--issue-color': issue?.color, '--issue-color-light': issue?.color + '55', '--issue-image': 'url(' + issue?.cover_img + ')'
      }}>

        <Loader />

        <section className="issue_jumbo_container">

          <div className="jumbo_bg_color" style={{ backgroundColor: issue?.color }}></div>

          <div className="issue_jumbo_contents p-4">
            <div className="d-flex justify-content-between">
              <div className="issue_jumbo_date">{getYearMonth(issue?.published_at)}</div>
              <div className="issue_jumbo_date">Issue {issue?.pubblication_number}</div>
            </div>

            <h2 className="issue_jumbo_title title_font">{issue?.title}</h2>
          </div>

        </section>

        <div className="container p-5 mt-3">

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
                          {story?.tags.map((tag) => (
                            <div className="issue_story_tag" key={tag.label}>{tag.label}</div>
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

      </div>
    </>
  )
}