import { Link } from "react-router-dom";

export default function StoryCard({story}) {


  return (
    <>
      <div className="story_card col-md-6 col-lg-4 my-3" key={story.slug}>
        <div className="card">
          <img src={story.cover_img} className="card-img-top" alt="story cover image" />
          <div className="card-body">
            <h3 className="card-title">{story.title}</h3>
            <div className="d-flex justify-content-between">
              <div className="card-text">{story.author.name} {story.author.surname}</div>
              <div className="card-text">Issue {story.issue.pubblication_number}</div>
              <Link to={`/short-stories/${story.slug}`}>read</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}