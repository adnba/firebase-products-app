import React, { Component } from "react"
import { Form, Button, Container } from "react-bootstrap"

class AddComment extends Component {
  state = {
    title: "",
    body: "",
    rating: 0,
  }

  handleChangeTitle = e => {
    const value = e.target.value
    this.setState({ title: value })
  }
  handleChangeBody = e => {
    const value = e.target.value
    this.setState({ body: value })
  }
  handleChangeRating = e => {
    const value = e.target.value
    this.setState({ rating: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.state, this.props.productId, this.props.history)
  }

  render() {
    if (this.props.user === null)
      return (
        <Container className="mt-5">
          <h1>Add a Review</h1>
          <p>Please login or sign up to add a review</p>
        </Container>
      )
    else
      return (
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <h1>Add a Review</h1>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control onChange={this.handleChangeTitle} type="text" placeholder="Enter title" required />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Body</Form.Label>
              <Form.Control
                onChange={this.handleChangeBody}
                as="textarea"
                placeholder="Enter comment here"
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPrice">
              <Form.Label>Rating</Form.Label>
              <Form.Control onChange={this.handleChangeRating} type="number" placeholder="Enter rating" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Review
            </Button>
          </Form>
        </Container>
      )
  }
}

export default AddComment
