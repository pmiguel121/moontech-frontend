import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const HerokuURL = "https://moontech-backend.herokuapp.com/";

var Chart = require("react-google-charts").Chart;


class RHDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contagem: null,
            ContarDevs: null,
            ContarSkills: null,

            utilizador: [],

            GraficoTecnicas: [],
            GraficoHumanas: [],

        }

    }


    componentDidMount() {
        this.Load_ContagemAtivos();
        this.Load_ContagemConcluidos();
        this.Load_ContarDevs();
        this.Load_ContarSkills();
        this.Load_foto();
        this.Load_graficosHumanos()
        this.Load_graficosTecnicos()
    }

    Load_graficosHumanos() {
        const url = HerokuURL + "/skill/CompMaisUsadasHumanas";
        axios.get(url).then(res => {
            if (res.data.success) {
                const data = res.data.data;
                this.setState({ GraficoHumanas: data });
            } else {
                alert("Error Web Service!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }

    Load_graficosTecnicos() {
        const url = HerokuURL + "/skill/CompMaisUsadasTecnicas";
        axios.get(url).then(res => {
            if (res.data.success) {
                const data = res.data.data;
                this.setState({ GraficoTecnicas: data });
            } else {
                alert("Error Web Service!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }

    Load_foto() {
        let id_utilizador = JSON.parse(localStorage.getItem('Utilizador')).nrUser

        console.log(id_utilizador)
        const url = HerokuURL + "/utilizador/get/" + id_utilizador
        axios.get(url)

            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ utilizador: data });

                } else {
                    alert("Erro no Servidor Web!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    Load_ContagemAtivos() {

        const url = HerokuURL + "/projeto/ContagemAtivos"
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ ContagemAtivos: data });


            } else {
                alert("Erro no Servidor Web!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }
    Load_ContagemConcluidos() {

        const url = HerokuURL + "/projeto/ContagemConcluidos"
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ ContagemConcluidos: data });


            } else {
                alert("Erro no Servidor Web!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }

    Load_ContarDevs() {
        const url = HerokuURL + "/utilizador/ContarDevs"
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ ContarDevs: data });


            } else {
                alert("Erro no Servidor Web!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }
    Load_ContarSkills() {
        const url = HerokuURL + "/skill/ContarSkills"
        axios.get(url).then(res => {


            if (res.data.success) {
                const data = res.data.data;
                this.setState({ ContarSkills: data });


            } else {
                alert("Erro no Servidor Web!");
            }
        })
            .catch(error => {
                alert(error)
            });
    }

    render() {


        //DADOS GRAFICOS TECNICAS DECLARADOS
        let outputTecnicas = [['Competência', 'Nível']]



        for (let x in this.state.GraficoTecnicas) {
            const ColunaTec = Object.values(this.state.GraficoTecnicas[x])

            outputTecnicas.push([ColunaTec[0], Number(ColunaTec[1])])
        }


        //FIM DADOS GRAFICOS TECNICAS DECLARADOS


        //DADOS GRAFICOS HUMANOS DECLARADOS


        let output = [['Competência', 'Nível']]


        for (let i in this.state.GraficoHumanas) {

            // o backend devolve objetos, e eu não quero as keys, apenas os values, então vou apenas buscar os values diretamente! (pensa em dicionários)
            const Coluna = Object.values(this.state.GraficoHumanas[i])

            output.push([Coluna[0], Number(Coluna[1])])
        }
        //FIM DADOS GRAFICOS HUMANOS DECLARADOS




        return this.state.utilizador.map((data, index) => {
            return (

                <div style={{ marginLeft: "0px", marginRight: "15px" }} >
                    <div className="row no-gutters">
                        <div className="d-none d-xl-block  col-xl-2 ">



                            <nav id="sidebar">
                                <div className="sidebar-header">
                                    <div className="intro">
                                        <div className="text-center"> <img src="imagens/bizdirectLOGO.png" alt=""
                                            className="img-fluid w-50 text-center" /> </div>
                                        <Link to="/RHDashboard"><div className="profile-img mb-xl-4 "> <img className="profile-img maxphotosidebar" src={data.fotourl} alt="Foto de Perfil" /> </div></Link>
                                        <h3 className="profile-usertitle-name mt-0">{JSON.parse(localStorage.getItem('Utilizador')).nome}</h3>
                                        <h4 className="profile-usertitle-job ">Recursos Humanos</h4>
                                    </div>

                                </div>
                                <hr />
                                <ul className="list-unstyled components">
                                    <li>
                                        <Link to="/RHDashboard" className="p-3">
                                            {" "}
                                            <img src="imagens/dashboard.svg" width="24px" alt="" />
                                            <span className="pl-3">Dashboard</span></Link>
                                    </li>
                                    <li>
                                        <a href="#pageSubmenu" className="p-3" data-toggle="collapse" aria-expanded="false">
                                            {" "}
                                            <img
                                                src="imagens/Developer.svg" width="24px" alt="" /><span className="pl-3">Developers</span></a>

                                        <ul className="collapse list-unstyled" id="pageSubmenu">
                                            <li>
                                                <Link to="/RHAdicionarDev">Adicionar Developer</Link></li>
                                            <li><Link to="/RHPesquisarDev">Pesquisar Developer</Link></li>
                                            <li><Link to="/RHatribuirPapeisTL">Atribuir papéis</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#CompSubmenu" className="p-3" data-toggle="collapse" aria-expanded="false"> <img
                                            src="imagens/Competencias.svg" alt="" width="24px" /><span
                                                className="pl-3">Competências</span></a>
                                        <ul className="collapse list-unstyled" id="CompSubmenu">
                                            <li><Link to="/RHPesquisarCompetenciasTecnicas">Competências Técnicas</Link></li>
                                            <li><Link to="/RHPesquisarCompetenciasHumanas">Competências Humanas</Link></li>
                                            <li><Link to="/RHAdicionarCompetencias">Adicionar Competências</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#homeSubmenu" className="p-3" data-toggle="collapse" aria-expanded="false"><img
                                            className="prj_icon" src="imagens/Projetos.svg" alt="" width="24px" />
                                            <span className="pl-3">Projetos</span></a>
                                        <ul className="collapse list-unstyled" id="homeSubmenu">
                                            <li><Link to="/RHCriarProjetos">Criar Projetos</Link></li>
                                            <li><Link to="/RHPesquisarProjetos">Pesquisar Projetos</Link></li>
                                        </ul>
                                    </li>

                                </ul>

                                <ul>
                                    <li className="mt-5 pt-5">
                                        <Link to="/Logout"><img src="imagens/sair.svg" alt="" width="24px" /><span
                                            className="pl-3 fixed_bottom">Sair</span></Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>


                        <div className="col-xl-10">
                            <div className=" my-5">

                                <div className="container-fluid d-xl-none p-3 text-right">
                                    <div className="dropdown">
                                        <button type="button" className="btn btn-primary" data-toggle="dropdown" id="sidebarCollapse"></button>
                                        <div className="dropdown-menu">
                                            <div className="dropdown-header"></div>
                                            <Link to="/RHDashboard" className="dropdown-item" ><img className="pr-1" src="imagens/dashboard.svg" width="24px"
                                                alt="" />Dashboard</Link>
                                            <div className="dropdown-divider"></div>
                                            <h5 className="dropdown-header"><img className="pr-1" src="imagens/developer.svg" width="24px"
                                                alt="" />Developers</h5>
                                            <Link to="/RHAdicionarDev" className="dropdown-item" >Adicionar developer</Link>
                                            <Link to="/RHPesquisarDev" className="dropdown-item" >Pesquisar developer</Link>
                                            <Link to="/RHatribuirPapeisTL" className="dropdown-item" >Atribuir papéis</Link>
                                            <div className="dropdown-divider"></div>
                                            <h5 className="dropdown-header"><img className="pr-1" src="imagens/Competencias.svg" width="24px"
                                                alt="/" />Competências</h5>
                                            <Link to="/RHPesquisarCompetenciasTecnicas" className="dropdown-item" >Competências técnicas</Link>
                                            <Link to="/RHPesquisarCompetenciasHumanas" className="dropdown-item" >Competências humanas</Link>
                                            <Link to="/RHAdicionarCompetencias" className="dropdown-item" >Adicionar competências</Link>
                                            <div className="dropdown-divider "></div>
                                            <h5 className="dropdown-header"><img className="pr-1" src="imagens/projetos.svg" width="24px"
                                                alt="" />Projetos</h5>

                                            <Link to="/RHCriarProjetos" className="dropdown-item" >Criar projetos</Link>
                                            <Link to="/RHPesquisarProjetos" className="dropdown-item" >Pesquisar projetos</Link>


                                            <div className="dropdown-divider"></div>
                                            <Link to="/Logout"><img src="imagens/sair.svg" alt="" width="24px" /><span
                                                className="pl-3 fixed_bottom">Sair</span></Link>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12  ">

                                <h3 className="ml-4  titulos"> Dashboard</h3>


                                <div className="row my-4 col-lg-12  ml-1 ">
                                    <div className="col-lg-3 col-xl-3 col-sm-6 col-6 col-12 ">

                                        <div className="card amarelo order-card">
                                            <div className="card-block ">
                                                <h6>Projetos a decorrer</h6>
                                                <div className="row ">
                                                    <div className="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-6 text-left" >
                                                        <h2 className="p-0 mt-1"> {this.state.ContagemAtivos} </h2>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-2 col-md-5 col-sm-6 col-6 text-right">
                                                        <img src="imagens/decorrer2.png" alt="icone de projetos a decorrer" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-xl-3 col-sm-6 col-6 col-12">
                                        <div className="card laranja order-card">
                                            <div className="card-block">
                                                <h6>Projetos concluídos</h6>
                                                <div className="row ">
                                                    <div className="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-6 text-left" >
                                                        <h2 className="p-0 mt-1"> {this.state.ContagemConcluidos} </h2>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-2 col-md-5 col-sm-6 col-6 text-right">
                                                        <img src="imagens/concluidos.png" alt="icone de projetos a decorrer" />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-xl-3 col-sm-6 col-6 col-12">
                                        <div className="card verde order-card">
                                            <div className="card-block">
                                                <h6>Developers</h6>
                                                <div className="row ">
                                                    <div className="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-6 text-left " >
                                                        <h2 className="p-0 mt-1"> {this.state.ContarDevs} </h2>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-2 col-md-5 col-sm-6 col-6 text-right">
                                                        <img src="imagens/developers.png" alt="icone de projetos a decorrer" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-xl-3 col-sm-6 col-6 col-12">
                                        <div className="card vermelho order-card  ">
                                            <div className="card-block ">
                                                <h6>Total de competências</h6>
                                                <div className="row ">
                                                    <div className="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-6 text-left" >
                                                        <h2 className="p-0 mt-1"> {this.state.ContarSkills}</h2>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-2 col-md-5 col-sm-6 col-6 text-right">
                                                        <img src="imagens/totalcompetencias.png" alt="icone de projetos a decorrer" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>




                                <div className="row justify-content-center">
                                    <div className="col-lg-5 col-md-12 ">
                                        <div className="row justify-content-center">
                                            <div className=" col-lg-11 col-12 col-sm-11     mr-lg-4 mr-sm-0  my-4 pr-5 pl-5 pt-4 pb-4  bg-white">

                                                <h5 className="pb-1 titulos font-weight-normal">Competências Técnicas Dominantes</h5>
                                                <hr />


                                                {/* <Radar data={radarData} />
                                     */}
                                                <Chart
                                                    width={'350px'}
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
                                            <div className="col-12 col-sm-11 col-lg-11  mr-lg-4  mr-sm-0   my-4 pr-5 pl-5 pt-4 pb-4  bg-white">

                                                <h5 className="pb-1 titulos font-weight-normal">Competências Humanas Dominantes</h5>
                                                <hr />

                                                <Chart
                                                    width={'350px'}
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
                                    <div className="col-lg-6  col-md-11 col-sm-11 col-12  ml-lg-4 ml-sm-0    my-4 pr-5 pl-5 pt-4 pb-4 bg-white">

                                        <h5 className="pb-1 titulos font-weight-normal">Notificações</h5>
                                        <hr />



                                        <ul className="list-group list-group-flush font-weight-light ">
                                            <li className="list-group-item list-group-item-action ">
                                                <div className="d-flex w-100 justify-content-end mb-1">
                                                    <small className="font-weight-light">2 days ago</small>
                                                </div>

                                                <div className="mb-1 row align-top">
                                                    <div className="col-md-2 col-4 col-sm-3 col-lg-3">
                                                        <img className="pr-4 " src="imagens/teste.png" alt="" />
                                                    </div>
                                                    <div className=" col-md-5 col-8  col-sm-9 col-lg-9 mb-1">
                                                        Developer adicionou a competência "Organização" ao seu perfil.
                                    </div>
                                                </div>
                                                <div className="d-flex w-100 justify-content-end mb-2">
                                                    <button type="button" className="btnaprovar" >Aprovar</button>
                                                    <button type="button" className="botaorejeitar" >Rejeitar</button>
                                                </div>
                                            </li>
                                        </ul>




                                        <ul className="list-group list-group-flush  font-weight-light ">
                                            <li className="list-group-item list-group-item-action ">
                                                <div className="d-flex w-100 justify-content-end mb-1">
                                                    <small className="font-weight-light">2 days ago</small>
                                                </div>
                                                <div className=" row align-top">
                                                    <div className="col-md-2 col-4 col-sm-3 col-lg-3">
                                                        <img className="pr-4 " src="imagens/teste.png" alt="" />
                                                    </div>
                                                    <div className="col-md-10 col-8 col-sm-9 col-lg-9 mb-1">
                                                        O developer x foi movido para o projeto x pelo líder z.
                                    </div>
                                                </div>
                                                <div className="d-flex w-100 justify-content-end mb-1 mb-2">
                                                    <button type="button" className="btnaprovar" >Aprovar</button>
                                                    <button type="button" className="botaorejeitar" >Rejeitar</button>
                                                </div>
                                            </li>
                                        </ul>

                                        <ul className="list-group list-group-flush  font-weight-light ">
                                            <li className="list-group-item list-group-item-action  ">
                                                <div className="d-flex w-100 justify-content-end mb-1">
                                                    <small className=" font-weight-light">3 days ago</small>
                                                </div>
                                                <div className=" row align-top">
                                                    <div className="col-md-2 col-4 col-sm-3 col-lg-3">
                                                        <img className="pr-4 " src="imagens/teste.png" alt="" />
                                                    </div>
                                                    <div className="col-md-10 col-8 col-sm-9 col-lg-9 mb-1">
                                                        O developer M foi movido para o projeto G pelo líder F.
                                    </div>
                                                </div>
                                                <div className="d-flex w-100 justify-content-end mb-1 mb-2">
                                                    <button type="button" className="btnaprovar" >Aprovar</button>
                                                    <button type="button" className="botaorejeitar" >Rejeitar</button>
                                                </div>
                                            </li>
                                        </ul>
                                        <ul className="list-group list-group-flush font-weight-light ">
                                            <li className="list-group-item list-group-item-action ">
                                                <div className="d-flex w-100 justify-content-end mb-1">
                                                    <small className=" font-weight-light">3 days ago</small>
                                                </div>
                                                <div className=" row align-top">
                                                    <div className="col-md-2 col-4 col-sm-3 col-lg-3">
                                                        <img className="pr-4  mb-4" src="imagens/teste.png" alt="" />
                                                    </div>
                                                    <div className="col-md-10 col-8 col-sm-9 col-lg-9 mb-1 mb-4">
                                                        Aceitou o pedido de adição da competência “Adobe After Effects” ao perfil do
                                                        developer Y.
                                    </div>
                                                </div>

                                            </li>
                                        </ul>
                                        <ul className="list-group list-group-flush font-weight-light ">
                                            <li className="list-group-item list-group-item-action ">
                                                <div className="d-flex w-100 justify-content-end mb-1">
                                                    <small className=" font-weight-light">4 days ago</small>
                                                </div>
                                                <div className=" row align-top">
                                                    <div className="col-md-2 col-4 col-sm-3 col-lg-3">
                                                        <img className="pr-4 " src="imagens/teste.png" alt="" />
                                                    </div>
                                                    <div className="col-md-10 col-8 col-sm-9 col-lg-9 mb-1 mb-4">
                                                        Aceitou o pedido de adição da competência “Adobe Photoshop” ao perfil do
                                                        developer Y.
                                    </div>
                                                </div>

                                            </li>
                                        </ul>

                                    </div>

                                </div>

                            </div>
                        </div>


                    </div>
                </div>


            );
        });
    }

}

export default RHDashboard;
