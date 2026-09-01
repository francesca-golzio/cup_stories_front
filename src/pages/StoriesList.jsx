import { useState, useEffect } from "react";
import axios from 'axios';

export default function StoriesList() {

  const endpoint = 'http://localhost:8000/api';
  const [stories, setStories] = useState([]);

  function fetchStories() {

    axios.get(endpoint + '/stories?paginate=false')
      .then((res) => {
        console.log(res.data.data);
        setStories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        /* stop loader */
      })
    //console.log(stories);

  }

  useEffect(fetchStories, []);

  return (
    <>
      <div>StoriesList</div>
      <div className="container">
        <div className="row">
          {stories.map((story) => (
            <div className="col-4 my-3" key={story.slug}>
              <div className="card">
                <img src={story.cover_img} className="card-img-top" alt="story cover image" />
                <div className="card-body">
                  <h3 className="card-title">{story.title}</h3>
                  <div className="d-flex justify-content-between">
                    <div className="card-text">{story.author.name} {story.author.surname}</div>
                    <div className="card-text">Issue {story.issue.pubblication_number}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )

}