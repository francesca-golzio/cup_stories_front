import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStory } from '../contexts/StoryContext';
import axios from 'axios';
import Loader from '../components/Loader';


export default function AuthorsList() {

  const endpoint = import.meta.env.VITE_API_BASE_URL;
  const { authors, setAuthors, setLoading, error, setError, setCurrentPage, currentPage, setlastPage, lastPage, prevPage, nextPage } = useStory();

  function fetchAuthors() {

    setLoading(true);

    axios.get(endpoint + '/authors')
      .then((res) => {
        console.log(res.data.results);
        setAuthors(Array.isArray(res.data?.results) ? res.data.results : []);
      })
      .catch((err) => {
        //console.log(err.response);
        const status = err.response?.status;

        if (status === 404) {
          setError('No stories found.');
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

  useEffect(fetchAuthors, [currentPage]);


  return (
    <>
      <div className="container">
        <Loader />
        <div className="row">
          {
            error
              ? (<p className="alert alert-secondary text-center w-50 mx-auto m-3">{error}</p>)
              : (<div className="container author_list_card_container py-5">
                <div className="row d-flex justify-content-center">
                  {authors.map((author) => (
                    <div className="card col-12 col-md-6 col-lg-4 author_list_card my-3 mx-4" key={author.slug}>
                      <Link
                        to={`/authors/${author.slug}`} 
                        title={`about ${author.name}`}>
                        <div className="icon_more_about_author">
                          <i className="bi bi-box-arrow-up-right"></i>
                        </div>
                      </Link>
                      <img src={author.photo} alt={author.name} />
                      <h5 className="author_list_card_title">{author.name}<br />{author.surname}</h5>
                    </div>

                  ))}
                </div>
              </div>
              )
          }

        </div>
      </div>
    </>
  )
}