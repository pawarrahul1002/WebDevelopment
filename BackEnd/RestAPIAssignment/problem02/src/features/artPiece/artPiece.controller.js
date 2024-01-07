// TODO: require your ArtPiece model here
import ArtPiece from "./artPiece.model.js";

// TODO: Implement your artPieces controller functions here

export default class ArtPieceController {

  getAllArtPieces = (req, res) => {
    
    const result = ArtPiece.getAll();
    res.status(200).send(result);
    // res.send("getAllArtPieces");
  };

  addNewArtPieces = (req, res) => {
   
    // console.log("req.body",req.body);
    const result = ArtPiece.addNew(req.body);
    res.status(200).send(result);
  };

  getArtPieceById = (req, res) => {
    const id = req.params.id;
    const result = ArtPiece.getById(id);
    if(result)
    {
        res.status(200).send(result);
    }
    else{
        res.status(404).send("Data Not Found");
    }
  };

  updateArtPieceById = (req, res) => {
    const result = ArtPiece.updateById(req.params.id,req.body);
    if(result)
    {
        res.status(201).send(result);
    }
    else{
        res.status(404).send("data not found");
    }
        
  };

  deleteArtPieceById = (req, res) => {
    const result = ArtPiece.deleteById(req.params.id);
    if(result)
    {
        res.status(201).send(result);
    }
    else{
        res.status(404).send("Data not found");
    }
    // res.send("deleteArtPieceById");
  };
}
