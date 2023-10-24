import axios from "axios";

export class SeasonService{

    fetch(){
        return  axios.get("/seasons/retrieve/enable").then((res)=>res.data);
        
    }


}
