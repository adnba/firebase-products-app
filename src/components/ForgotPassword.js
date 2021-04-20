import React, { Component } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"

class ForgotPassword extends Component {
  state = {
    email: "",
  }

  handleChangeEmail = e => {
    const value = e.target.value
    this.setState({ email: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.state.email, this.props.history)
  }

  render() {
    let errorMsg = ""
    if (this.props.errorCode === "auth/user-not-found") {
      errorMsg = "User not found."
    }
    console.log("signin props:", this.props)
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} className="mt-5">
          <h1 className="mb-4">Reset Password</h1>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={this.handleChangeEmail} type="email" placeholder="Enter email" required />
          </Form.Group>
          {this.props.errorCode ? <Alert variant="danger">{errorMsg}</Alert> : null}
          <Button variant="primary" type="submit" className="mt-5">
            Send Reset Password Link
          </Button>
        </Form>
      </Container>
    )
  }
}

export default ForgotPassword
