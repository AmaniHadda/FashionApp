import axios from 'axios';

export class ShoeSizeService {

    retrieve(){
        return axios.get("/shoesize/retrieve").then((res)=>res.data);
    }
}