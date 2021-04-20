import React, { Component } from "react"
import { Form, Button, Container } from "react-bootstrap"

class ModifyProduct extends Component {
  state = {
    title: this.props.product.title,
    description: this.props.product.description,
    image: this.props.product.image,
    quantity: this.props.product.quantity,
    price: this.props.product.price,
  }

  handleChangeTitle = e => {
    const value = e.target.value
    this.setState({ title: value })
  }
  handleChangeDescription = e => {
    const value = e.target.value
    this.setState({ description: value })
  }
  handleChangeQuantity = e => {
    const value = e.target.value
    this.setState({ quantity: value })
  }
  handleChangeURL = e => {
    const value = e.target.value
    this.setState({ image: value })
  }
  handleChangePrice = e => {
    const value = e.target.value
    this.setState({ price: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.state, this.props.product.id, this.props.history)
  }

  render() {
    console.log("modify props", this.props)

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h1>Modify Product</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={this.handleChangeTitle}
              value={this.state.title}
              type="text"
              placeholder="Enter title"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              onChange={this.handleChangeURL}
              value={this.state.image}
              type="url"
              placeholder="Enter Image URL"
              required
            />
            <Form.Text className="text-muted">
              Please put a valid image URL: example: https://imgs.com/1234.png
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={this.handleChangeDescription}
              value={this.state.description}
              as="textarea"
              rows={3}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={this.handleChangePrice}
              value={this.state.price}
              type="number"
              placeholder="Enter price"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              onChange={this.handleChangeQuantity}
              value={this.state.quantity}
              type="number"
              placeholder="Enter quantity"
              required
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    )
  }
}

export default ModifyProduct
