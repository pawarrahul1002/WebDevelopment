// export default works with
// 1 class
// 2 assignment Expression
// 3 hoisted declared function



const validateNewItem = (req,res,next)=>{
    // validate data
    const{name,price,imageUrl} = req.body;
    let errors=[];
    if(!name || name.trim()=='')
    {
        errors.push("Name is empty");
    }
    
    if(!price || parseFloat(price)<1)
    {
        errors.push("Price must be positive value");
    }

    try{
        const validUrl = new URL(imageUrl);
    }
    catch(err)
    {
        errors.push("URL is invalid");
    }

    if(errors.length>0)
    {
        console.log(errors[0]);
        return res.render("new-product",{errorMessage:errors[0]})
    }
    next();
}

export default validateNewItem;
