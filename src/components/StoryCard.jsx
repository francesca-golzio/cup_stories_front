import { Link } from "react-router-dom";
import { useStory } from "../contexts/StoryContext";

export default function StoryCard({ story }) {

  const { getIncipit } = useStory();

  return (
    <>
      <div className=" col col-md-6 col-lg-4 my-3" key={story?.slug}>
        <div className="card h-100 story_card" style={{ '--issue-color': story?.issue?.color }}>

          <div className="story_tags">
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

          <Link to={`/short-stories/${story?.slug}`}>
            <img src={story?.cover_img} className="card-img-top" alt="story cover image" />
          </Link>
          <div className="card-body">
            <h4 className="card-title title_font">{story?.title}</h4>
            <div className="incipit my-3">{story?.content && getIncipit(story.content)}</div>
          </div>
            <div className="d-flex justify-content-between m-3 mt-auto">
              <div className="card-text">
                by
                &nbsp;
                <Link to={`/authors/${story?.author?.slug}`}>
                  {story?.author?.name} {story?.author?.surname}
                </Link>
              </div>
              <Link to={`/issues/issue/${story?.issue?.pubblication_number}`}>Issue {story?.issue?.pubblication_number}</Link>
              <Link to={`/short-stories/${story?.slug}`}><i className="bi bi-book-half mx-2"></i>read</Link>
            </div>
        </div>
      </div>
    </>
  )
}