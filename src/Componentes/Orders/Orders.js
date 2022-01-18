import './Orders.css'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Store/appContext';

const Orders = () => {

    const {api} = useContext(Context);
    const [pedido, setPedido] = useState([]);
    const [costo, setCosto] = useState(0);

    const listandoOrden = (elemento) => {
        setPedido([elemento, ...pedido])

    }

    const precioFinal = () => {
        let suma = 350
        pedido.map( ingr => (
            setCosto(suma += ingr.precio)
        ))
   
    }

    const eliminarItem = (elemento) => {
        let filtrado = pedido.filter( item => item.id !== elemento.id);

        setPedido(filtrado);
    }

    

    useEffect(() => {
        precioFinal();
    }, [pedido])


    return ( 
        <>
            <section className="container text-center bg-dark badge">
                <h2>Armá la tuya!</h2>
                <div className="row">
                    <div className="col-6">
                        {
                            api.map(item => (
                                <button key={item.id} className="item" id="button-item" onClick={() => listandoOrden(item)}>
                                    <div>
                                        <img className="item-img" src={require(`../../assets/img/ingredientes/${item.imagen}.png`)} />
                                        <span>{item.nombre}</span>
                                    </div>
                                    <span className='text-center'>${item.precio}</span>
                                </button>
                            ))
                        }
                    </div>

                    <div className="col-6">
                        {
                            pedido.length !== 0 ?
                                <section>
                                    <div className="item">
                                        <div>
                                            <img className="item-img" src={require(`../../assets/img/ingredientes/Carne.png`)} />
                                            <span>Carne</span>
                                        </div>
                                        <span className='text-center'>$ 350</span>
                                    </div>

                                    {pedido.map(select => (
                                        <div key={select.id} className="item">
                                            <div>
                                                <img className="item-img" src={require(`../../assets/img/ingredientes/${select.imagen}.png`)} />
                                                <span>{select.nombre}</span>
                                            </div>
                                            <span>${select.precio}</span>
                                            <img className="item-img" onClick={() => eliminarItem(select)}></img>
                                        </div>
                                    ))}

                                    <div>
                                        <h2>Total: ${costo}</h2>
                                        <button>Confirmar Pedido</button>
                                    </div>
                                </section>
                            :
                                <p>Empeza a Seleccionar</p>
                        }
                    </div>
                </div>
            </section>
        </>
     );
}
 
export default Orders;