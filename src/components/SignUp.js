import React, { Component } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { getURLFromImage } from "../utils/firebaseFunctions"

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    passwordAgain: "",
    name: "",
    imageFile: null,
    passwordAgainError: false,
  }

  handleChangeName = e => {
    const value = e.target.value
    this.setState({ name: value })
  }

  handleChangeImage = async e => {
    const imageFile = e.target.files[0]
    console.log(imageFile)
    this.setState({ imageFile: imageFile })
  }

  handleChangeEmail = e => {
    const value = e.target.value
    this.setState({ email: value })
  }
  handleChangePassword = e => {
    const value = e.target.value
    this.setState({ password: value })
  }
  handleChangePasswordAgain = e => {
    const value = e.target.value
    this.setState({ passwordAgain: value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    if (this.state.password === this.state.passwordAgain) {
      this.setState({ passwordAgainError: false })
      const photoURL = await getURLFromImage(this.state.imageFile)
      this.props.handleSubmit(this.state.email, this.state.password, this.state.name, photoURL, this.props.history)
    } else {
      this.setState({ passwordAgainError: true })
    }
  }

  render() {
    console.log("signup props:", this.props)
    let errorMsg = null
    if (this.state.passwordAgainError) {
      errorMsg = <Alert variant="danger">Password confirmation is not the same.</Alert>
    } else if (this.props.errorCode === "auth/email-already-in-use") {
      errorMsg = <Alert variant="danger">Email Taken.</Alert>
    } else if (this.props.errorCode === "auth/weak-password") {
      errorMsg = <Alert variant="danger">Password should be at least 6 characters.</Alert>
    }
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} className="mt-5">
          <h1 className="mb-4">Sign up</h1>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={this.handleChangeName} type="text" placeholder="Enter name" required />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={this.handleChangeEmail} type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={this.handleChangePassword} type="password" placeholder="Enter password" required />
          </Form.Group>
          <Form.Group controlId="formBasicPrice">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              onChange={this.handleChangePasswordAgain}
              type="password"
              placeholder="Enter password again"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhoto">
            <Form.Label>Image</Form.Label>
            <Form.Control onChange={this.handleChangeImage} type="file" required />
          </Form.Group>
          {errorMsg}
          <Button variant="primary" type="submit" className="mt-5">
            Sing Up
          </Button>
        </Form>
      </Container>
    )
  }
}

export default SignUp
