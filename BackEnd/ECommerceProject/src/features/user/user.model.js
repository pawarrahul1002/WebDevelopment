import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserModel{
    constructor(name,email,password,type,id)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    static async signUp(name,email,password,type){
        try{

            const db = getDB();
            const collection = db.collection("users");

            const newUser = new UserModel(name,email,password,type);
            await collection.insertOne(newUser);
            return newUser;

        }catch(err)
        {
            throw new ApplicationError("Something went wrong",500,err);
        }

        // users.push(newUser);
    }

    // static signIn(email, password){
    //     console.log(email, password);
    //     for(let i=0; i<users.length; i++)
    //     { 
    //         console.log(users[i].email , users[i].password);
    //         if(users[i].email == email && users[i].password==password)
    //         {
    //             return users[i];
    //         }
    //     }
    //     // const user = users.find((u)=>u.email==email && u.password==password);

    //     // return user;
    // }

    static getAll(){
        return users;
    }
}

let users =[
    {
        "id":1,
        "name":"n1",
        "email":"n1@gmail.com",
        "password":"123",
        "type":"seller"
    },
    {
        "id":2,
        "name":"n2",
        "email":"n2@gmail.com",
        "password":"1234",
        "type":"customer"
    }
]