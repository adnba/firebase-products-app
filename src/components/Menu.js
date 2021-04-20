import React from "react"
import { Navbar, Nav, Image, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import GoogleIcon from "../assets/img/Google.svg"

export default function Menu(props) {
  const handleLogout = () => {
    console.log("you want to logout")
    props.handleLogout()
  }

  return (
    <Navbar bg="light" expand="lg">
      <Link className="navbar-brand" to="/">
        <img src={GoogleIcon} width={50} alt="React Bootstrap logo" />
        <span className="ml-2">Products App</span>
      </Link>
      <Navbar.Brand></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/add-product">
            Add Product
          </Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            {props.categories.map(category => (
              <Link className="dropdown-item" to={"/categories/" + category.name}>
                {category.name}
              </Link>
            ))}
          </NavDropdown>
        </Nav>
        <Nav className="ms-auto">
          {props.user ? (
            <>
              <Nav.Item>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav.Item>
              <Image src={props.user.photoURL} roundedCircle width={35} />
              <Navbar.Text>Hello {props.user.displayName}</Navbar.Text>
            </>
          ) : (
            <>
              <Link className="nav-link mr-sm-2" to="/login">
                Login
              </Link>
              <Link className="nav-link mr-sm-2" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
