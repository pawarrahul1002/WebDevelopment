export class UserModel{
    constructor(id,name,email,password,type)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id;
    }

    static signUp(name,email,password,type){
        const newUser = new UserModel(users.length+1,name,email,password,type);
        users.push(newUser);
        return newUser;
    }

    static signIn(email, password){
        console.log(email, password);
        for(let i=0; i<users.length; i++)
        { 
            console.log(users[i].email , users[i].password);
            if(users[i].email == email && users[i].password==password)
            {
                return users[i];
            }
        }
        // const user = users.find((u)=>u.email==email && u.password==password);

        // return user;
    }

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
    }
]