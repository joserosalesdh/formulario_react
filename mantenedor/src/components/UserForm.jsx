import React, {Component} from 'react';



const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Este campo es obligatorio'
    }
    if (!values.email) {
        errors.email = 'Este campo es obligatorio'
    }
    if (!values.wesite) {
        errors.website = 'Este campo es obligatorio'
    }
        return errors
}
class UserForm extends Component {
    state = {
        errors:{}
    }

    constructor(props){
        super(props)
        this.state = {
            ...this.state,
            ...props.valoresIniciales //dentro de las propiedades vamos a sacar sus valores iniciales
        }
    }
    handleChange = ({target}) => { // Saco la propiedad target del evento e con destructuring
        this.setState({
            [target.name]: target.value, //a la propiedad dinamica target.name le vamos a asignar target.value
        })
    }

    handleSubmit = e => {
        e.prevenetDefault()
        const {errors, ...sinErrors} = this.state
        const result = validate(sinErrors)
        
        // Hago un if para validar de que el formulario no tenga ningun error, en la logica dice que si existe por lo menos un error se va a evaluar en tru y con la negacion en falso
        if(!Object.keys(result).length){
            const {handleSubmit, handleUpdate, valoresIniciales} = this.props
            if (valoresIniciales.id) { //Si tiene un id
                handleUpdate(valoresIniciales.id, sinErrors)
            }else{ //En el caso de que no tenga un id
                handleSubmit(sinErrors)
            }
            //Envio del formulario
            //e.target.reset() no es necesario, agrego un else abajo para que de si es que llegase a existir un error en ese caso setea el estado
        }else{
            this.setState({errors: result}) 
        }
    }
    render(){
        const {errors} = this.state
        const {valoresIniciales} = this.props // valoresIniciales va a contar con un id que se lo vamos a pasar cuando s ellame al evento de handleSubmit 
        return(
            <form onSubmit={this.handleSubmit}>
                <input defaultValue={valoresIniciales.name} placeholder="Nombre" type="text" name="name" onChange={this.handleChange}/>
                {errors.name && <p>{errors.name}</p>}
                <input defaultValue={valoresIniciales.email} placeholder="Email" type="text" name="email" onChange={this.handleChange}/>
                {errors.email && <p>{errors.email}</p>}
                <input defaultValue={valoresIniciales.website} placeholder="Sitio Web" type="text" name="website" onChange={this.handleChange}/>
                {errors.website && <p>{errors.website}</p>}
                <input type="submit" value="Enviar"/>
            </form>
        )
    }
}
export default UserForm