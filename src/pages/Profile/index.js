import { Avatar } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default function Profile(props) {
    const getUserLogin = useSelector(state => state.UserReducer.userLogin)
    if (!getUserLogin) {
        alert('Please login!!')
        return <Redirect to='/login' />
    }
    return (
        <div className="container">
            <div className="row justify-content-center mt-4 text-center">
                <Avatar size={110} src={getUserLogin.avatar} />
                <h2 className="display-5 mt-3 ">{getUserLogin.name}</h2>
                <h3 className="display-6">{getUserLogin.email}</h3>
                <h3 className="display-6">{getUserLogin.phoneNumber}</h3>
            </div>
        </div>
    )
}
