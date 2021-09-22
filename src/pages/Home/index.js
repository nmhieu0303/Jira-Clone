import { Button } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../../utils/constant/router'

export default function Home() {
    const getUserLogin = useSelector(state => state.UserReducer.userLogin)
    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center flex-column" style={{ height: '75vh' }}>
                <h1 className="display-1 mb-4">Welcome to my mini project</h1>
                <p className=" mb-4" style={{ fontSize: '1.25rem', fontWeight: 300, letterSpacing: '0.2rem' }}>
                    This is a mini project I created while learning Redux-saga
                </p>
                {getUserLogin ?
                    <NavLink to={ROUTE_PATHS.JIRA}>
                        <Button type="primary" shape="round" size="large">
                            GO TO JIRA
                        </Button>
                    </NavLink>
                    : <NavLink to={ROUTE_PATHS.LOGIN}>
                        <Button type="primary" shape="round" size="large">
                            GO TO LOGIN
                        </Button>
                    </NavLink>
                }

            </div>
        </div>
    )
}
