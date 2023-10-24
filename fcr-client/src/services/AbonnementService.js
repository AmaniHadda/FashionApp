import axios from "axios";

export class AbonnementService{

    fetchenabled(){
        return  axios.get("/abonnements/retrieve/enable").then((res)=>res.data);   
    }

}
