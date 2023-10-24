import axios from "axios";

export class BrandService{

    fetch(){
        return  axios.get("/brands/retrieve/enable").then((res)=>res.data);
        
    }
}
