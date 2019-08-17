import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Error from './Error';
import Swal from 'sweetalert2';

const AgregarProductos = ({ history, setRecargar }) => {


    //state
    const [nombrePlatillo, setNombrePlatillo] = useState('');
    const [precioPlatillo, setPrecioPlatillo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [error, setError] = useState(false);

    const leerValorRadio = e => {
        setCategoria(e.target.value);
    }

    const enviarFormulario = async e => {
        e.preventDefault();
        if (nombrePlatillo === '' || precioPlatillo === '' || categoria === '') {
            setError(true);
            return;
        }
        setError(false);

        //crear el nuevo producto
        try {
            const url = `http://localhost:4000/restaurant`;
            const resultado = await axios.post(url, { nombrePlatillo, precioPlatillo, categoria });

            console.log(resultado)
            if (resultado.status === 201) {
                Swal.fire(
                    'Producto Creado!',
                    'El producto fue creado correctamente',
                    'success'
                )
            }


        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error...',
                text: 'Hubo un error. El producto no fue insertado'
            })
        }

        //redirigir al usuario a productos
        setRecargar(true);
        history.push('/productos');
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>

            {(error) ? <Error mensaje="Todos los campos del producto son obligatorios" /> : null}

            <form
                className="mt-5"
                onSubmit={enviarFormulario}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        onChange={e => setNombrePlatillo(e.target.value)}
                        value={nombrePlatillo}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange={e => setPrecioPlatillo(e.target.value)}
                        value={precioPlatillo}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="postre"
                            onChange={leerValorRadio}
                        />
                        <label className="form-check-label">
                            Postre
                    </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="bebida"
                            onChange={leerValorRadio}
                        />
                        <label className="form-check-label">
                            Bebida
                    </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="cortes"
                            onChange={leerValorRadio}
                        />
                        <label className="form-check-label">
                            Cortes
                    </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="ensalada"
                            onChange={leerValorRadio}
                        />
                        <label className="form-check-label">
                            Ensalada
                    </label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-success btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
    );
}

export default withRouter(AgregarProductos);