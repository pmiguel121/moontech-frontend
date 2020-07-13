import React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import AuthService from "./view/auth.service";
//import Profile from "./view/profile";

//Fotos
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import api from './services/api';

import IndexSite from "./view/inicial";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './main1.css';
import './util.css';
import './base.css';

import RHPesquisarDev from './view/RHPesquisarDev';

// import IndexSite from './view/inicial';
import DevEditarPerfil from './view/DevEditarPerfil';
import DEVCompetenciasEditar from './view/DEVCompetenciasEditar';
import DEVPerfil from './view/DEVPerfil';
import DEVPesquisarProjetos from './view/DEVPesquisarProjetos';

import RHAdicionarCompetencias from './view/RHAdicionarCompetencias';
import RHAdicionarDev from './view/RHAdicionarDev';
import RHCriarProjetos from './view/RHCriarProjetos';
import RHDashboard from './view/RHDashboard';
import RHPesquisarCompetenciasHumanas from './view/RHPesquisarCompetenciasHumanas';
import RHPesquisarCompetenciasTecnicas from './view/RHPesquisarCompetenciasTecnicas';
import RHatribuirPapeisTL from './view/RHatribuirPapeisTL';

import RHPesquisarProjetos from './view/RHPesquisarProjetos';

import TLContinuarProjeto from './view/TLContinuarProjeto';
import TLCriarProjeto from './view/TLCriarProjeto';

export const Role = {
  DEV: 1,
  TL: 2,
  RH: 3,
}

export const PrivateRoute = ({
  component: Component, roles, ...rest
}) => (
    <Route
      {...rest}

      render={(props) => {

        const currentUser = JSON.parse(localStorage.getItem('Utilizador')) //Vai armazenar o utilizador
        if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.tipoUser) === -1) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: '/' }} />
        }

        // authorised so return component
        return <Component {...props} />
      }}
    />
  )


function Logout() {
  if (AuthService.getCurrentUser()) {
    AuthService.logout()
  }
  return <Redirect to="/" />
}

class GestorCompetencias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { email: "" },
      uploadedFiles: [],
    };

  }

  // async componentDidMount() {
  //   const response = await api.get("posts");
  //   this.setState({
  //     uploadedFiles: response.data.map(file => ({
  //       id: file._id,
  //       name: file.name,
  //       readableSize: filesize(file.size),
  //       preview: file.url,
  //       uploaded: true,
  //       url: file.url
  //     }))
  //   });
  // }

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };

  processUpload = uploadedFile => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    api
      .post("posts", data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress
          });
        }
      })
      .then(response => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true
        });
      });
  };

  handleDelete = async id => {
    await api.delete(`posts/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
  
   
    return (
      <Router>
        <div>

          <Switch>
            <Route path="/Logout" exact component={Logout} />
            <Route path="/" exact component={IndexSite} />
            <PrivateRoute path="/DEVCompetenciasEditar" exact component={DEVCompetenciasEditar} roles={[Role.DEV, Role.TL]} />
            <PrivateRoute path="/DevEditarPerfil" exact component={DevEditarPerfil} roles={[Role.DEV, Role.TL]} />
            <PrivateRoute path="/DEVPerfil" exact component={DEVPerfil} roles={[Role.DEV, Role.TL]} />
            <PrivateRoute path="/DEVPesquisarProjetos" exact component={DEVPesquisarProjetos} roles={[Role.DEV, Role.TL]} />
            <PrivateRoute path="/RHAdicionarCompetencias" exact component={RHAdicionarCompetencias} roles={[Role.RH]} />
            <PrivateRoute path="/RHAdicionarDev" exact component={RHAdicionarDev} roles={[Role.RH]} />
            <PrivateRoute path="/RHatribuirPapeisTL" exact component={RHatribuirPapeisTL} roles={[Role.RH]} />
            <PrivateRoute path="/RHCriarProjetos" exact component={RHCriarProjetos} roles={[Role.RH]} />
            <PrivateRoute path="/RHDashboard" exact component={RHDashboard} roles={[Role.RH]} />
            <PrivateRoute path="/RHPesquisarCompetenciasHumanas" exact component={RHPesquisarCompetenciasHumanas} roles={[Role.RH]} />
            <PrivateRoute path="/RHPesquisarCompetenciasTecnicas" exact component={RHPesquisarCompetenciasTecnicas} roles={[Role.RH]} />
            <PrivateRoute path="/RHPesquisarDev" exact component={RHPesquisarDev} roles={[Role.RH]} />
            <PrivateRoute path="/RHPesquisarProjetos" exact component={RHPesquisarProjetos} roles={[Role.RH]} />
            <PrivateRoute path="/TLContinuarProjeto" exact component={TLContinuarProjeto} roles={[Role.TL]} />
            <PrivateRoute path="/TLCriarProjeto/:id" exact component={TLCriarProjeto} roles={[Role.TL]} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default GestorCompetencias;
