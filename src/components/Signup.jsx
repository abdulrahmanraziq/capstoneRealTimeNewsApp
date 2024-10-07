import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosService from "../utils/AxioService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import Spinner from 'react-bootstrap/Spinner';


function Signup() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [mail, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const createSignUp = async () => {
    setLoading(true);
    try {
      let { message, user } = await AxiosService.post(
        ApiRoutes.SIGN_UP.path,
        { firstName, lastName, mail, mobile, password, role },
        { authenticate: ApiRoutes.SIGN_UP.auth }
      );
      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section id="login">
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="col-md-5 col-sm-12 col-xs-12">
            <Card className="p-3">
              <h3 className="text-center text-decoration-underline text-primary">
                Register Here
              </h3>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        placeholder="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        placeholder="Last name"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Form.Group className="mb-3 mt-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 mt-2">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter a Mobile Number"
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 mt-2">
                    <Form.Label>Password</Form.Label>
                    <div style={{ position: "relative" }}>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter a Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </Form.Group>

                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Open this select menu</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                  <div className="mt-4 text-end">
                    <p style={{ marginTop: "20px" }}>
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                    <Button
                      variant="primary"
                      onClick={createSignUp}
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
