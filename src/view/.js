import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from "react-router-dom";


// import React, { useState } from 'react';
// import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
// import RangeSlider from 'react-bootstrap-range-slider';

//IMPORT CHIPS

import Chip from '@material-ui/core/Chip';

//FIM IMPORT CHIPS

import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'


var Chart = require("react-google-charts").Chart;

class TLCriacaoProjeto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTagValue: '',
            inputTagValue1: '',
        };

        this.tags = [];
        this.tags1 = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleInsertTag = this.handleInsertTag.bind(this);

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleInsertTag1 = this.handleInsertTag1.bind(this);
    }
    handleChange(event) {
        this.setState({ inputTagValue: event.target.value });

    }

    handleChange1(event) {
        this.setState({ inputTagValue1: event.target.value });

    }

    handleDelete(index) {
        delete this.tags[index];
        this.forceUpdate();

    };

    handleDelete1(index1) {
        delete this.tags1[index1];
        this.forceUpdate();

    };

    handleInsertTag(index) {
        this.tags.push(this.state.inputTagValue);
        this.setState({ inputTagValue: '' });

    };

    handleInsertTag1(index1) {
        this.tags1.push(this.state.inputTagValue1);
        this.setState({ inputTagValue1: '' });

    };

    updateInputValue(evt) {
        this.setState({ inputValue: evt.target.value });
    }

    updateInputValue1(evt) {
        this.setState({ inputValue1: evt.target.value1 });
    }
    render() {
        const data = [
            {
                data: {
                    battery: 0.7,
                    design: .8,
                    useful: 0.9,
                    speed: 0.67,
                    weight: 0.8
                },
                meta: { color: "rgb(89, 202, 188)" }
            },
            {
                data: {
                    battery: 0.6,
                    design: .85,
                    useful: 0.5,
                    speed: 0.6,
                    weight: 0.7
                },
                meta: { color: "rgb(241, 104, 48)" }
            },

            {
                data: {
                    battery: 0.6,
                    design: .85,
                    useful: 0.5,
                    speed: 0.6,
                    weight: 0.7
                },
                meta: { color: "rgb(241, 104, 48)" }
            },

        ];

        const captions = {
            // columns
            battery: 'HTML',
            design: 'CSS',
            useful: 'Photoshop',
            speed: 'Illustrator',
            weight: 'InDesign'
        };
        const captions1 = {
            // columns
            battery: 'Cooperação',
            design: 'Criatividade',
            useful: 'Trabalho de Equipa',
            speed: 'Interajuda',
            weight: 'Organização'
        };

        const noSmoothing = points => {
            let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
            for (let i = 1; i < points.length; i++) {
                d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
            }
            return d + 'z';
        };

        const defaultOptions = {
            size: 150,
            axes: true, // show axes?
            scales: 3, // show scale circles?
            captions: true, // show captions?
            captionMargin: 10,
            dots: false, // show dots?
            zoomDistance: 1.2, // where on the axes are the captions?
            setViewBox: (options) => '-${options.captionMargin} 0 ${options.size + options.captionMargin * 2} ${options.size}', // custom viewBox ?
            smoothing: noSmoothing, // shape smoothing function
            axisProps: () => ({ className: 'axis' }),
            scaleProps: () => ({ className: 'scale', fill: 'none' }),
            shapeProps: () => ({ className: 'shape' }),
            captionProps: () => ({
                className: 'caption',
                textAnchor: 'middle',
                fontSize: 12,
                fontFamily: 'sans-serif'
            }),
            dotProps: () => ({
                className: 'dot',
                mouseEnter: (dot) => { console.log(dot) },
                mouseLeave: (dot) => { console.log(dot) }
            })
        }

        // const MyComponent = () => {

        //     const [ value, setValue ] = useState(0); 

        return (

            <div style={{ marginLeft: "0px", marginRight: "15px" }} >
                <div className="row no-gutters">
                    <div className="d-none d-xl-block  col-xl-2">

                        <nav id="sidebar">
                            <div className="sidebar-header">
                                <div className="intro">
                                    <div className="text-center"><img src="imagens/bizdirectLOGO.png" alt=""
                                        className="img-fluid w-50 text-center" /></div>
                                    <div className="profile-img mb-xl-4"><img src="imagens/fotinha.png" alt="" /></div>
                                    <h3 className="profile-usertitle-name mt-0">{JSON.parse(localStorage.getItem('Utilizador')).nome}</h3>
                                    <h4 className="profile-usertitle-job ">
                                        {JSON.parse(localStorage.getItem('Utilizador')).tipoUser == 2 ?
                                            "Team Leader" : "Developer"}
                                    </h4>
                                </div>

                            </div>
                            <hr />
                            <ul className="list-unstyled components">
                                <li>
                                    <Link to="/DEVPesquisarProjetos" className="p-3"> <img src="imagens/projetos.svg" width="24px" alt="" />
                                        <span className="pl-3">Projetos</span></Link>
                                </li>
                                <li>
                                    <Link to="/DEVCompetenciasEditar" className="p-3"><img src="imagens/Competencias.svg" width="24px" alt="" /> <span
                                        className="pl-3">Competências</span></Link>
                                </li>
                                {JSON.parse(localStorage.getItem('Utilizador')).tipoUser == 2 ?
                                    <li>
                                        <Link to="/TLContinuarProjeto" className="p-3"><img src="imagens/decorrer.png" width="24px" alt="" /> <span
                                            className="pl-3">Criação de Equipa</span></Link>
                                    </li>
                                    : ""}


                            </ul>

                            <ul>
                                <li className="mt-5 pt-5">
                                    <Link to="/Logout" ><img src="imagens/sair.svg" alt="" width="24px" /><span
                                        className="pl-3 fixed_bottom">Sair</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>


                    </div>

                    <div className="col-xl-10">
                        <div className="container-fluid d-xl-none p-3 text-right">
                            <div className="dropdown">
                                <button type="button" className="btn btn-primary" data-toggle="dropdown" id="sidebarCollapse"></button>
                                <div className="dropdown-menu">
                                    <div className="dropdown-header"></div>
                                    <Link to="/DEVPesquisarProjetos" className="dropdown-item" ><img className="pr-1" src="imagens/projetos.svg" width="24px"
                                        alt="" />Projetos</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/DEVCompetenciasEditar" className="dropdown-item" ><img className="pr-1" src="imagens/Competencias.svg" width="24px"
                                        alt="" />Competências</Link>



                                    {JSON.parse(localStorage.getItem('Utilizador')).tipoUser == 2 ?

                                        <div>
                                            <div className="dropdown-divider"></div>
                                            <Link to="/TLContinuarProjeto" className="dropdown-item" ><img className="pr-1" src="imagens/decorrer.png" width="24px"
                                                alt="" />Criação de Equipa</Link>

                                        </div>

                                        : ""}

                                    <div className="dropdown-divider"></div>
                                    <Link to="/Logout"><img src="imagens/sair.svg" alt="" width="24px" /><span
                                        className="pl-3 fixed_bottom">Sair</span></Link>


                                </div>
                            </div>
                        </div>
                        <h3 className="ml-4  titulos" >Criação de Projeto</h3>
                        <div className="row justify-content-center">

                            <div className="col-lg-11 col-12 col-sm-11    my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                <h5 className="pb-1 titulos font-weight-normal">Informações Gerais</h5>
                                <hr />

                                <form className="my-4 font-weight-light col-xl-12 texto">
                                                        <div className="row">
                                                            <div className="col-xl-12 ">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 " >
                                                                        <label className="font-weight-normal  ">Título:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <label> {data.nome}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">

                                                            {/* <div className="col-xl-12 col-md-12">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 ">

                                                                        <label className="font-weight-normal ">Líder da Equipa:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        {data.nome_lider.map(function (nome_lider) {
                                                                            return (
                                                                                <label> {nome_lider.nome} </label>


                                                                            );
                                                                        })}

                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-xl-6 ">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 " >
                                                                        <label className="font-weight-normal  ">Sigla:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <label>{data.sigla} </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6 ">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 " >
                                                                        <label className="font-weight-normal  ">Nº de elementos:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <label> {data.nr_elementos}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-xl-6 col-md-12">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 " >
                                                                        <label className="font-weight-normal">Data de início:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <label> {data.data_inicio}</label>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="col-xl-6 col-md-12">
                                                                <div className="row ">
                                                                    <div className="col-xs-1 mb-0">
                                                                        <label className="font-weight-normal ">Data de fim:</label>
                                                                    </div>
                                                                    <div className="col ">
                                                                        <label> {data.data_fim}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div className="row ">
                                                            <div className="col-xs-3 mr-3 mb-1">

                                                                <label className="semheight" >Disponibilidade <img src="imagens/info.png" data-toggle="tooltip" data-placement="right" title="Se pretender que a disponibilidade seja aplicável a todos os elementos da equipa, ative a opção" className="wmin " alt="icone de mais informações" />{data.disponibilidade}</label>



                                                            </div>

                                                            <div className="col-xl-12  pr-0 pl-0">
                                                                <div className="custom-control custom-switch ">
                                                                    <input checked disabled type="checkbox" className="custom-control-input " id="customSwitch1" />
                                                                    <label className=" custom-control-label disable" htmlFor="customSwitch1">Viajar
                                    {/* <input checked disabled className=" ml-2 alturacheck" type="checkbox" value="" /> Aplicável a todos os elementos da equipa */}
                                                                    </label>
                                                                </div>


                                                            </div>
                                                            <div className="col-xl-12  pl-0">
                                                                <div className="custom-control custom-switch">
                                                                    <input disabled type="checkbox" className="custom-control-input  " id="customSwitch2" />
                                                                    <label className=" custom-control-label  " htmlFor="customSwitch2">Horas extra
                                    {/* <input disabled className=" ml-2 alturacheck" type="checkbox" value="" /> Aplicável a todos os elementos da equipa */}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-12  col-md-3 pl-0 pr-0 ">
                                                                <div className="custom-control custom-switch">
                                                                    <input checked disabled type="checkbox" className="custom-control-input  " id="customSwitch3" />
                                                                    <label className=" custom-control-label  " htmlFor="customSwitch3">Cliente
                                    {/* <input disabled className=" ml-2 alturacheck" type="checkbox" value="" /> Aplicável a todos os elementos da equipa
                           */}          </label>
                                                                </div>

                                                            </div>

                                                            <div className="col-xl-12 pl-0 pr-0 ">
                                                                <div className="custom-control custom-switch">
                                                                    <input checked disabled type="checkbox" className="custom-control-input  " id="customSwitch3" />
                                                                    <label className=" custom-control-label  " for="customSwitch3">Ativo </label>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="row">
                                                            <div className="col pl-0 pr-0 col-md-12">

                                                                <label className="font-weight-normal mt-3" htmlFor="exampleFormControlTextarea1">Descrição do projeto:</label>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col pl-0 pr-0 col-md-12">

                                                                <label className="font-weight-light ">{data.descricao} </label>
                                                            </div>
                                                        </div>

                                                    </form>

                            </div>

                            <div className="col-lg-11 col-12 col-sm-11    my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                <h5 className="pb-1 titulos font-weight-normal">Competências Técnicas</h5>
                                <hr />
                                <div className="row">
                                    <div className="row col-sm-12 col-lg-12">
                                        <div className="col-xl-6 col-md-12 mb-5 pr-0 ">


                                            {/* <form className="form-inline">
                                                <i className="fas fa-search" aria-hidden="true"></i>
                                                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="+ Competências Técnicas"
                                                    aria-label="Search" />
                                            </form> */}
                                            <div class="input-group ">
                                                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="+ Competências Técnicas"
                                                    aria-label="Search" value={this.state.inputTagValue1} onChange={this.handleChange1} />

                                                <div class="input-group-append">
                                                    <button class="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#59CABC" }} onClick={this.handleInsertTag1}>Inserir</button>
                                                </div>
                                            </div>
                                            {this.tags1.map((name, index1) => {

                                                {
                                                    const cor = index1.toString().split('').pop() == "0" ? (this.selectedColor1 = "#FAAC19")
                                                        : index1.toString().split('').pop() == "1" ? (this.selectedColor1 = "#F16830")
                                                            : index1.toString().split('').pop() == "2" ? (this.selectedColor1 = "#59CABC")
                                                                : index1.toString().split('').pop() == "3" ? (this.selectedColor1 = "#CC2743")
                                                                    : index1.toString().split('').pop() == "4" ? (this.selectedColor1 = "#FAAC19")
                                                                        : index1.toString().split('').pop() == "5" ? (this.selectedColor1 = "#F16830")
                                                                            : index1.toString().split('').pop() == "6" ? (this.selectedColor1 = "#59CABC")
                                                                                : index1.toString().split('').pop() == "7" ? (this.selectedColor1 = "#CC2743")
                                                                                    : index1.toString().split('').pop() == "8" ? (this.selectedColor1 = "#FAAC19")
                                                                                        : index1.toString().split('').pop() == "9" ? (this.selectedColor1 = "#F16830")
                                                                                            : "#FAAC19 ";
                                                }

                                                let estilochips1 = {
                                                    backgroundColor: this.selectedColor1,
                                                    marginTop: "2%",
                                                    marginRight: "0.5%",
                                                    fontWeight: "400",
                                                    color: "white"
                                                };

                                                return <Chip tabindex={index1 + 1} label={name} onDelete={this.handleDelete1.bind(this, index1)} style={estilochips1} />
                                            }, this)}
                                        </div>



                                        <div className="row col-xl-12">
                                            <div className="col-xl-6 col-md-6 col-lg-6 pl-0 ml-md-5 ml-sm-5 ml-5  ">

                                                <div className="row">
                                                    <div className="col-md-3  col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4  ">
                                                        <span className="my-4 font-weight-light"> HTML</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={85} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4 ">
                                                        <span className="my-4 font-weight-light"> Javascript</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={75} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4">
                                                        <span className="my-4 font-weight-light"> Premiere</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={70} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4">
                                                        <span className="my-4 font-weight-light"> After Effects</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={80} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4">
                                                        <span className="my-4 font-weight-light"> Lightroom</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={95} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4">
                                                        <span className="my-4 font-weight-light"> C++</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={90} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3 col-xl-4">
                                                        <span className="my-4 font-weight-light"> Illustrator</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={80} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="   col-xl-5 col-md-12 col-lg-5 mt-4 col-sm-12">
                                                <Chart
                                                    width={'450px'}
                                                    height={'300px'}
                                                    chartType="PieChart"
                                                    backgroundColor={'white'}
                                                    loader={<div>Loading Chart</div>}

                                                    data={[
                                                        ['Task', 'Hours per Day'],
                                                        ['Html', 10],
                                                        ['Photoshop', 8],
                                                        ['ReactJS', 7],
                                                        ['Illustrator', 11],
                                                        ['NodeJS', 9],
                                                    ]}

                                                    options={{
                                                        pieHole: 0.4,
                                                        chartArea: { left: ' 0', top: '9', bottom: '9', width: '100%', height: '100%' },
                                                        colors: ["#FAAC19", '#F16830', "#59CABC", "#CC2743", "#4C4C4C"],
                                                        fontSize: "17",
                                                        fontName: "Helvetica",
                                                        legend: { position: 'center', alignment: 'center', fontColor: '#59CABC', textStyle: { color: '#777777' } },
                                                        pieSliceText: "none",
                                                        tooltip: { isHtml: true },
                                                        backgroundColor: 'transparent',
                                                    }}
                                                    rootProps={{ 'data-testid': '3' }}

                                                />
                                            </div>

                                        </div>

                                    </div>



                                </div>
                                <button type="button" className="btnoutlineverde float-right">Limpar</button>
                            </div>


                            <div className="col-lg-11 col-12 col-sm-11    my-4 pr-5  pl-5 pt-4 pb-4   bg-white  ">
                                <h5 className="pb-1 titulos font-weight-normal">Competências Humanas</h5>
                                <hr />
                                <div className="row">

                                    <div className="row col-sm-12 col-lg-12">

                                        <div className="col-xl-6 col-md-12 mb-5 pr-0 ">
                                            {/* COMEÇAM CHIPS NO BROWSER  */}
                                            {/* <div class="input-group ">

                                                <i className="fas fa-search" aria-hidden="true"></i>



                                                <input className="form-control form-control-sm ml-3 w-75 my-0 py-1 " type="text" placeholder="+ Competências Humanas"
                                                    aria-label="Search" value={this.state.inputTagValue} onChange={this.handleChange} />

                                                <div class="input-group-append">
                                                    <button class="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#59cabc" }} onClick={this.handleInsertTag}>Inserir</button>
                                                </div>



                                                {this.tags.map((name, index) => {

                                                    {
                                                        const cor = index.toString().split('').pop() == "0" ? (this.selectedColor = "#FAAC19")
                                                            : index.toString().split('').pop() == "1" ? (this.selectedColor = "#F16830")
                                                                : index.toString().split('').pop() == "2" ? (this.selectedColor = "#59CABC")
                                                                    : index.toString().split('').pop() == "3" ? (this.selectedColor = "#CC2743")
                                                                        : index.toString().split('').pop() == "4" ? (this.selectedColor = "#FAAC19")
                                                                            : index.toString().split('').pop() == "5" ? (this.selectedColor = "#F16830")
                                                                                : index.toString().split('').pop() == "6" ? (this.selectedColor = "#59CABC")
                                                                                    : index.toString().split('').pop() == "7" ? (this.selectedColor = "#CC2743")
                                                                                        : index.toString().split('').pop() == "8" ? (this.selectedColor = "#FAAC19")
                                                                                            : index.toString().split('').pop() == "9" ? (this.selectedColor = "#F16830")
                                                                                                : "#FAAC19 ";
                                                    }

                                                    let estilochips = {
                                                        backgroundColor: this.selectedColor,
                                                        marginTop: "2%",
                                                        marginRight: "0.5%",
                                                        fontWeight: "400",
                                                        color: "white"
                                                    };

                                                    return <Chip tabindex={index + 1} label={name} onDelete={this.handleDelete.bind(this, index)} style={estilochips} />
                                                }, this)}


                                            </div> */}

                                            <div class="input-group ">
                                                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="+ Competências Técnicas"
                                                    aria-label="Search" value={this.state.inputTagValue} onChange={this.handleChange} />

                                                <div class="input-group-append">
                                                    <button class="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#59CABC" }} onClick={this.handleInsertTag}>Inserir</button>
                                                </div>
                                            </div>
                                            {this.tags.map((name, index) => {

                                                {
                                                    const cor = index.toString().split('').pop() == "0" ? (this.selectedColor = "#FAAC19")
                                                        : index.toString().split('').pop() == "1" ? (this.selectedColor = "#F16830")
                                                            : index.toString().split('').pop() == "2" ? (this.selectedColor = "#59CABC")
                                                                : index.toString().split('').pop() == "3" ? (this.selectedColor = "#CC2743")
                                                                    : index.toString().split('').pop() == "4" ? (this.selectedColor = "#FAAC19")
                                                                        : index.toString().split('').pop() == "5" ? (this.selectedColor = "#F16830")
                                                                            : index.toString().split('').pop() == "6" ? (this.selectedColor = "#59CABC")
                                                                                : index.toString().split('').pop() == "7" ? (this.selectedColor = "#CC2743")
                                                                                    : index.toString().split('').pop() == "8" ? (this.selectedColor = "#FAAC19")
                                                                                        : index.toString().split('').pop() == "9" ? (this.selectedColor = "#F16830")
                                                                                            : "#FAAC19 ";
                                                }

                                                let estilochips = {
                                                    backgroundColor: this.selectedColor,
                                                    marginTop: "2%",
                                                    marginRight: "0.5%",
                                                    fontWeight: "400",
                                                    color: "white"
                                                };

                                                return <Chip tabindex={index + 1} label={name} onDelete={this.handleDelete.bind(this, index)} style={estilochips} />
                                            }, this)}

                                        </div>


                                        <div className="row col-xl-12 ">
                                            <div className="col-xl-6 col-md-12 col-lg-6 col-sm-12 pl-0    ml-md-5 ml-sm-5 ml-5 ">

                                                <div className="row">
                                                    <div className="col-md-3  col-sm-3 col-xs-4 col-3 col-lg-3 col-xl-4 col-4 ">
                                                        <span className="my-4 font-weight-light"> Organização</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={80} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-4 col-3 col-lg-3 col-xl-4  col-4">
                                                        <span className="my-4 font-weight-light"> Cooperação</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={60} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-4 col-3 col-lg-3 col-xl-4 col-4">
                                                        <span className="my-4 font-weight-light"> Criatividade</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={70} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-5 col-3 col-lg-3 col-xl-4 col-4">
                                                        <span className="my-4 font-weight-light"> Adaptabilidade</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={65} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-5 col-3 col-lg-3 col-xl-4 col-4">
                                                        <span className="my-4 font-weight-light"> Foco</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={55} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-5 col-3 col-lg-3 col-xl-4 col-4">
                                                        <span className="my-4 font-weight-light"> Trabalho em Equipa</span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">
                                                            <input type="range" defaultValue={60} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3 col-xs-5 col-3 col-lg-3 col-xl-4 col-4">
                                                        <span className="my-4 font-weight-light"> Liderança<acronym title=""></acronym></span>
                                                    </div>
                                                    <div className="col mb-2">
                                                        <span className="my-4 font-weight-light"><div className="slidecontainer">

                                                            {/* <RangeSlider
                                                                value={value}
                                                                onChange={changeEvent => setValue(changeEvent.target.value)}
                                                            /> */}
                                                            <input type="range" defaultValue={50} className="slider" />
                                                        </div></span>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="   col-xl-5 col-md-12 col-lg-5 mt-4 col-sm-12">
                                                <Chart
                                                    width={'450px'}
                                                    height={'300px'}
                                                    chartType="PieChart"
                                                    backgroundColor={'white'}
                                                    loader={<div>Loading Chart</div>}

                                                    data={[
                                                        ['Task', 'Hours per Day'],
                                                        ['Cooperação', 11],
                                                        ['Ética', 4],
                                                        ['Organização', 8],
                                                        ['Trabalho em Equipa', 8],

                                                        ['Criatividade', 9]
                                                    ]}

                                                    options={{
                                                        pieHole: 0.4,
                                                        chartArea: { left: ' 0', top: '9', bottom: '9', width: '100%', height: '100%' },
                                                        colors: ["#FAAC19", '#F16830', "#59CABC", "#CC2743", "#4C4C4C"],
                                                        fontSize: "17",
                                                        fontName: "Helvetica",
                                                        legend: { position: 'center', alignment: 'center', fontColor: '#59CABC', textStyle: { color: '#777777' } },
                                                        pieSliceText: "none",
                                                        tooltip: { isHtml: true },
                                                        backgroundColor: 'transparent',
                                                    }}
                                                    rootProps={{ 'data-testid': '3' }}


                                                />

                                            </div>

                                        </div>

                                    </div>



                                </div>
                                <button type="button" className="btnoutlineverde float-right">Limpar</button>
                            </div>






                            <button type="button" className="btnverdegrande  mb-5 col-xl-11 col-12 col-sm-11 col-sm-11  ml-xs-0   pt-3 pb-3 ">Gerar Equipa</button>


                            <div className="col-lg-11 col-12 col-sm-11     my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4 mt-4 bg-white  ">
                                <h5 className="pb-1 titulos font-weight-normal">Equipa Gerada</h5>
                                <hr />
                                <h6 className="mt-2 mb-5 texto">Elementos da Equipa Gerada</h6>

                                <div className="row justify-content-center">


                                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-6 col-6 text-center  ">
                                        <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                            <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>
                                            <h4 className="profile-usertitle-job ">Líder</h4>
                                        </div>
                                    </div>

                                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-6 col-6 text-center  ">
                                        <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                            <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                        </div>
                                    </div>

                                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-6 col-6 text-center  ">
                                        <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                            <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                        </div>
                                    </div>

                                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-6 col-6 text-center  ">
                                        <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                            <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                        </div>
                                    </div>

                                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-6 col-6 text-center  ">
                                        <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                            <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                        </div>
                                    </div>

                                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-6 col-6 text-center  ">
                                        <div className="profile-img"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                            <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                        </div>
                                    </div>






                                </div>




                                <div className="row col-xl-12  texto mt-4 justify-content-center">
                                    <div className="col-xl-6 col-lg-6 col-md-12 ">

                                        <h6>Competências Técnicas Pretendidas</h6>

                                        <Chart
                                            width={'450px'}
                                            height={'300px'}
                                            chartType="PieChart"
                                            backgroundColor={'white'}
                                            loader={<div>Loading Chart</div>}

                                            data={[
                                                ['Task', 'Hours per Day'],
                                                ['Html', 10],
                                                ['Photoshop', 8],
                                                ['ReactJS', 7],
                                                ['Illustrator', 11],
                                                ['NodeJS', 9],
                                            ]}

                                            options={{
                                                pieHole: 0.4,
                                                chartArea: { left: ' 0', top: '9', bottom: '9', width: '100%', height: '100%' },
                                                colors: ["#FAAC19", '#F16830', "#59CABC", "#CC2743", "#4C4C4C"],
                                                fontSize: "17",
                                                fontName: "Helvetica",
                                                legend: { position: 'center', alignment: 'center', fontColor: '#59CABC', textStyle: { color: '#777777' } },
                                                pieSliceText: "none",
                                                tooltip: { isHtml: true },
                                                backgroundColor: 'transparent',
                                            }}
                                            rootProps={{ 'data-testid': '3' }}

                                        />

                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12">

                                        <h6>Competências Humanas Pretendidas</h6>


                                        <Chart
                                            width={'450px'}
                                            height={'300px'}
                                            chartType="PieChart"
                                            backgroundColor={'white'}
                                            loader={<div>Loading Chart</div>}

                                            data={[
                                                ['Task', 'Hours per Day'],
                                                ['Cooperação', 11],
                                                ['Ética', 4],
                                                ['Organização', 8],
                                                ['Trabalho em Equipa', 8],

                                                ['Criatividade', 9]
                                            ]}

                                            options={{
                                                pieHole: 0.4,
                                                chartArea: { left: ' 0', top: '9', bottom: '9', width: '100%', height: '100%' },
                                                colors: ["#FAAC19", '#F16830', "#59CABC", "#CC2743", "#4C4C4C"],
                                                fontSize: "17",
                                                fontName: "Helvetica",
                                                legend: { position: 'center', alignment: 'center', fontColor: '#59CABC', textStyle: { color: '#777777' } },
                                                pieSliceText: "none",
                                                tooltip: { isHtml: true },
                                                backgroundColor: 'transparent',
                                            }}
                                            rootProps={{ 'data-testid': '3' }}


                                        />
                                    </div>
                                    <div className="row col-xl-12  texto mt-4 justify-content-center">
                                        <div className="col-xl-6 col-lg-6 col-md-12">

                                            <h6>Competências Técnicas Obtidas</h6>

                                            <Chart
                                                width={'450px'}
                                                height={'300px'}
                                                chartType="PieChart"
                                                backgroundColor={'white'}
                                                loader={<div>Loading Chart</div>}

                                                data={[
                                                    ['Task', 'Hours per Day'],
                                                    ['Html', 10],
                                                    ['Photoshop', 8],
                                                    ['ReactJS', 7],
                                                    ['Illustrator', 11],
                                                    ['NodeJS', 9],
                                                ]}

                                                options={{
                                                    pieHole: 0.4,
                                                    chartArea: { left: ' 0', top: '9', bottom: '9', width: '100%', height: '100%' },
                                                    colors: ["#FAAC19", '#F16830', "#59CABC", "#CC2743", "#4C4C4C"],
                                                    fontSize: "17",
                                                    fontName: "Helvetica",
                                                    legend: { position: 'center', alignment: 'center', fontColor: '#59CABC', textStyle: { color: '#777777' } },
                                                    pieSliceText: "none",
                                                    tooltip: { isHtml: true },
                                                    backgroundColor: 'transparent',
                                                }}
                                                rootProps={{ 'data-testid': '3' }}

                                            />
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-12">

                                            <h6>Competências Humanas Obtidas</h6>

                                            <Chart
                                                width={'450px'}
                                                height={'300px'}
                                                chartType="PieChart"
                                                backgroundColor={'white'}
                                                loader={<div>Loading Chart</div>}

                                                data={[
                                                    ['Task', 'Hours per Day'],
                                                    ['Cooperação', 11],
                                                    ['Ética', 4],
                                                    ['Organização', 8],
                                                    ['Trabalho em Equipa', 8],

                                                    ['Criatividade', 9]
                                                ]}

                                                options={{
                                                    pieHole: 0.4,
                                                    chartArea: { left: ' 0', top: '9', bottom: '9', width: '100%', height: '100%' },
                                                    colors: ["#FAAC19", '#F16830', "#59CABC", "#CC2743", "#4C4C4C"],
                                                    fontSize: "17",
                                                    fontName: "Helvetica",
                                                    legend: { position: 'center', alignment: 'center', fontColor: '#59CABC', textStyle: { color: '#777777' } },
                                                    pieSliceText: "none",
                                                    tooltip: { isHtml: true },
                                                    backgroundColor: 'transparent',
                                                }}
                                                rootProps={{ 'data-testid': '3' }}


                                            />
                                        </div>
                                    </div>




                                    <table className="table table-striped mt-3 font-weight-light texto mb-2">
                                        <hr />
                                        <h6 className="mt-2">Outras opções de equipa</h6>
                                        <tr>
                                            <td className="d-none d-lg-table-cell">
                                                <div className="d-flex justify-content-start">
                                                    <img className="maxwphoto mr-5" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-end">
                                                    <button type="button" className="btnamarelonormal mr-3 justify-content-center " data-toggle="modal" data-target="#basicExampleModal">Comparar equipa</button>
                                                    <button type="button" className="btnlaranjanormal mr-3 justify-content-center ">Escolher equipa</button>
                                                </div>



                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="d-none d-lg-table-cell">
                                                <div className="d-flex justify-content-start">
                                                    <img className="maxwphoto mr-5" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-end">
                                                    <button type="button" className="btnamarelonormal mr-3 justify-content-center " data-toggle="modal" data-target="#basicExampleModal">Comparar equipa</button>
                                                    <button type="button" className="btnlaranjanormal mr-3 justify-content-center ">Escolher equipa</button>
                                                </div>



                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="d-none d-lg-table-cell">
                                                <div className="d-flex justify-content-start">
                                                    <img className="maxwphoto mr-5" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2 " src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                    <img className="maxwphoto mr-2" src="imagens/teste.png" alt="Foto" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-end">
                                                    <button type="button" className="btnamarelonormal mr-3 justify-content-center" data-toggle="modal" data-target="#basicExampleModal">Comparar equipa</button>
                                                    <button type="button" className="btnlaranjanormal mr-3 justify-content-center ">Escolher equipa</button>
                                                </div>



                                            </td>
                                        </tr>
                                    </table>

                                </div>





                                <button type="button" className="btnverdegrande  col-xl-11 col-12 col-sm-11 col-sm-11  ml-xs-0   pt-3 pb-3 ">Criar Equipa</button>
                            </div>





                            <div className="modal fade mt-1" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content1">
                                        <div className="modal-header bg-white ">
                                            <h5 className="modal-title" id="exampleModalLabel">Maria Margarida Sousa</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body pre-scrollable1">
                                            <div className="container-fluid">

                                                <div className="row justify-content-md-center">

                                                    <div className="col-lg-5 col-11 col-sm-11  my-4 pr-5 pl-5 pt-4 pb-4 ml-3    bg-white  ">

                                                        <h5 className="pb-1 titulos font-weight-normal">Elementos da Equipa Atual</h5>
                                                        <hr />

                                                        <div className="my-3 font-weight-light">

                                                            <div className="row justify-content-center">


                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>
                                                                        <h4 className="profile-usertitle-job ">Líder</h4>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <h5 className="pb-1 titulos font-weight-normal">Competências Técnicas</h5>
                                                        <hr />
                                                        <RadarChart
                                                            captions={captions}
                                                            data={data}
                                                            size={350}
                                                            defaultOptions={defaultOptions}

                                                        />

                                                        <h5 className="pb-1 titulos font-weight-normal mt-5">Competências Humanas</h5>
                                                        <hr />
                                                        <RadarChart
                                                            captions={captions1}
                                                            data={data}
                                                            size={350}
                                                            defaultOptions={defaultOptions}

                                                        />
                                                    </div>

                                                    <div className="col-lg-5 col-11 col-sm-11  my-4 pr-5 pl-5 pt-4 pb-4  ml-3 bg-white  ">
                                                        <h5 className="pb-1 titulos font-weight-normal">Elementos da Equipa Selecionada</h5>
                                                        <hr />
                                                        <div className="my-3 font-weight-light">

                                                            <div className="row justify-content-center">


                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>
                                                                        <h4 className="profile-usertitle-job ">Líder</h4>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 text-center  ">
                                                                    <div className="profile-img mb-2"><img className="rounded-pill" src="imagens/fotinha.png" alt="" />
                                                                        <h3 className="profile-usertitle-name  font-weight-normal mt-2 ">Nome</h3>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <h5 className="pb-1 titulos font-weight-normal">Competências Técnicas</h5>
                                                        <hr />
                                                        <RadarChart
                                                            captions={captions}
                                                            data={data}
                                                            size={350}
                                                            defaultOptions={defaultOptions}

                                                        />

                                                        <h5 className="pb-1 titulos font-weight-normal mt-5">Competências Humanas</h5>
                                                        <hr />
                                                        <RadarChart
                                                            captions={captions1}
                                                            data={data}
                                                            size={350}
                                                            defaultOptions={defaultOptions}

                                                        />
                                                    </div>

                                                </div>

                                            </div>


                                        </div>
                                        <div className="modal-footer bg-white ">

                                            <button type="button" className="btnverdenormal ">Salvar</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default TLCriacaoProjeto;