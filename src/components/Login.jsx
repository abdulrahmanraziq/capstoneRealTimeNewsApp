import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import AxiosService from "../utils/AxioService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  let [mail, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    try {
      let { message, token, role, name, email } = await AxiosService.post(
        ApiRoutes.LOGIN.path,
        { mail, password },
        { authenticate: ApiRoutes.LOGIN.auth }
      );
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("email", email);
      toast.success(message);
      navigate("/breaking-news");
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
                Welcome Back To News Break
              </h3>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div style={{ position: "relative" }}>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
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
                  <p className="mt-2">
                    Remember me{" "}
                    <Link to="/forgot-password">Forgot Password</Link>
                  </p>
                  <Button
                    variant="primary"
                    className="col-md-12"
                    onClick={handleLogin}
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
                      "Login"
                    )}
                  </Button>
                </Form>
                <p className="mt-3">
                  Don't have an account? <Link to="/signup">Register here</Link>
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
