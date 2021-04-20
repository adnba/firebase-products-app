import React, { Component } from "react"
import { Form, Button, Container } from "react-bootstrap"
import { getURLFromImage } from "../utils/firebaseFunctions"

class AddProduct extends Component {
  state = {
    title: "",
    description: "",
    imageFile: null,
    category: "",
    quantity: 0,
    price: 0,
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
  handleChangeImage = e => {
    const imageFile = e.target.files[0]
    this.setState({ imageFile: imageFile })
  }
  handleChangePrice = e => {
    const value = e.target.value
    this.setState({ price: value })
  }
  handleChangeCategory = e => {
    const value = e.target.value
    this.setState({ category: value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const photoURL = await getURLFromImage(this.state.imageFile)
    const newProduct = {
      title: this.state.title,
      description: this.state.description,
      image: photoURL,
      quantity: this.state.quantity,
      price: this.state.price,
      comments: [],
      category: this.state.category,
    }
    this.props.handleSubmit(newProduct, this.props.history)
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h1>Add Product</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={this.handleChangeTitle} type="text" placeholder="Enter title" required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control onChange={this.handleChangeImage} type="file" required />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control onChange={this.handleChangeDescription} as="textarea" rows={3} required />
          </Form.Group>
          <Form.Group controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control onChange={this.handleChangePrice} type="number" placeholder="Enter price" required />
          </Form.Group>
          <Form.Group controlId="formBasicQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control onChange={this.handleChangeQuantity} type="number" placeholder="Enter quantity" required />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" onChange={this.handleChangeCategory} required>
              {this.props.categories.map(category => (
                <option>{category.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Container>
    )
  }
}

export default AddProduct
