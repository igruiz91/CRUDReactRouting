import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';



const EditarProductos = (props) => {

    //destructuring de props
    const { producto, history, setRecargar } = props;

    //generar los ref
    const nombrePlatilloRef = useRef('');
    const precioPlatilloRef = useRef('');


    const [error, setError] = useState(false);
    const [categoria, setCategoria] = useState('');


    const editarProducto = async e => {
        e.preventDefault();

        const nuevoNombrePlatillo = nombrePlatilloRef.current.value,
            nuevoPrecioPlatillo = precioPlatilloRef.current.value;
        if (nuevoNombrePlatillo === '' || nuevoPrecioPlatillo === '' || categoria === '') {
            setError(true);
            return;
        }

        setError(false);

        //revisar si cambia la cateroria sino asignar el mismo valor
        let categoriaPlatillo = (categoria === '') ? EditarProductos.categoria : categoria;
        //obtener valores del formulario
        const editarPlatillo = {
            nombrePlatillo: nuevoNombrePlatillo,
            precioPlatillo: nuevoPrecioPlatillo,
            categoria: categoriaPlatillo
        }
        //enviar el request 
        const url = `http://localhost:4000/restaurant/${producto.id}`;

        try {
            const resultado = await axios.put(url, editarPlatillo);
            console.log(resultado);
            if (resultado.status === 200) {
                Swal.fire(
                    'Producto Editado',
                    'El producto fue editado correctamente',
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error...',
                text: 'Hubo un error. El producto no fue insertado'
            });
        }
        //redirigir al usuario y consultar api
        setRecargar(true);
        history.push('/productos');
    }

    const leerValorRadio = e => {
        setCategoria(e.target.value);
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>

            {(error) ? <Error mensaje="Todos los campos del producto son obligatorios" /> : null}

            <form
                className="mt-5"
                onSubmit={editarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        ref={nombrePlatilloRef}
                        defaultValue={producto.nombrePlatillo}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioPlatilloRef}
                        defaultValue={producto.precioPlatillo}
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
                            defaultChecked={(producto.categoria === 'postre')}
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
                            defaultChecked={(producto.categoria === 'bebida')}
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
                            defaultChecked={(producto.categoria === 'cortes')}
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
                            defaultChecked={(producto.categoria === 'ensalada')}
                        />
                        <label className="form-check-label">
                            Ensalada
                    </label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-success btn-block py-3" value="Editar Producto" />
            </form>
        </div>
    );
}

export default withRouter(EditarProductos);