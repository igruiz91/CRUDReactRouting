import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Error from './Error';
import Swal from 'sweetalert2';

const ProductosLista = ({ producto, setRecargar }) => {

    const eliminarProducto = id => {
        console.log('Eliminando ', id);

        //Eliminar los productos
        Swal.fire({
            title: 'Estas seguro?',
            text: "Una vez eliminado no se podra recuperar los datos del platillo",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {
                try {

                    const url = `http://localhost:4000/restaurant/${id}`;

                    const resultado = await axios.delete(url);
                    console.log(resultado);
                    if (resultado.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            'El platillo fue eliminado.',
                            'success'
                        )
                        //consultar nuevamente la api
                        setRecargar(true);
                    }

                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title: 'Error...',
                        text: 'Hubo un error. El producto no fue eliminado'
                    })
                }
            }
        })
    }

    return (
        <li data-categoria={producto.categoria} className="list-group-item d-flex justify-content-between align-items-center">
            <p>{producto.nombrePlatillo}{'  '}<span className="font-weight-bold">${producto.precioPlatillo}</span></p>
            <div>
                <Link
                    to={`/productos/editar/${producto.id}`}
                    className="btn btn-success mr-2">Editar
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarProducto(producto.id)}>
                    Eliminar &times;
                </button>
            </div>
        </li>
    );
}

export default ProductosLista;