import firebase from "./firebase"

export const getProductsData = async () => {
  const products = await firebase.database().ref("products").once("value")
  const productsData = products.val()

  console.log(productsData)
  const productsArray = []
  for (let key in productsData) {
    productsArray.push({ ...productsData[key], id: key })
  }
  console.log(productsArray)
  return productsArray
}

export const addProductData = async data => {
  await firebase
    .database()
    .ref("products")
    .push({
      ...data,
      quantity: Number(data.quantity),
      price: Number(data.price),
    })
}

export const getProductDataById = async id => {
  const product = await firebase
    .database()
    .ref("products/" + id)
    .once("value")
  const productData = product.val()
  return {
    ...productData,
    id: product.key,
  }
}

export const editProductData = async (data, id) => {
  await firebase
    .database()
    .ref("products/" + id)
    .update({
      ...data,
      quantity: Number(data.quantity),
      price: Number(data.price),
    })
}

export const deleteProductById = async id => {
  await firebase
    .database()
    .ref("products/" + id)
    .remove()
}

export const getURLFromImage = async imageFile => {
  const imageRef = firebase.storage().ref("images").child(imageFile.name)
  await imageRef.put(imageFile)
  const imageURL = await imageRef.getDownloadURL()
  return imageURL
}

export const addCommentData = async (comment, id) => {
  const user = firebase.auth().currentUser
  const product = await getProductDataById(id)
  const finalComment = {
    ...comment,
    userId: user.uid,
    userName: user.displayName,
    userAvatar: user.photoURL,
  }
  const oldComments = product.comments ? product.comments : []
  await firebase
    .database()
    .ref("products/" + id)
    .update({
      comments: [...oldComments, finalComment],
    })
}

export const getCategoriesData = async () => {
  const categories = await firebase.database().ref("categories").once("value")
  const categoriesData = categories.val()
  return categoriesData
}
