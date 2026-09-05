import { useEffect } from "react";
import { useStory } from "../contexts/StoryContext";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/Loader";


export default function IssueDetail() {

  const endpoint = import.meta.env.VITE_API_BASE_URL;
  const { issue, setIssue, setLoading, getYearMonth } = useStory();
  const { pubblication_number } = useParams();

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
            <div className="issue_jumbo_date">{getYearMonth(issue?.published_at)}</div>
            <h2 className="issue_jumbo_title title_font">{issue?.title}</h2>
          </div>

        </section>

        <div className="container p-5 my-3">
          sdfghhhhhhhhhhhhhhhhhhhhh hhh hhhhhhhhhhhh hhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhh
        </div>

      </div>
    </>
  )
}