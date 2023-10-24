import axios from 'axios';

export class NewsletterService{

    subscribe(data){
        return axios.post('/subscribe/addSubscriber',data).then((res)=>res.data);
    }
}