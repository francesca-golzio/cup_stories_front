import { Link } from "react-router-dom";

export default function StoryCard({story}) {


  return (
    <>
      <div className="col-md-6 col-lg-4 my-3" key={story?.slug}>
        <div className="card">

          <div className="story_tags">
            {story?.tags.map((tag) => (
              <div className="story_tag px-2" key={tag.label}>{tag.label} &nbsp;</div>
            ))}
          </div>

          <img src={story.cover_img} className="card-img-top" alt="story cover image" />
          <div className="card-body">
            <h4 className="card-title title_font">{story.title}</h4>
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