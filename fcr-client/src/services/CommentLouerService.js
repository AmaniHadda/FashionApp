import axios from "axios";

export class CommentLouerService{

    fetch(){
        return  axios.get("/commentlouer/get/web/enable").then((res)=>res.data);
        
    }
}
