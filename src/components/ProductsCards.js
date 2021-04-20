import React from "react"
import { Card, Button, CardColumns, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function ProductsCards(props) {
  let output
  if (props.products === null) {
    output = <h2>Loading...</h2>
  } else {
    output = props.products.map(product => (
      <Card key={product.title} style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.image} thumbnail="true" />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>

          <Link className="btn btn-primary" to={"/product/" + product.id}>
            View
          </Link>
          <Link className="btn btn-success" to={"/product/edit/" + product.id}>
            Modify
          </Link>
          <Button variant="danger" onClick={() => props.handleDelete(product.id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    ))
  }

  return (
    <Container>
      <h1>My Products</h1>
      <CardColumns>{output}</CardColumns>
    </Container>
  )
}
