export default class ProductModel {

  constructor(_id, _name, _desc, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.price = _price;
    this.imageUrl = _imageUrl
  }
  static get() {
    return products;
  }

  static add(prodObj) {
    let newProduct = new ProductModel(products.length + 1, prodObj.name, prodObj.desc, prodObj.price, prodObj.imageUrl);
    products.push(newProduct);
    return products;
  }

  static getById(id) {
    return products.find((p) => p.id == id);
  }

  static updateProduct(prodObj) {
    console.log(prodObj);
    let index = products.findIndex((p) => p.id == prodObj.id);
    products[index] = prodObj;
  }

  static deleteProduct(prodObj) {
    console.log(prodObj);
    let index = products.findIndex((p) => p.id == prodObj.id);
    console.log(index);

    if (index !== -1) {
      // Check if the index is valid (product found)
      products.splice(index, 1); // Use splice to remove the element at the specified index
      // console.log("deleteProduct", products);
    } else {
      console.error("Product not found"); // Log an error if the product is not found
    }
  }


  static getAll() {
    return products;
  }

}

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
  ),
]