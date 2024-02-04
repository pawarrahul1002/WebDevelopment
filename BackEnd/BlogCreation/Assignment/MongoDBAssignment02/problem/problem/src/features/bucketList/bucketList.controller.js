import BucketListModel from "./bucketList.model.js";

import BucketListRepository from "./bucketList.repository.js"
export default class BucketListController {

  constructor( )
  {
    this.bucketListRepository = new BucketListRepository();
  }

  add = async (req, res) => {
    try{
      const { title, description, dateAdded, targetDate, isCompleted } = req.body;
      // Refactor to use the repository method
      const newItem = new BucketListModel(
        title,
        description,
        dateAdded,
        targetDate,
        isCompleted
      );
  
        // console.log("BucketListModel",newItem);
  
      const item = await this.bucketListRepository.addBucketListItem(newItem);

  
      res.status(201).send(item);
    }catch(error)
    {
      console.log(error);
      res.status(500).send("something went wrong");
    }
  };

  get = async (req, res) => {
    try{    
      const { title } = req.query;
    // Refactor to use the repository method
    
    const item = await this.bucketListRepository.findOneBucketListItem(title);

    if (!item) {
      res.status(200).send("Item not found.");
    } else {
      res.status(200).send(item);
    }

    }catch(error){
      res.status(500).send("something went wrong");
    }
  };
}
