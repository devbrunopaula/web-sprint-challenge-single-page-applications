import React from 'react'
import pizzaBg from '../../assets/pizzaBg.jpg'
function Complete(props) {



    const id = props.location.state.id
    const state = props.location.state.stateForms


    const warapper = {
        marginRight: '3rem'
    }
    const done = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        border: 'solid red',
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0) 8%, rgba(250,250,250,.9) 16%), url(${pizzaBg})`,
        width: '100vw',
    }



    return (
        <div style={done} >
            <div>
                <div style={warapper}>
                    <h1>Thank You</h1>
                    <h1>Order #{id} Was Successfully placed</h1>
                    <h2>Name: {state.name}</h2>
                    <h2>Order Details</h2>
                    <h3>Date: 07/20/2020 </h3>
                    <div>
                        <h4>{`${state.quantity}  ${state.size} Pizza,       Amount:$${state.price}`}</h4>
                        <ul>
                            {state.toppings.map((el, i) => <li key={i}> ${el}</li>)}
                        </ul>
                        <p>Special Instruction {state.instructions}</p>
                    </div>
                    <div>Total: ${state.total}</div>
                </div>
            </div>
        </div >
    )
}

export default Complete
