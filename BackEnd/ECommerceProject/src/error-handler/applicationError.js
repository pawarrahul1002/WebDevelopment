export class ApplicationError extends Error{
    constructor(message,code,err)
    {
        super(message);
        this.code = code;
        if(err)
        this.err = err.message;
    }
}