import React, { useEffect, useState, useLayoutEffect } from "react";
import AxiosService from "../utils/AxioService";
import { useParams } from "react-router-dom";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function GetTopicsById() {
  const [newsData, setNewsData] = useState(null);
  let { topic, id } = useParams();

  const getTopicsById = async () => {
    try {
      let { message, news } = await AxiosService.get(
        `${ApiRoutes.GET_NEWS_BY_ID.path}/${id}`,
        { authenticate: ApiRoutes.GET_NEWS_BY_ID.auth }
      );
      toast.success(news.title);
      setNewsData(news);
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  console.log('id:', id)
  useLayoutEffect(() => {
    getTopicsById();
  }, [id]);

  return (
    <section>
      <div className="container">
        <div className="row">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/breaking-news">Breaking News</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                {topic}
              </li>
            </ol>
          </nav>
          <div className="col-md-12">
            <div className="row">
              {newsData && (
                <>
                  <div className="col-md-6">
                    <h1>{newsData.title}</h1>
                    <p className="source-details">
                      By: {newsData.source}
                      <br></br>
                      {new Date(newsData.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <ul className="description-list">
                      {newsData.description
                        .split(/(?<=\.)\s+/)
                        .map((sentence, index) => (
                          <li key={index}>{sentence}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <img
                      src={newsData.image}
                      alt={newsData.title}
                      className="mt-3"
                      width={'100%'}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetTopicsById;
