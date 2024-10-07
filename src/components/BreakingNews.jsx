import React, { useState, useEffect } from "react";
import AxiosService from "../utils/AxioService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PrivacyPolicy from "./PrivacyPolicy";
import { useNavigate } from "react-router-dom";

function BreakingNews() {
  let [newsData, getNewsData] = useState([]);
  let navigate = useNavigate();
  const getData = async () => {
    try {
      let { message, news } = await AxiosService.get(
        ApiRoutes.GET_BREAKING_NEWS.path,
        { authenticate: ApiRoutes.GET_BREAKING_NEWS.auth }
      );
      toast.success(message);
      getNewsData(news);
    } catch (err) {
      toast.error(err.message || "Internal Server Error");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <section>
      <div className="container">
        <div className="row">
          <h4 className="text-center">TODAY’S TOP STORIES</h4>
          <div className="col-md-8">
            {newsData
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
              .map((item, index) => {
                return (
                  <div key={item._id} className="row dotted-border-bottom mt-2">
                    <h5
                      className="text-hover"
                      onClick={() => navigate(`/${item.topic}/${item._id}`)}
                    >
                      {item.title}
                    </h5>
                    <div className="row">
                      <div className="col-md-9">
                        <p className="text-paragraph">
                          {item.description.split(" ").slice(0, 20).join(" ")}
                          ...
                          <br></br>
                          <Button
                            size="sm"
                            className="mt-2"
                            variant="outline-secondary"
                            onClick={() =>
                              navigate(`/${item.topic}/${item._id}`)
                            }
                          >
                            Read More
                          </Button>
                        </p>
                      </div>
                      <div className="col-md-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          width={"200px"}
                          className="rounded"
                        />
                      </div>
                    </div>
                    <p className="text-hover">
                      <i className="fa fa-user icon" aria-hidden="true"></i>
                      {item.source}
                    </p>
                    <p className="text-hover">
                      <i className="fa fa-clock-o icon" aria-hidden="true"></i>
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
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
            <PrivacyPolicy />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BreakingNews;
