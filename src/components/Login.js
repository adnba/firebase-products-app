import React, { Component } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import GoogleIcon from "../assets/img/Google.svg"

class Login extends Component {
  state = {
    email: "",
    password: "",
  }

  handleChangeEmail = e => {
    const value = e.target.value
    this.setState({ email: value })
  }
  handleChangePassword = e => {
    const value = e.target.value
    this.setState({ password: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.state.email, this.state.password, this.props.history)
  }

  handleSignInGoogle = e => {
    e.preventDefault()
    this.props.handleSignInGoogle(this.props.history)
  }

  render() {
    let errorMsg = ""
    if (this.props.errorCode === "auth/user-not-found") {
      errorMsg = "User not found."
    } else if (this.props.errorCode === "auth/wrong-password") {
      errorMsg = "Wrong password."
    }
    console.log("signin props:", this.props)
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} className="mt-5">
          <h1 className="mb-4">Sign in</h1>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={this.handleChangeEmail} type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={this.handleChangePassword} type="password" placeholder="Enter password" required />
          </Form.Group>
          {this.props.errorCode ? <Alert variant="danger">{errorMsg}</Alert> : null}
          <Button onClick={this.handleSignInGoogle} className="mt-3 text-white">
            <img src={GoogleIcon} alt="google logo" width={30} />
            <span className="ml-3">Sign in with Google</span>
          </Button>
          <div className="d-flex align-items-end">
            <Button variant="primary" type="submit" className="mt-5">
              Sign in
            </Button>
            <Link className="nav-link" to="/forgot-password">
              Forgot Password
            </Link>
          </div>
        </Form>
      </Container>
    )
  }
}

export default Login
