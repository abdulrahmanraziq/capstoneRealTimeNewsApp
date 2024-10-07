import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import AxiosService from "../utils/AxioService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
const allowedExtensions = ["png", "jpg", "jpeg"];
function AddNews() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");
  let [topic, setTopics] = useState("");
  let [source, setSource] = useState("");
  let [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const validateExtension = (name) => {
    const extension = name.split(".")[name.split(".").length - 1];
    return allowedExtensions.includes(extension);
  };

  const selectFile = (event) => {
    //const selectedFile = event.target.files[0];
    setImage(event.target.files[0])
    // if (validateExtension(selectedFile.name)) {
    //   let reader = new FileReader();

    //   reader.readAsDataURL(selectedFile);

    //   reader.onload = () => {
    //     setImage(reader.result);
    //   };
    // } else {
    //   toast.error(
    //     `Only File Type of ${allowedExtensions.join(",")} are allowed`
    //   );
    // }
  };
  const handleAddNews = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'news_app');
    const response = await axios.post('https://api.cloudinary.com/v1_1/dyl0reuky/image/upload', formData);
    const cloudinaryUrl = response.data.url;

    let payload = {
      title,
      description,
      image:cloudinaryUrl,
      topic,
      source
    }
    let email = sessionStorage.getItem("email");
    try {
      let { message } = await AxiosService.post(ApiRoutes.CREATE_NEWS.path, payload, {authenticate: ApiRoutes.CREATE_NEWS.auth});
      toast.success(message);
      navigate('/breaking-news')
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    } finally {
      await AxiosService.post(ApiRoutes.SUBSCRIBED_NEWS.path, {payload}, {authenticate: ApiRoutes.SUBSCRIBED_NEWS.auth})
      setLoading(false);
    }
  };
  return (
    <section className="add_news">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <Card>
              <Card.Body>
                <Card.Title className="text-center text-primary">
                  <h3>Add News</h3>
                </Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Enter Image"
                      onChange={selectFile}
                    />
                  </Form.Group>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setTopics(e.target.value)}
                  >
                    <option>Select Topics</option>
                    <option value="politics">Politics</option>
                    <option value="business">Business</option>
                    <option value="sports">Sports</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="education">Education</option>
                  </Form.Select>
                  <Form.Group className="mb-3">
                    <Form.Label>Source</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Source Details"
                      onChange={(e) => setSource(e.target.value)}
                    />
                  </Form.Group>
                  <Button 
                  variant="primary" 
                  onClick={handleAddNews}
                  disabled={loading}>
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Add News"
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddNews;
