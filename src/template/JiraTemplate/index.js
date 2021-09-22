import React from 'react'
import { Route } from 'react-router-dom'
import DrawerModal from '../../HOC/DrawerModal'
import InfoModal from '../../components/InfoModal'
import Menu from '../../components/Menu'
import SearchModal from '../../components/SearchModal'
import SideBar from '../../components/Sidebar'
import './index.css'
export default function JiraTemplate(props) {
    const { Component, ...resParams } = props
    return <Route {...resParams} render={(propsRoute) => {
        return (
            <div className="jira">
                <SideBar />
                <Menu />
                <div style={{ overflowY: 'scroll',width:'100%' }}>
                    <Component {...propsRoute} />
                </div>
                <DrawerModal />
                <div>
                    {/* Search Modal */}
                    <SearchModal />
                    {/* Info Modal */}
                </div>
                <InfoModal />
            </div >
        )
    }} />
}
