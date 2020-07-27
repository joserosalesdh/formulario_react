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

  agregarNuevoUsuario = usuario => {
    // Vamos a simular un llamado a la API con un axios 
    axios.post('https://jsonplaceholder.typicode.com/users', usuario)
    console.log(usuario)
    .then(({data}) => {
      const newData =  this.state.data.concat(data) //Todos los datos que se encuetra dentro de la propiedad del estado y lo vamos a concatenar con data
      this.setState({
        data: newData,
        ruta: 'lista'
      })
    })
  }

  actualizarNuevoUsuario = (id, values) => { // Cuando tomo el id voy a construir la url a la cual yo tengo que enviarle los datos para actualizar el recursos y le voy a enviar los nuevos valores que necesita para actualizar y uso axios.put
    axios.put(`https://jsonplaceholder.typicode.com/users/$(id)`, values) // Uso en vez de comillas simple Template String me van a servir para construir string dinamicos, esto quiere decir que van a ir cambiando dependiendo d elos valore que yo le asigne  
    .then(()=> {
      const newData = this.state.data.map(x => x.id === id ? values :x) // Si encontramos el elemento aca lo que vamos a hacer es remplazarlo por lo que viene en values
    this.setState({
      data: newData,
      ruta: 'lista'
    })
    })
  }

  nuevoUsuario = () =>{
    this.setState({ruta: 'formulario', usuarioSeleccionado: undefined})
  }
  render(){
    const {ruta, data, usuarioSeleccionado} = this.state
    const valoresIniciales = usuarioSeleccionado && data.find(x => x.id === usuarioSeleccionado) //Si usuario seleccionado se encuentra definido
    return (
      <div className="App">
        {/* Los datos que vamos a recibir de nuestra APi se lo tenemos que pasar a nuestro ViewList */}
        {ruta === 'lista' && <ViewList 
        nuevoUsuario={this.nuevoUsuario}
        handleClick={this.seleccionaUsuario} 
        data={data}
        />}
        {ruta === 'formulario' && <UserForm 
        valoresIniciales={valoresIniciales || {}} // Si valoresIniciales no esta definido en ese caso quiero que tenga el valor d eun objeto, de esta manera en el forma vamos a poder preguntar por las propiedades de los valores iniciales y si es que se encuentra indefinido vamos a poder preguntar de todas maneras por las propiedades xq se nos va a devolver un objeto que va a tener sus propiedades indefinidas, pero lo que va a hacer es devolvernos undefined en lugar de crashear
        handleSubmit={this.agregarNuevoUsuario}
        handleUpdate={this.actualizarNuevoUsuario}
        />}
      </div>
    );
  }
}

export default App;
