import React, { Component } from "react"
import { ListGroup, Image, Card } from "react-bootstrap"

import AddComment from "./AddComment"

export default class ViewProduct extends Component {
  render() {
    return (
      <div>
        <div className="d-flex justify-content-around align-items-start">
          <div>
            <h2 className="my-4">Product info</h2>
            <ListGroup>
              <Image src={this.props.product.image} style={{ maxWidth: "60vh" }} />
              <ListGroup.Item>
                <strong>Title:</strong>
                <span>{this.props.product.title}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong>
                <span>{this.props.product.description}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Quantity:</strong>
                <span>{this.props.product.quantity}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price:</strong>
                <span>{this.props.product.price}</span>
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div className="my-4">
            <h2>Reviews</h2>
            <div style={{ scrollBehavior: "smooth", maxHeight: 600, overflowY: "scroll", padding: 20 }}>
              {this.props.product.comments ? (
                this.props.product.comments.map(comment => (
                  <Card style={{ width: "18rem" }} className="mb-4">
                    <Card.Header>{comment.userName}</Card.Header>
                    <Card.Body>
                      <Card.Title>{comment.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Rating: {comment.rating} stars</Card.Subtitle>
                      <Card.Text>{comment.body}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No reviews yet</p>
              )}
            </div>
          </div>
        </div>
        <AddComment
          handleSubmit={this.props.handleSubmit}
          user={this.props.user}
          history={this.props.history}
          productId={this.props.product.id}
        />
      </div>
    )
  }
}
