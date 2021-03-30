class httpException extends Error {     //httpException kế thừa Error để chứa các lỗi xảy ra.
    public status: number;              //các số REST APi.
    public message: string;

    constructor(status: number, message: string){
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default httpException;