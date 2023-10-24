import axios from "axios";

export class SubCategoriesService{

    fetch(){
       return axios.get("/subcategories/retrieve/enable").then((res)=>res.data);
        
    }
}
