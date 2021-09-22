import React from 'react'
import { Route } from 'react-router-dom'
import Header from '../../components/common/Header'

export default function DefaultTemplate(props) {

    const { Component, ...resParams } = props
    return <Route {...resParams} render={(propsRoute) => {
        return (<>
            <Header />
            <Component {...propsRoute} />
        </>
        )
    }} />
}
