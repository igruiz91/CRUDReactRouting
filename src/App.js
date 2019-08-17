import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Producto from './components/Producto';
import Productos from './components/Productos';
import EditarProductos from './components/EditarProductos';
import AgregarProductos from './components/AgregarProductos';

function App() {

  const [productos, setProductos] = useState([]);
  const [recargar, setRecargar] = useState(true);

  useEffect(() => {
    if (recargar) {
      consultarApi();
    }
    setRecargar(false)
  }, [recargar]);

  const consultarApi = async () => {
    const url = `http://localhost:4000/restaurant`;

    const resultado = await axios.get(url);
    setProductos(resultado.data);
  }
  return (
    <Router>
      <Header />
      <main className="container mt-5"></main>
      <Switch>
        <Route
          exact path="/productos"
          render={() => (<Productos productos={productos} setRecargar={setRecargar} />)}
        />
        <Route
          exact path="/producto/nuevo"
          render={() => (<AgregarProductos setRecargar={setRecargar} />)} />

        <Route exact path="/productos/:id" component={Productos} />
        <Route
          exact path="/productos/editar/:id"
          render={props => {
            //tomar el id del producto
            const idProducto = parseInt(props.match.params.id)

            //el producto que se pasa al state
            const producto = productos.filter(producto => producto.id === idProducto);

            return (
              <EditarProductos producto={producto[0]} setRecargar={setRecargar} />
            )
          }} />
      </Switch>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  );
}

export default App;
