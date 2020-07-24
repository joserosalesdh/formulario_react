import React, {Component} from 'react';

class Lista extends Component {
//Necesito obtene rel id de los usuario para eso hago un metodo
//Currying es un patron utilizado en programación funcional que se basa en const suma = a => b => a + b... esto me va a contruir un afuncion que va a recibir un argumento y este me va a retornar otra funcion que le voy a decir const suma1 = suma(1).. si nosotros mriamos suma1 va a ser una funcion que recibe b y me a retornar la suma de a + b
handleClick = id => e => {
    const {handleClick} = this.props
    // Desde un componente hijo en este caso lista vamos a pasarle datos al padre App desde el componente hijo
    handleClick(id)
}

    render(){
        const {data}= this.props
        // Imprimir una colección de usuarios dentro de un listado 


        return(
            <ul>
                {data.map(x => 
                //Agrego una key xq cada vez que nosotros iteramos un elemento con map, react nos exige que le agregos una propieddad de key al elemento padre de manera que pueda identificar cual e scada elemento
                    <li key={x.id}>{x.name}<button onClick={this.handleClick(x.id)}>Editar</button></li>
                )}
            </ul>
        )
    }
}
export default Lista