export default class ArtPiece {
  constructor(id, title, artist, year, imageUrl) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.imageUrl = imageUrl;
  }

  static addNew(obj) {
    const newId = artPieces.length + 1;
    // console.log("newId",obj);
    const newArtPiece = new ArtPiece(
      newId,
      obj.title,
      obj.artist,
      obj.year,
      obj.imageUrl
    );
    artPieces.push(newArtPiece);
    return newArtPiece;
  }

  static getAll() {
    // console.log(artPieces);
    return artPieces;
  }

  static getById(id) {
    return artPieces.find((a) => a.id == id);
  }

  static updateById(id, objParam) {
    const index = artPieces.findIndex((a) =>a.id == id);
    if (index!=-1) {
      artPieces[index].title = objParam.title;
      artPieces[index].artist = objParam.artist;
      artPieces[index].year = objParam.year;
      artPieces[index].imageUrl = objParam.imageUrl;
      return artPieces[index];
    }
  } 
 
  static deleteById(id) {
    const index = artPieces.findIndex((a) => a.id == id);
    if (index !== -1) {
      return artPieces.splice(index, 1)[0];
    }
  }

  // TODO: Implement your ArtPiece model methods here
}
const artPieces = [
  new ArtPiece(
    1,
    "title1",
    "p1",
    "1",
    "https://media.istockphoto.com/id/1277767891/photo1"
  ),
  new ArtPiece(
    2,
    "title2",
    "q2",
    "2",
    "https://media.istockphoto.com/id/1277767891/photo2"
  ),
  new ArtPiece(
    3,
    "title3",
    "q3",
    "3",
    "https://media.istockphoto.com/id/1277767891/photo3"
  ),
  new ArtPiece(
    4,
    "title4",
    "q4",
    "4",
    "https://media.istockphoto.com/id/1277767891/photo4"
  ),
  new ArtPiece(
    5,
    "title5",
    "q5",
    "5",
    "https://media.istockphoto.com/id/1277767891/photo5"
  ),
  new ArtPiece(
    6,
    "title6",
    "q6",
    "6",
    "https://media.istockphoto.com/id/1277767891/photo6"
  ),
];
