import React, { Component } from "react"
import { Route } from "react-router-dom"

import {
  getProductsData,
  addProductData,
  editProductData,
  deleteProductById,
  addCommentData,
  getCategoriesData,
} from "./utils/firebaseFunctions"
import ProductsCards from "./components/ProductsCards"
import AddProduct from "./components/AddProduct"
import Menu from "./components/Menu"
import ViewProduct from "./components/ViewProduct"
import ModifyProduct from "./components/ModifyProduct"
import SignUp from "./components/SignUp"
import firebase from "./utils/firebase"
import Login from "./components/Login"
import ForgotPassword from "./components/ForgotPassword"

class App extends Component {
  state = {
    products: null,
    user: null,
    categories: [],
    signInError: "",
    signUpError: "",
    forgetPassError: "",
  }

  async componentDidMount() {
    const productsData = await getProductsData()
    const categoriesData = await getCategoriesData()
    this.setState({ products: productsData, categories: categoriesData })
    this.authListener()
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log("user:", user)
      if (user) {
        this.setState({ user: user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  handleAddSubmit = async (data, history) => {
    console.log("you submitted this data:", data)
    await addProductData(data)
    const productsData = await getProductsData()
    this.setState({ products: productsData }, () => {
      history.push("/")
    })
  }

  handleUpdateSubmit = async (data, id, history) => {
    console.log("you submitted this data:", data)
    await editProductData(data, id)
    const productsData = await getProductsData()
    this.setState({ products: productsData }, () => {
      history.push("/")
    })
  }

  handleDelete = async productId => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      deleteProductById(productId)
      const productsData = await getProductsData()
      this.setState({ products: productsData })
    }
  }

  handleSignUp = async (email, password, displayName, photoURL, history) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = firebase.auth().currentUser
      await user.updateProfile({
        displayName: displayName,
        photoURL: photoURL,
      })
      this.setState({ signUpError: "" }, () => {
        history.push("/")
      })
    } catch (err) {
      console.log("err signup", err)
      this.setState({ signUpError: err.code })
    }
  }

  handleLogout = () => {
    firebase.auth().signOut()
  }

  handleSignIn = async (email, password, history) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      this.setState({ signInError: "" }, () => {
        history.push("/")
      })
    } catch (err) {
      console.log("err", err)
      this.setState({ signInError: err.code })
    }
  }

  handleForgotPassword = async email => {
    try {
      console.log("forgot email:", email)
      await firebase.auth().sendPasswordResetEmail(email)
    } catch (err) {
      console.log("err", err)
      this.setState({ forgetPassError: err.code })
    }
  }

  handleAddComment = async (comment, productId, history) => {
    await addCommentData(comment, productId)
    const productsData = await getProductsData()
    this.setState({ products: productsData })
  }

  handleSignInGoogle = history => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        this.setState({ user: result.user }, () => {
          history.push("/")
        })
      })
  }

  render() {
    return (
      <>
        <Menu categories={this.state.categories} handleLogout={this.handleLogout} user={this.state.user} />
        <Route
          path="/categories/:categoryName"
          render={props => {
            if (this.state.products === null) return <h1>Loading...</h1>
            const categoryName = props.match.params.categoryName
            const filteredProducts = this.state.products.filter(
              product => product.category.toLowerCase() === categoryName.toLowerCase()
            )
            return <ProductsCards handleDelete={this.handleDelete} products={filteredProducts} />
          }}
        />
        <Route
          path="/signup"
          render={props => <SignUp {...props} errorCode={this.state.signUpError} handleSubmit={this.handleSignUp} />}
        />
        <Route
          path="/login"
          render={props => (
            <Login
              {...props}
              handleForgotPassword={this.handleForgotPassword}
              errorCode={this.state.signInError}
              handleSubmit={this.handleSignIn}
              handleSignInGoogle={this.handleSignInGoogle}
            />
          )}
        />
        <Route
          path="/forgot-password"
          render={props => (
            <ForgotPassword
              {...props}
              errorCode={this.state.forgetPassError}
              handleSubmit={this.handleForgotPassword}
            />
          )}
        />
        <Route exact path="/">
          <ProductsCards handleDelete={this.handleDelete} products={this.state.products} />
        </Route>
        <Route
          path="/add-product"
          render={props => (
            <AddProduct {...props} handleSubmit={this.handleAddSubmit} categories={this.state.categories} />
          )}
        />
        <Route
          path="/product/edit/:id"
          render={props => {
            if (this.state.products !== null) {
              const productId = props.match.params.id
              const product = this.state.products.find(el => el.id === productId)
              return <ModifyProduct {...props} product={product} handleSubmit={this.handleUpdateSubmit} />
            } else return <h1>Loading...</h1>
          }}
        />
        <Route
          exact
          path="/product/:id"
          render={props => {
            if (this.state.products !== null) {
              const productId = props.match.params.id
              const product = this.state.products.find(el => el.id === productId)
              return (
                <ViewProduct {...props} handleSubmit={this.handleAddComment} product={product} user={this.state.user} />
              )
            } else return <h1>Loading...</h1>
          }}
        />
      </>
    )
  }
}

export default App
