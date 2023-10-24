import axios from 'axios';

export class SizesService {

    retrieve(){
        return axios.get("/sizes/retrieve/enable").then((res)=>res.data);
    }
}