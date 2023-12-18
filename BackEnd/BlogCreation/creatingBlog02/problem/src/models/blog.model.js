export default class BlogModel {

  constructor(_title, _desc, _img) {
    this.title = _title;
    this.description = _desc;
    this.img = _img;
  }

  static getAll() {
    return blogs;
  }

  static add(blogBody) {
    let newBlog = new BlogModel(blogBody.title, blogBody.description, blogBody.img);
    blogs.push(newBlog);
    // console.log("NEW", blogs);
  }

}


let blogs = [
  new BlogModel(
    "Apple",

    "Apple Inc. (formerly Apple Computer Inc.) is an American computer and consumer electronics company famous for creating the iPhone, iPad and Macintosh computers. Apple is one of the largest companies globally with a market cap of over 2 trillion dollars.",
    "https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-icon-16.png",
  ),
];
