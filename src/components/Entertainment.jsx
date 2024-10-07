import React, { useEffect } from "react";
import { useState } from "react";
import AxiosService from "../utils/AxioService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';
import PrivacyPolicy from './PrivacyPolicy';
import Button from 'react-bootstrap/Button';

function Entertainment() {
  let title = "entertainment";
  let [entertainment, setEntertainment] = useState([]);
  let navigate = useNavigate();

  const getEntertainment = async () => {
    try {
      let { message, news } = await AxiosService.get(
        `${ApiRoutes.GET_NEWS_BY_TOPIC.path}/${title}`,
        { authenticate: ApiRoutes.GET_NEWS_BY_TOPIC.auth }
      );
      toast.success(message);
      setEntertainment(news);
    } catch (error) {
        toast.error(error.message || 'Internal Server Error');
    }
  };
  useEffect(() => {
    getEntertainment();
  }, []);
  return (
    <section>
      <div className="container">
        <div className="row">
          <h4 className="text-center">SPORTS STORIES</h4>
          <div className="col-md-8">
            {entertainment?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item, index) => {
              return (
                <div key={item._id} className="row dotted-border-bottom mt-2">
                  <h5 className="text-hover" onClick={() => navigate(`/${item.topic}/${item._id}`)}>{item.title}</h5>
                  <div className="row">
                    <div className="col-md-9">
                      <p className="text-paragraph">
                        {item.description.split(" ").slice(0, 20).join(" ")}...<br></br>
                        <Button size="sm" className="mt-2" variant="outline-secondary" onClick={() => navigate(`/${item.topic}/${item._id}`)}>Read More</Button>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <img src={item.image} alt={item.title} width={"200px"} className="rounded"/>
                    </div>
                  </div>
                  <p className="text-hover"><i className="fa fa-user icon" aria-hidden="true"></i>
                  {item.source}</p>
                  <p className="text-hover"><i className="fa fa-clock-o icon" aria-hidden="true"></i>{new Date(item.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <PrivacyPolicy/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Entertainment;
