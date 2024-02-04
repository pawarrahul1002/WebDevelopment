import { getDB } from "../../config/mongodb.js";

class BucketListRepository {
  async addBucketListItem(bucketListItem) {
    const db = getDB();
    try {
      const newItem = await db.collection("bucketListItems").insertOne(bucketListItem);
      return newItem;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add bucket list item");
    }
  }

  async findOneBucketListItem(title) {
    const db = getDB();
    try {
      const item = await db.collection("bucketListItems").findOne({ title });
      return item;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to find bucket list item");
    }
  }
}

export default BucketListRepository;



// // Please don't change the pre-written code

// import { getDB } from "../../config/mongodb.js";

// // Import the necessary modules here
// class BucketListRepository {
//   async addBucketListItem(bucketListItem) {
//     // Write your code here    const db = getDB();
//     try {
//       const newItem = await getDB
//         // .collection("bucketListItems")
//         .insertOne(bucketListItem);

//       return newItem;
//     } catch (error) {
//       // throw new Error("something went wrong",500);
//       console.log(error);
//     }
//   }

//   async findOneBucketListItem(title) {
//     // Write your code here    const db = getDB();

//     try {
//       const item = await getDB.collection("bucketListItems").findOne({ title });    

//       return item;
//     } catch (error) {
//       throw new Error("something went wrong",500);
//     }
//   }
// }

// export default BucketListRepository;
