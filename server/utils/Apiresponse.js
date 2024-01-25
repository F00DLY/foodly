class Apiresponse {
    constructor(statusCode,data,message ="Success"){
this.data=data
this.statusCode=statusCode
this.message=message
this.sucess=statusCode <400
    }
}

export {Apiresponse}