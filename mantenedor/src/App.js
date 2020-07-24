import React, {Component} from 'react';
import axios from 'axios'
import './App.css';
import UserForm from './components/UserForm'
import ViewList from './components/ViewList'

class App extends Component {
  state = {
    data: [],
    ruta: 'lista', //La ruta puede cambiar por lista o formulario
  }
  constructor(){
    super()
    axios.get('https://jsonplaceholder.typicode.com/users')
    // Esto devuelve una promesa y lo que nosotros nos interesa de la api es la data, los datos los vamos a agregar a la propiedad del estado
    .then(({data}) => this.setState({data}))
  }
  seleccionaUsuario = id =>{
    this.setState({
      ruta: 'formulario',
      usuarioSeleccionado: id,
      // Este atributo de usuario seleccionado lo vamos a agregar al array vacio de data en el state y lo vamos a utilizar cuando nos encontramos en la vista d euserForm
    })
  }
  nuevoUsuario = () =>{
    this.setState({ruta: 'formulario'})
  }
  render(){
    const {ruta, data} = this.state
    return (
      <div className="App">
        {/* Los datos que vamos a recibir de nuestra APi se lo tenemos que pasar a nuestro ViewList */}
        {ruta === 'lista' && <ViewList 
        nuevoUsuario={this.nuevoUsuario}
        handleClick={this.seleccionaUsuario} 
        data={data}
        />}
        {ruta === 'formulario' && <UserForm />}
      </div>
    );
  }
}

export default App;
