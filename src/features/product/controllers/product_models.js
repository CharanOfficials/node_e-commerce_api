class ProductModel{
  // Mapping of the class object
    constructor(id, name, desc, imageUrl, category, price, sizes) {
        this.id = id,
        this.name = name,
        this.desc = desc,
        this.imageUrl = imageUrl,
        this.category = category,
        this.price = price,
        this.sizes = sizes
  }
  // Add a new received product after adding the id
  static add(product) {
    product.id = products.length + 1; // having the issue on deletion
    products.push(product)
    return product
  }
  // get one product
  static get(id) {
    const product = products.find((i) => i.id == id)
    return product;
  }
// Get all products
  static GetAll() {
      return products
  }
  static filter(minPrice, maxPrice, category){
    const result = products.filter((product) => {
      return (
        product.price >= minPrice &&
        product.price <= maxPrice &&
        product.category == category
      )
    })
    return result
  }
}

// Data to be send back and this act as a DB
var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'Cateogory1',
        19.99,
        ['M', 'XL']
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'Cateogory2',
      29.99,
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'Cateogory3',
      39.99,
      ['M', 'XL','S']
    )];

export default ProductModel