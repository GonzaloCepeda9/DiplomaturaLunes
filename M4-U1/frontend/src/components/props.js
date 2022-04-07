const EjemploProps01 = props => {
    return (<h3>Hola {props.nombre}</h3>)
};

const EjemploProps02 = props => {
    const {elementos} = props;
    return (
        <ul>
            {elementos.map(elemento => <li key={elemento}>{elemento}</li>)}
        </ul>
    )
}