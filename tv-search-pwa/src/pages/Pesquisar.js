import React, { Component } from 'react';

import logo from "../img/logo.png";
import imgdefault from "../img/imgDefault.png";
import {Link} from 'react-router-dom';

import Header from "../components/Header";
import ReactLoading from "react-loading";
import SerieService from "../services/SeriesService";
import './Pesquisar.scss';

export default class Pesquisar extends Component {

    constructor() {
        super();

        this.state = {
            series: [],
            carregando: false,
            textoPesquisa: ""
        }
        this.service = new SerieService();
    }
    //funçao para pesquisar quando for digitando o nome
    pesquisar = event => {
        const consulta = event.target.value;
        /**
         * Seta para "true" a flag "carregando",
         * sinalizando que a animação de loading
         * deve ser exibida
         */
        this.setState({
            carregando: true,
            textoPesquisa: consulta,
            series: []
        });

        this.service
            .pesquisar(consulta)
            .then(resposta => this.setState({
                series: resposta.data,
                carregando: false
            }))
            .catch(erro => {
                console.log(erro);
                this.setState({ carregando: false });
            });
    }

    render() {

        const { series, textoPesquisa } = this.state;
        console.log(series);


        const listaSeries = series.map(serie => {
            let imagem = imgdefault;
            if (serie.show.image && serie.show.image.medium) {
                imagem = serie.show.image.medium;
            }
            return (
                <div key={serie.show.id} className="serie">
                    <Link to={
                        {
                            pathname:'/serie',
                            state:{serie, imagem}
                        }
                    }>
                        <img
                            src={imagem}
                            alt="Cartaz da série" />
                    </Link>

                    <Link to={
                        {
                            pathname:'/serie',
                            state:{serie}
                        }
                    }>
                        <span>{serie.show.name}</span>
                    </Link>
                </div>
            )
        });

        const naoTemResultadoParaExibir =
            listaSeries.length === 0;
        const usuarioEstaPesquisando =
            textoPesquisa.length > 0;

        return (
            <div>
                <Header
                    enderecoPaginaAnterior="/"
                    logo={logo}
                    titulo="TV Search" />

                <div id="areaPesquisa">
                    <input
                        value={this.state.textoPesquisa}
                        id="campoPesquisa"
                        onChange={this.pesquisar}
                        placeholder="Digite o nome da série"
                        type="text" />
                </div>
                {
                    this.state.carregando &&
                    <div id="areaLoaging">
                        <ReactLoading
                            id="animacao"
                            type="bars"
                            color="red"
                            height="60px"
                            width="60px" />
                    </div>
                }
                <div id="areaResultados">
                    {
                        (naoTemResultadoParaExibir
                            && usuarioEstaPesquisando) &&
                        <span id="mensagemNaoEncontrado">Nenhuma série encontrada</span>
                    }
                    {listaSeries}
                </div>

            </div>
        )
    }
}
