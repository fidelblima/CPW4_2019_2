import axios from 'axios';
import * as serviceConfig from '../services/ServiceConfig';


export default class ListaService {

    constructor() {
        this.anime = [];
        this.api = axios.create({
            baseURL: 'https://api.jikan.moe/v3/search/anime?q='
        });
    }
						 
    recuperarAnime(anime) { 
        let resposta = this.api.get(anime.nome)
        this.anime = resposta.data;
        return this.anime;
        
    }

    async  pesquisarAnime(consultar) {
        consultar = consultar.toLowerCase().trim();
        const urlPesquisa =
            `${serviceConfig.URL_API}` +
           
            `&q=${consultar}` +
            `&lang=${serviceConfig.LINGUA}` +
            `&image_type=${serviceConfig.TIPO_IMAGEM}`;
        return axios.get(urlPesquisa);
    }
}