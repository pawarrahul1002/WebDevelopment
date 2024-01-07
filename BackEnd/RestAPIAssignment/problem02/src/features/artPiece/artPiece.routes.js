import express from "express";
import ArtPieceController from "./artPiece.controller.js";


const router = express.Router();
const artPieceController = new ArtPieceController();
// TODO: require your artPiecesController here
// retrieve all art pieces in the collection
router.get("/",artPieceController.getAllArtPieces);
router.post("/",artPieceController.addNewArtPieces);
router.get("/:id",artPieceController.getArtPieceById);
router.put("/:id",artPieceController.updateArtPieceById);
router.delete("/:id",artPieceController.deleteArtPieceById);



// TODO: Implement your artPieces routes here

export default router;

// Implement an endpoint at '/api/artPieces' to retrieve all art pieces in the collection.
// Implement an endpoint at '/api/artPieces/:id' to retrieve a specific art piece by its id.
// Implement an endpoint at '/api/artPieces/:id' to update any details of a specific art piece.
// Implement an endpoint at '/api/artPieces/:id' to delete a specific art piece from the collection.