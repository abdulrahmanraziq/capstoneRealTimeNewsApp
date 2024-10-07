import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import AxiosService from "../utils/AxioService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Card from "react-bootstrap/Card";

function Resetpassword() {
  let [OTP, setOtp] = useState("");
  let [password, setPassword] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const resetPassword = async () => {
    try {
      let { message } = await AxiosService.post(
        ApiRoutes.RESET_PASSWORD.path,
        { OTP, password },
        { authenticate: ApiRoutes.RESET_PASSWORD.auth }
      );
      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section id="signUp">
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="col-md-4 usersignup">
            <Card className="p-3">
              <h3 className="text-center">Reset Password</h3>
              <p className="text-center">Enter the OTP and set a new password.</p>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3 mt-2">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your OTP"
                      onChange={(e) => setOtp(+e.target.value)}
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
                  <div className="mt-4 text-end">
                    <Button variant="primary" onClick={resetPassword}>
                      Submit
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

export default Resetpassword;
