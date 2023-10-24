import axios from "axios";

export class HabillementService{

    fetch(){
        return  axios.get("/habillements/retrieve/enable").then((res)=>res.data);   
    }

    lastTendances(){
        return  axios.get("/filterHabillement/filterbynewest").then((res)=>res.data);   
    }

    getOne(_id){
        return  axios.get(`/habillements/retrieve/${_id}`).then((res)=>res.data);   
    }

    handleRecently(_id,data){
        return axios.put(`/habillements/recentlySeen/${_id}`,data).then((res)=>res.data);
    }

    viewRecently(){
        return axios.get(`/habillements/recently`).then((res)=>res.data);
    }

    fetchBySubcategory(subcategoryFK){
        return axios.get(`/habillements/retrieve/subcategory/${subcategoryFK}`).then((res)=>res.data);
    }
    filterBySeason(seasonFK){
        return axios.get(`/filterHabillement/filterbyseason/${seasonFK}`).then((res)=>res.data);
    }
    filterByBrand(brandFK){
        return axios.get(`/filterHabillement/filterbybrand/${brandFK}`).then((res)=>res.data);
    }
    filterBySize(size){
        return axios.get(`/filterHabillement/filterbysizes/${size}`).then((res)=>res.data);
    }
    filterByShoesSizes(shoes){
        return axios.get(`/filterHabillement/filterbyshoesizes/${shoes}`).then((res)=>res.data);
    }
    getSousImages(id){
        return axios.get(`/hbs/images/retrieve/${id}`).then((res)=>res.data);
    }
    filterBySubcategory(id){
        return axios.get(`/filterHabillement/filterbysubcategory/${id}`).then((res)=>res.data)
    }
}
