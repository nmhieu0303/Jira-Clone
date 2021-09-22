import React from 'react'

export default function Detail(props) {
    return (
        <div className="container">
            <h1 className="display-1 text-center">Detail</h1>
            <h3 className="text-center">id: {props.match.params.id}</h3>
        </div>
    )
}
