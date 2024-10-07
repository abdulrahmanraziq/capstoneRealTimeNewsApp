import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import AxiosService from "../utils/AxioService";
import ApiRoutes from "../utils/ApiRoutes";

function Subscription() {
  const initialDropdownItems = [
    { title: "Latest Breaking News", subscribed: false },
    { title: "Politics", subscribed: false },
    { title: "Business", subscribed: false },
    { title: "Sports", subscribed: false },
    { title: "Entertainment", subscribed: false },
    { title: "Education", subscribed: false },
  ];

  const [dropdownItems, setDropdownItems] = useState(initialDropdownItems);
  const [topic, setSelectedTopic] = useState("");
  const [email, setEmail] = useState("");

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleSubscriptionToggle = async () => {
    setDropdownItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.title === topic) {
          const newSubscribedStatus = !item.subscribed;
          return { ...item, subscribed: newSubscribedStatus };
        }
        return item;
      });
    });

    // Show appropriate toast message after state update
    const selectedItem = dropdownItems.find((item) => item.title === topic);
    if (selectedItem) {

      if (!selectedItem?.subscribed) {
        let response = await AxiosService.post(
          ApiRoutes.SUBSCRIBED_TOPIC.path,
          { email, topic, subscribed: true }
        );
        toast.success(`You Have Subscribed to the Topic ${topic}`);
      } else {
        let response = await AxiosService.post(
          ApiRoutes.SUBSCRIBED_TOPIC.path,
          { email, topic, subscribed: false }
        );
        toast.success(`You Have Unsubscribed from the Topic ${topic}`);
      }
    }
  };
  return (
    <>
      <section className="add_news">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <Card className="bg-info subscription-info">
                <Card.Body>
                  <Card.Title className="text-center">
                    Subscribe To News Break
                  </Card.Title>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Select
                      aria-label="Default select example"
                      value={topic}
                      onChange={handleTopicChange}
                    >
                      <option value="">Select The Topic To Subscribe</option>
                      {dropdownItems.map((item, index) => (
                        <option key={index} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                    </Form.Select>
                    <Button
                      variant="danger"
                      className="mt-5"
                      onClick={handleSubscriptionToggle}
                      disabled={!topic} // Disable if no topic is selected
                    >
                      {dropdownItems.find((item) => item.title === topic)
                        ?.subscribed
                        ? "Unsubscribe to News Break"
                        : "Subscribe to News Break"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Subscription;
