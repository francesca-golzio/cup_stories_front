import { Link } from "react-router-dom";
import { useStory } from "../contexts/StoryContext";

export default function IssueCard({ issue }) {

  function getYearMonth(datestring) {
    const months_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(datestring);
    const year = date.getFullYear();
    const month_index = date.getMonth();
    const month = months_names[month_index];

    return `${month} ${year}`
  }

  return (
    <>
      <div className="col-md-6 col-lg-4 my-3" key={issue?.slug}>
        <div className="card issue_card" style={{ '--issue-color': issue?.color, '--issue-color-light': issue?.color + '40' }}>

          <div className="issue_number_container">
            <div className="issue_number px-2" key={issue?.pubblication_number}>Issue {issue?.pubblication_number} &nbsp;</div>
          </div>

          <img src={issue?.cover_img} className="issue_img card-img-top" alt="issue cover image" />

          <div className="card-body">

            <h4 className="card-title title_font mb-3">{issue?.title}</h4>

            <div className="d-flex justify-content-between mt-auto">

              <div className="muted-text"><small>{getYearMonth(issue?.published_at)}</small></div>

              <Link to={`/issues/${issue?.slug}`}>read</Link>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}