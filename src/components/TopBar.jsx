import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";
import UseLogout from "../utils/UseLogout";

function TopBar() {
  let logout = UseLogout();
  let [date, setDate] = useState("");
  let [settings, setSettings] = useState(false);
  let navigate = useNavigate();
  let { pathname } = useLocation();
  let role = sessionStorage.getItem("role");
  let name = sessionStorage.getItem("name");
  let email = sessionStorage.getItem("email");
  let links = [
    {
      label: "Breaking News",
      path: "/breaking-news",
      role: ["User", "Admin"],
    },
    {
      label: "Politics",
      path: "/politics",
      role: ["User", "Admin"],
    },
    {
      label: "Business",
      path: "/business",
      role: ["User", "Admin"],
    },
    {
      label: "Sports",
      path: "/sports",
      role: ["User", "Admin"],
    },
    {
      label: "Entertainment",
      path: "/entertainment",
      role: ["User", "Admin"],
    },
    {
      label: "Education",
      path: "/education",
      role: ["User", "Admin"],
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      role: ["User", "Admin"],
    },
    
    {
      label: "Add News",
      path: "/addNews",
      role: ["Admin"],
    },
  ];
  useEffect(() => {
    const updateDateTime = () => {
      const today = new Date();

      // Formatting options for the date
      const dateOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
      };
      const formattedDate = today.toLocaleDateString("en-US", dateOptions);
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedTime = today.toLocaleTimeString("en-US", timeOptions);

      setDate(`${formattedDate}, ${formattedTime}`);
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSettings = () => {
    setSettings(true);
  };

  const handleClose = () => {
    setSettings(false);
  }

  return (
    <>
      <header>
        <ul className="list">
          <li>{date}</li>
          <li>
          <Button variant="outline-danger" onClick={() => navigate('/subscribe')}>Subscribe to News Break</Button> {' '}
          </li>
          <li onClick={handleSettings}>
            <Button variant="outline-secondary">
              <i
                className="fa fa-cog"
                aria-hidden="true"
              ></i>
            </Button>
          </li>
        </ul>

  

        {settings && (
          <ul className="settings-page">
            <p>My Profile <i className="fa fa-times close_icon" aria-hidden="true" onClick={handleClose}></i></p>
            <hr className="horizontalLine" />
            <li>
              <i className="fa fa-user settings-icon" aria-hidden="true"></i>{" "}
              {name}
            </li>
            <li>
              <i
                className="fa fa-envelope settings-icon"
                aria-hidden="true"
              ></i>{" "}
              {email}
            </li>
            <li onClick={() => logout()}>
              <i
                className="fa fa-sign-out settings-icon"
                aria-hidden="true"
              ></i>
              Signout
            </li>
          </ul>
        )}
      </header>
      <Navbar expand="lg" className="navbar-bg-body">
        <Container>
          <Navbar.Brand className="brandLogo">
            <b>
              News <span className="text-danger">Break</span>
            </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {links
                .filter((item) => item.role.includes(role))
                .map((item, index) => {
                  return (
                    <Nav.Link
                      key={index}
                      onClick={() => navigate(item.path)}
                      className={
                        item.path === pathname ? "active" : "nav-item-link"
                      }
                    >
                      {item.label}
                    </Nav.Link>
                  );
                })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
