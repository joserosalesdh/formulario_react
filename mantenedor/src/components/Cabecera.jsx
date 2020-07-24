import React, {Component} from 'react';

//Para que los elementos se vean en una misma fila y no de arrriba asi abajo...
const styles = {
    inline: {
        display: 'inline'
    }
}

class Cabecera extends Component {
    render(){
        const {nuevoUsuario} = this.props
        return(
            <header>
                <h2 style= {styles.inline}>Usuarios</h2>
                <button onClick={nuevoUsuario} style = {styles.inline}>Nuevo usuario</button>
            </header>
        )
    }
}
export default Cabecera