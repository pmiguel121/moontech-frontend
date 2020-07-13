import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import authHeaders from './auth-header'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import axios from 'axios';

//IMPORT CHIPS

//import Chip from '@material-ui/core/Chip';

//FIM IMPORT CHIPS

//import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

var Chart = require("react-google-charts").Chart;

const HerokuURL = "https://moontech-backend.herokuapp.com";


class TLCriacaoProjeto extends React.Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array),
        suggestions1: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: [],
        suggestions1: []
    };

    constructor(props) {
        super(props);
        this.state = {
            inputTagValue: '',
            inputTagValue1: '',

            skills_utilizador_tecnicas: [],
            skills_utilizador_humanas: [],
            SkillsTec: [],
            SkillsHum: [],
            projeto: [],
            id_proj: [],

            //chips
            activeSuggestion: 0,
            activeSuggestion1: 0,
            filteredSuggestions: [],
            filteredSuggestions1: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            showSuggestions1: false,

            //ID E COMPETENCIA
            valorescompetencia: [],
            valorescompetencia1: [],
            tagsTecArmazena: "",
            tagsHumArmazena: "",
            id_projeto: 0,

            equipagerada: [],
            tl: [],
            CompetenciasEscolhidas: [],

            show: false,
            show1: false,

            SkillsTecGraf: [],
            SkillsHumGraf: []

        };

        this.tagsTec = [];
        this.tagsHum = [];
        this.tags = [];
        this.tags1 = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleInsertTag = this.handleInsertTag.bind(this);

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleInsertTag1 = this.handleInsertTag1.bind(this);

        this.handle_Slider = this.handle_Slider.bind(this);

        // const {id_projeto} = useParams();
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


    //SLIDER
    handle_Slider(value, id_com) {
        this.setState({ valorescompetencia: [value, id_com] });





    };
    handle_Slider1(value, id_com) {
        this.setState({ valorescompetencia1: [value, id_com] });


    };
    onChange = e => {
        const { suggestions } = this.props;
        const inputTagValue = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(inputTagValue.toLowerCase()) > -1
        );

        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            inputTagValue: e.currentTarget.value
        });
    };

    // Event fired when the user clicks on a suggestion
    onClick = e => {
        // Update the user input and reset the rest of the state
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            inputTagValue: e.currentTarget.innerText
        });
    };

    onClick1 = e => {
        // Update the user input and reset the rest of the state
        this.setState({
            activeSuggestion1: 0,
            filteredSuggestions1: [],
            showSuggestions1: false,
            inputTagValue1: e.currentTarget.innerText
        });
    };

    // Event fired when the user presses a key down
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                inputTagValue: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    onChange1 = e => {
        const { suggestions1 } = this.props;
        const inputTagValue1 = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions1 = suggestions1.filter(
            suggestion1 =>
                suggestion1.toLowerCase().indexOf(inputTagValue1.toLowerCase()) > -1
        );

        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion1: 0,
            filteredSuggestions1,
            showSuggestions1: true,
            inputTagValue1: e.currentTarget.value
        });
    };

    onKeyDown1 = e => {
        const { activeSuggestion1, filteredSuggestions1 } = this.state;

        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion1: 0,
                showSuggestions1: false,
                inputTagValue1: filteredSuggestions1[activeSuggestion1]
            });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion1 === 0) {
                return;
            }

            this.setState({ activeSuggestion1: activeSuggestion1 - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion1 - 1 === filteredSuggestions1.length) {
                return;
            }

            this.setState({ activeSuggestion1: activeSuggestion1 + 1 });
        }
    };



    resetForm = () => {
        this.setState({

            //campos
            inputTagValue: "",
            inputTagValue1: ""


        })
    }

    componentDidMount() {

        this.carregadatadaschipsHumanas()
        this.carregadatadaschipstecnicas()
        this.Load_skillshumanas()
        this.Load_skillsTecnicas()
        this.Load_projeto()
        this.Load_ComTecdaGerEq()
        this.Load_ComHumdaGerEq()
        this.Load_ComTecdaGerEqGraf()
        this.Load_ComHumdaGerEqGraf()
        this.Load_tl()
        this.Load_CompetenciasEscolhidas()

    }

    Load_CompetenciasEscolhidas() {

        const url = HerokuURL + "/gerar_equipa/list"
        axios.get(url)

            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ CompetenciasEscolhidas: data });

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }



    Load_tl() {
        let id_utilizador = JSON.parse(localStorage.getItem('Utilizador')).nrUser

        console.log(id_utilizador)
        const url = HerokuURL + "/utilizador/get/" + id_utilizador
        axios.get(url)

            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ tl: data });

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }
    carregadatadaschipstecnicas() {

        const { suggestions } = this.props;
        return this.state.SkillsTec.map((data, index) => {
           return  suggestions.push(data.nome)
        })
    }
    carregadatadaschipsHumanas() {

        const { suggestions1 } = this.props;
        return this.state.SkillsHum.map((data, index) => {
           return  suggestions1.push(data.nome)
        })
    }

    Load_projeto() {

        console.log(this.props.match.params.id)


        const url = HerokuURL + "/projeto/get/" + this.props.match.params.id
        axios.get(url)

            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ projeto: data });
                    console.log(data)

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }


    Load_ComTecdaGerEq() {

        const url = HerokuURL + "/gerar_equipa/SkillsTecGerar"
        axios.get(url)

            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ SkillsTec: data });

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }


    Load_ComHumdaGerEq() {

        const url = HerokuURL + "/gerar_equipa/SkillsHumGerar"
        axios.get(url)

            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ SkillsHum: data });

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }


    Load_ComTecdaGerEqGraf() {

        const url = HerokuURL + "/gerar_equipa/SkillsTecGerarGraf"
        axios.get(url)

            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ SkillsTecGraf: data });

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }



    Load_ComHumdaGerEqGraf() {

        const url = HerokuURL + "/gerar_equipa/SkillsHumGerarGraf"
        axios.get(url)

            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ SkillsHumGraf: data });

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    Load_skillshumanas() {
        const url = HerokuURL + "/skill/listskilltipoHumanas";
        axios.get(url).then(res => {

            if (res.data.success) {
                const data = res.data.data;
                this.setState({ SkillsHum: data });



            } else {
                alert("Error Web Service!");
            }
            this.carregadatadaschipsHumanas()
        })
            .catch(error => {
                alert(error)
            });
    }
    Load_skillsTecnicas() {

        const url = HerokuURL + "/skill/listskilltipoTecnicas";
        axios.get(url)

            .then(res => {

                if (res.data.success) {
                    const data = res.data.data;

                    this.setState({ SkillsTec: data });


                } else {


                    alert("Error Web Service!");
                }

                this.carregadatadaschipstecnicas()
            })
            .catch(error => {
                alert(error)
            });
    }


    Load_skillshumanasGraf() {
        const url = HerokuURL + "/skill/listskilltipoHumanas";
        axios.get(url).then(res => {

            if (res.data.success) {
                const data = res.data.data;
                this.setState({ SkillsHumGraf: data });



            } else {
                alert("Error Web Service!");
            }
            this.carregadatadaschipsHumanas()
        })
            .catch(error => {
                alert(error)
            });
    }
    Load_skillsTecnicasGraf() {

        const url = HerokuURL + "/skill/listskilltipoTecnicas";
        axios.get(url)

            .then(res => {

                if (res.data.success) {
                    const data = res.data.data;

                    this.setState({ SkillsTecGraf: data });


                } else {


                    alert("Error Web Service!");
                }

                this.carregadatadaschipstecnicas()
            })
            .catch(error => {
                alert(error)
            });
    }





    render() {


        let outputTecnicas = [['Competência', 'Nível']]


        for (let x in this.state.SkillsTecGraf) {
            const ColunaTec = Object.values(this.state.SkillsTecGraf[x])

            outputTecnicas.push([ColunaTec[0], Number(ColunaTec[1])])

        }



        let output = [['Competência', 'Nível']]


        for (let i in this.state.SkillsHumGraf) {

            // o backend devolve objetos, e eu não quero as keys, apenas os values, então vou apenas buscar os values diretamente! (pensa em dicionários)
            const Coluna = Object.values(this.state.SkillsHumGraf[i])

            output.push([Coluna[0], Number(Coluna[1])])
        }





        //GRAFICO OBTIDAS TECNICAS

        let objeto = {}

        console.log(this.state.equipagerada)

        this.state.equipagerada.forEach(utilizador => {
            const nomecoluna = utilizador.skills_utilizadores_skills[0].nome
            const valordacoluna = utilizador.skills_utilizadores_skills[0].utilizador_skills.nivel
            const tipocompetencia = utilizador.skills_utilizadores_skills[0].tipo

            if (objeto[nomecoluna]) {

                const media = (objeto[nomecoluna]['nivelmedio'] * objeto[nomecoluna]['frequencia'] + valordacoluna) / (objeto[nomecoluna]['frequencia'] + 1)
                objeto[nomecoluna]['nivelmedio'] = media
                objeto[nomecoluna]['frequencia'] = (objeto[nomecoluna]['frequencia'] + 1)
            }
            else {
                objeto[nomecoluna] = {
                    nivelmedio: valordacoluna,
                    frequencia: 1,
                    tipocompetencia: tipocompetencia
                }
            }

        });
        let DadosGraficoHum = []
        let DadosGraficoTec = []

        let NomeDosEixos = ['Competência', 'Nível']


        DadosGraficoTec.push(NomeDosEixos)
        DadosGraficoHum.push(NomeDosEixos)


        for (var nomecoluna in objeto) {

            if (objeto[nomecoluna]['tipocompetencia'] === 1) {
                DadosGraficoTec.push([nomecoluna, objeto[nomecoluna]['nivelmedio']])
            }
            else {
                DadosGraficoHum.push([nomecoluna, objeto[nomecoluna]['nivelmedio']])
            }

        };


        const {
            onChange,
            onChange1,
            onClick,
            onClick1,
            onKeyDown,
            onKeyDown1,
            state: {
                activeSuggestion,
                activeSuggestion1,
                filteredSuggestions,
                filteredSuggestions1,
                showSuggestions,
                showSuggestions1,
                inputTagValue,
                inputTagValue1,
            }
        } = this;

        let suggestionsListComponent;
        let suggestionsListComponent1;

        if (showSuggestions && inputTagValue) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li
                                    className={className}
                                    key={suggestion}
                                    onClick={onClick}
                                >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <em>Sem resultados</em>
                    </div>
                );
            }
        }

        if (showSuggestions1 && inputTagValue1) {
            if (filteredSuggestions1.length) {
                suggestionsListComponent1 = (
                    <ul class="suggestions">
                        {filteredSuggestions1.map((suggestion1, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion1) {
                                className = "suggestion-active";
                            }

                            return (
                                <li
                                    className={className}
                                    key={suggestion1}
                                    onClick={onClick1}
                                >
                                    {suggestion1}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent1 = (
                    <div class="no-suggestions">
                        <em>Sem resultados</em>
                    </div>
                );
            }
        }


        // const { valorIDProjeto } = this.props.location




        return (

            <div style={{ marginLeft: "0px", marginRight: "15px" }} >
                <div className="row no-gutters">
                    <div className="d-none d-xl-block  col-xl-2">





                        <nav id="sidebar">
                            <div className="sidebar-header">
                                <div className="intro">
                                    <div className="text-center"><img src="../imagens/bizdirectLOGO.png" alt=""
                                        className="img-fluid w-50 text-center" /></div>
                                    <div className="profile-img mb-xl-4"><img src="../imagens/fotinha.png" alt="" /></div>
                                    <h3 className="profile-usertitle-name mt-0">{JSON.parse(localStorage.getItem('Utilizador')).nome}</h3>
                                    <h4 className="profile-usertitle-job ">
                                        {JSON.parse(localStorage.getItem('Utilizador')).tipoUser === 2 ?
                                            "Team Leader" : "Developer"}
                                    </h4>
                                </div>

                            </div>
                            <hr />
                            <ul className="list-unstyled components">
                                <li>
                                    <Link to="/DEVPesquisarProjetos" className="p-3"> <img src="../imagens/projetos.svg" width="24px" alt="" />
                                        <span className="pl-3">Projetos</span></Link>
                                </li>
                                <li>
                                    <Link to="/DEVCompetenciasEditar" className="p-3"><img src="../imagens/competencias.svg" width="24px" alt="" /> <span
                                        className="pl-3">Competências</span></Link>
                                </li>
                                {JSON.parse(localStorage.getItem('Utilizador')).tipoUser === 2 ?
                                    <li>
                                        <Link to="/TLContinuarProjeto" className="p-3"><img src="../imagens/decorrer.png" width="24px" alt="" /> <span
                                            className="pl-3">Criação de Equipa</span></Link>
                                    </li>
                                    : ""}

                            </ul>

                            <ul>
                                <li className="mt-5 pt-5">
                                    <Link to="/Logout" ><img src="../imagens/sair.svg" alt="" width="24px" /><span
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
                                    <Link to="/DEVPesquisarProjetos" className="dropdown-item" ><img className="pr-1" src="../imagens/projetos.svg" width="24px"
                                        alt="" />Projetos</Link>



                                    <div className="dropdown-divider"></div>
                                    <Link to="/DEVCompetenciasEditar" className="dropdown-item" ><img className="pr-1" src="../imagens/decorrer.png" width="24px"
                                        alt="" />Competências</Link>



                                    {JSON.parse(localStorage.getItem('Utilizador')).tipoUser === 2 ?

                                        <div>
                                            <div className="dropdown-divider"></div>
                                            <Link to="/TLContinuarProjeto" className="dropdown-item" ><img className="pr-1" src="../imagens/competencias.svg" width="24px"
                                                alt="" />Criação de Equipa</Link>

                                        </div>

                                        : ""}

                                    <div className="dropdown-divider"></div>
                                    <Link to="/Logout"><img src="../imagens/sair.svg" alt="" width="24px" /><span
                                        className="pl-3 fixed_bottom">Sair</span></Link>


                                </div>
                            </div>
                        </div>
                        <h3 className="ml-4 mt-5  titulos" >Criação de Equipa</h3>
                        <div className="row justify-content-center">



                            <div className="col-lg-11 col-12 col-sm-11    my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4   bg-white  ">
                                <h5 className="pb-1 titulos font-weight-normal">Informações do Projeto</h5>
                                <hr />


                                {this.loadformaqui()}


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
                                            <div className="col-xs-9  col-xs-9 col-lg-9  col-md-8 col-xl-9">

                                                <div class="input-group ">

                                                    <input type="text" className="form-control form-control-sm my-0 py-1  " id="compTecnicas"
                                                        name="adicionar" value={this.state.inputTagValue} onKeyDown={onKeyDown} onChange={onChange} />

                                                    <div class="input-group-append">

                                                        <button class="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#59cabc" }} onClick={() => this.sendSave()}>Adicionar</button>
                                                    </div>
                                                </div>
                                                <div> {suggestionsListComponent}</div>

                                            </div>

                                        </div>



                                        <div className="row col-xl-12">
                                            <div className="col-xl-6 col-md-6 col-lg-6 pl-0 ml-md-5 ml-sm-5 ml-5  ">


                                                {this.loadFillDataTecnicas()}



                                            </div>
                                            <div className="   col-xl-5 col-md-12 col-lg-5 mt-4 col-sm-12">

                                                <Chart
                                                    width={'450px'}
                                                    height={'300px'}
                                                    chartType="PieChart"
                                                    backgroundColor={'white'}
                                                    loader={<div>Loading Chart</div>}



                                                    data={outputTecnicas}

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
                                {/* <button type="button" className="btnoutlineverde float-right">Limpar</button> */}
                            </div>


                            <div className="col-lg-11 col-12 col-sm-11    my-4 pr-5  pl-5 pt-4 pb-4   bg-white  ">
                                <h5 className="pb-1 titulos font-weight-normal">Competências Humanas</h5>
                                <hr />
                                <div className="row">

                                    <div className="row col-sm-12 col-lg-12">

                                        <div className="col-xl-6 col-md-12 mb-5 pr-0 ">

                                            <div className="col-xs-9  col-xs-9 col-lg-9  col-md-8 col-xl-9">

                                                <div class="input-group ">


                                                    <input type="text" className="form-control form-control-sm my-0 py-1  " id="compTecnicas"
                                                        name="adicionar" value={this.state.inputTagValue1} onKeyDown={onKeyDown1} onChange={onChange1} />

                                                    <div class="input-group-append">

                                                        <button class="btn btn-sm" type="button" style={{ color: "white", border: "1px black", backgroundColor: "#59cabc" }} onClick={() => this.sendSave1()}>Adicionar</button>
                                                    </div>
                                                </div>
                                                <div> {suggestionsListComponent1}</div>

                                            </div>


                                        </div>


                                        <div className="row col-xl-12 ">
                                            <div className="col-xl-6 col-md-12 col-lg-6 col-sm-12 pl-0    ml-md-5 ml-sm-5 ml-5 ">


                                                {this.loadFillDataHumanas()}


                                            </div>
                                            <div className="   col-xl-5 col-md-12 col-lg-5 mt-4 col-sm-12">
                                                <Chart
                                                    width={'450px'}
                                                    height={'300px'}
                                                    chartType="PieChart"
                                                    backgroundColor={'white'}
                                                    loader={<div>Loading Chart</div>}

                                                    data={output}

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
                                {/* <button type="button" className="btnoutlineverde float-right">Limpar</button> */}
                            </div>





                            <button id="botaodegerar" type="button" className="btnverdegrande  mb-5 col-xl-11 col-12 col-sm-11 col-sm-11  ml-xs-0   pt-3 pb-3 " onClick={() => this.geraequipa()}>Gerar Equipa</button>




                            {this.state.show === true ?



                                <div className="col-lg-11 col-12 col-sm-11  my-4 pr-5  col-sm-11 pl-5 pt-4 pb-4 mt-4 bg-white  ">
                                    <h5 className="pb-1 titulos font-weight-normal">Equipa Gerada</h5>

                                    <hr />
                                    <h6 className="mt-2 mb-5 texto">Elementos da Equipa Gerada</h6>

                                    <div className="row  mt-5  mb-5 justify-content-center">

                                        {this.state.tl.map(function (data) {
                                            return (
                                                <div>
                                                    {/* <div className="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-6 col-6  "> */}
                                                    <div className="profile-img "><img className="rounded-pill maxphotogerarequipa " src={data.fotourl} alt="" />
                                                        <div className="align-middle ">
                                                            <h3 className="profile-usertitle-name text-xs-center  font-weight-normal mt-2 ">Tu</h3>
                                                            <h4 className="profile-usertitle-job ">Líder</h4>
                                                        </div>
                                                    </div>
                                                    {/* </div> */}





                                                </div>
                                            )
                                        })}

                                        {this.carregarEquipaGerada()}

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

                                                data={outputTecnicas}

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

                                                data={output
                                                }

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

                                                    data={DadosGraficoTec}

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

                                                    data={DadosGraficoHum}

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


                                : ""}



                            {this.state.show === true ?

                                <button onClick={() => this.UpdateEquipaGerada()} type="button" className="btnverdegrande mb-5  col-xl-11 col-12 col-sm-11 col-sm-11  ml-xs-0  mt-1 pt-3 pb-3 ">Criar Equipa</button>

                                : ""}













                        </div>
                    </div>
                </div>
            </div >

        );
    }

    loadFillDataTecnicas() {



        return this.state.SkillsTec.map((data, index) => {
            return (
                <div>
                    <div key={data.id_competencia} className="row pb-2">
                        <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3">
                            <span className="my-4 font-weight-light">{data.nome_competencia} </span>
                        </div>
                        <div className="col
                        ">
                            <span className="my-4 font-weight-light">
                                <div className="slidecontainer">


                                    <input type="range"
                                        onChange={(event) =>
                                            this.handle_Slider(event.target.value, data.id_competencia, this.sendUpdate())}
                                        defaultValue={data.nivel_competencia} />

                                    <button onClick={() => this.onDelete(data.id_gerarequipa)} className="botaoremover ml-2"> <img src="../imagens/remover.png" alt="" /></button>
                                </div>
                            </span>
                        </div>


                    </div>

                </div>
            )
        })

    }





    loadFillDataHumanas() {


        return this.state.SkillsHum.map((data, index) => {
            return (
                <div>
                    <div key={data.id_competencia} className="row pb-2">
                        <div className="col-md-3 col-sm-3 col-xs-3 col-3 col-lg-3">
                            <span className="my-4 font-weight-light">{data.nome_competencia} </span>
                        </div>
                        <div className="col">
                            <span className="my-4 font-weight-light">
                                <div className="slidecontainer">


                                    <input type="range"
                                        onChange={(event) =>
                                            this.handle_Slider1(event.target.value, data.id_competencia, this.sendUpdate1())}
                                        defaultValue={data.nivel_competencia} />

                                    <button onClick={() => this.onDelete(data.id_gerarequipa)} className="botaoremover ml-2"> <img src="../imagens/remover.png" alt="" /></button>
                                </div>
                            </span>
                        </div>


                    </div>

                </div>
            )
        })
    }


    sendSave() {
        const Url = HerokuURL + "/gerar_equipa/createTec"

        const datapost = {

            tagsTecArmazena: this.state.inputTagValue,

        }


        axios.post(Url, datapost)

            .then(response => {

                if (response.data.status === 200) {

                }

                else {

                    // this.Load_skillsTecnicas()
                    this.resetForm()
                    this.Load_ComTecdaGerEq()
                    this.Load_ComTecdaGerEqGraf()


                }

            }).catch(error => {
                alert("Error 34 " + error)
            })
        //  this.Load_skillsTecnicas()
        // window.location.reload()


    }

    onDelete(id_utilizadorskill) {
        //console.log(" *** "+id_utilizadorskill)
        Swal.fire({
            title: 'Tem a certeza que quer apagar?',
            text: 'Não irá conseguir recuperar novamente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, Apagar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.sendDelete(id_utilizadorskill)
                //console.log("Alerta " + id_utilizadorskill)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'Competência não apagada',
                    'Erro'
                )
            }
        })
    }

    sendDelete(userId) {
        //url de backend
        const Url = HerokuURL + "/gerar_equipa/delete/" + userId;

        axios.post(Url)
            //alert("Alerta " + userId)
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Apagado',
                        'A competência foi apagada.',
                        'Apagado com sucesso!'
                    )
                }
                this.Load_ComTecdaGerEq()
                this.Load_ComHumdaGerEq()
                this.Load_ComHumdaGerEqGraf()
                this.Load_ComTecdaGerEqGraf()
            }).catch(error => {
                alert("Error 325 ")
            })
    }



    sendSave1() {
        const Url = HerokuURL + "/gerar_equipa/createHum"

        const datapost = {

            tagsHumArmazena: this.state.inputTagValue1,

        }


        axios.post(Url, datapost)
            .then(response => {
                if (response.data.status === 200) {

                }
                else {
                    // alert(response.data.message)

                    this.resetForm()
                    this.Load_ComHumdaGerEq()
                    this.Load_ComHumdaGerEqGraf()

                }

            }).catch(error => {
                alert("Error 34 " + error)
            })
        // window.location.reload()
    }



    sendUpdate() {

        const url = HerokuURL + "/gerar_equipa/update/" + this.state.valorescompetencia[1]
        // parametros de datos post
        console.log(this.state.valorescompetencia[1], this.state.valorescompetencia[0])

        const datapost = {
            nivel_competencia: this.state.valorescompetencia[0],
            id_competencia: this.state.valorescompetencia[1],

        }

        axios.put(url, datapost)
            .then(response => {
                if (response.data.success === true) {

                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Erro ao guardar os seus dados." + error)
            })
        this.Load_ComHumdaGerEqGraf()
        this.Load_ComTecdaGerEqGraf()

    }


    sendUpdate1() {


        const url = HerokuURL + "/gerar_equipa/update/" + this.state.valorescompetencia1[1]
        // parametros de datos post
        console.log(this.state.valorescompetencia1[1], this.state.valorescompetencia1[0])

        const datapost = {
            nivel_competencia: this.state.valorescompetencia1[0],
            id_competencia: this.state.valorescompetencia1[1],

        }

        axios.put(url, datapost)
            .then(response => {
                if (response.data.success === true) {

                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Erro ao guardar os seus dados." + error)
            })
        this.Load_ComHumdaGerEqGraf()
        this.Load_ComTecdaGerEqGraf()
    }




    UpdateEquipaGerada() {

        const url = HerokuURL + "/utilizador_equipas/create/"

        const datapost = {

            ElementosEq: this.state.equipagerada,
            IDEquipa: this.state.projeto[0].equipa_id_equipa_projeto
        }
        axios.post(url, datapost)
            .then(response => {
                if (response.data.success === true) {

                    this.props.history.push("/TLContinuarProjeto");
                    window.location.reload()
                }
                else {

                    alert("Error")
                }
            }).catch(error => {
                alert("Erro ao guardar os seus dados." + error)
            })

            const url2 = HerokuURL + "/gerar_equipa/apagargerarequipa"



            const datapost2 = {
    
    

                ElementosEq: this.state.equipagerada,
                IDEquipa: this.state.projeto[0].equipa_id_equipa_projeto
            }
            axios.post(url2, datapost2)
                .then(response => {
                    if (response.data.success === true) {
    
                    }
                    else {
                        
                        alert("Error")
                    }
                }).catch(error => {
                    alert("Erro ao guardar os seus dados." + error)
                })




    }

    geraequipa() {

       
        console.log(this.state.CompEscolhidas)

        const Url = HerokuURL + "/gerar_equipa/GerarEquipa"

        axios.post(Url, { id_projeto: this.state.projeto[0].id_projeto }, { headers: authHeaders() })

            .then(res => {

                if (res.data.success === true) {
                    const CompEscolhidas = res.data.data;

                    this.setState({ equipagerada: CompEscolhidas });


                    console.log(this.state.equipagerada.length)

                    if (this.state.equipagerada.length === 0) {

                        this.state.show = false
                        alert("Selecione as competências pretendidas")
                     

                
                    }
                    else {

                        this.Load_ComTecdaGerEq()
                        this.Load_ComHumdaGerEq()
                        this.Load_ComHumdaGerEqGraf()
                        this.Load_ComTecdaGerEqGraf()
                        this.state.show = true
                  
                    }

                } else {
                    alert("Error Web Service!");
                    // this.Load_ComTecdaGerEq()
                    // this.Load_ComHumdaGerEq()
                    this.state.show = false
                }
            })

            .catch(error => {
                alert(error)
            });

    }







    // }


    carregarEquipaGerada() {

        return this.state.equipagerada.map((data, index) => {
            return (

                <div className="profile-img ml-4 "><img className="rounded-pill maxphotogerarequipa " src={data.fotourl} alt="" />
                    <div className="align-middle ">
                        <h3 className="profile-usertitle-name text-xs-center  font-weight-normal mt-2 ">{data.nome}</h3>
                    </div>
                </div>
            )
        });


    }

    loadformaqui() {

        return this.state.projeto.map((data, index) => {
            return (

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

                            <label className="semheight" >Disponibilidade:</label>

                        </div>

                        <div className="col-xl-12  pr-0 pl-0">
                            <div className="custom-control custom-switch">


                                {(data.disponibilidade === 1 ?
                                    (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}

                                <label
                                    className="custom-control-label"
                                    htmlFor="customSwitch1"
                                >
                                    Para Viajar
</label>
                            </div>

                        </div>

                        <div className="col-xl-12  col-md-3 pl-0 pr-0 ">
                            <div className="custom-control custom-switch">
                                {(data.hora_extra === 1 ?
                                    (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch2" />))}
                                <label
                                    className="custom-control-label"
                                    htmlFor="customSwitch2"
                                >
                                    Horas Extra
                </label>
                            </div>

                        </div>

                        <div className="col-xl-12  col-md-3 pl-0 pr-0 ">
                            <div className="custom-control custom-switch">
                                {(data.reunircliente === 1 ?
                                    (<input type="checkbox" checked disabled className="custom-control-input" id="customSwitch1" />) : (<input type="checkbox" disabled className="custom-control-input" id="customSwitch1" />))}
                                <label
                                    className="custom-control-label"
                                    htmlFor="customSwitch3"
                                >
                                    Para reunir com cliente
                </label>
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
            )
        })
    }

}

export default TLCriacaoProjeto;