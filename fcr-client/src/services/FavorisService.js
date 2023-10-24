import axios from 'axios';

export class FavorisService {


   
    retrieveByUser(id){
        return axios.get(`/favoris/retrieve/${id}`).then((res)=>res.data);
    }
    deleteByUser(id){
        return axios.delete(`/favoris/delete/${id}`).then((res)=>res.data);
    }

    
}