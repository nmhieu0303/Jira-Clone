import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import style from './style.module.scss';
const { Sider } = Layout;


export default function AuthTemplate(props) {
    const { Component, ...resParams } = props
    return (
        <Route {...resParams} render={(propsComponent) => {
            return (
                <Layout style={{ height: '100%',minHeight: '100vh'}}>
                    <Sider
                        breakpoint="md"
                        collapsedWidth="0"
                        className={style.sider_left} width={'50%'} style={{ backgroundImage: `url('https://picsum.photos/1000/2000')` }}   ></Sider>
                    <Component {...propsComponent} />
                </Layout>
            )

        }} />

    )
}
