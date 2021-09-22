import React from 'react'
import img from './../../assets/images/Jira/jira.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Menu() {
    const getUserLogin = useSelector(state => state.UserReducer.userLogin)
    return (
        <div className="menu">
            <div className="account pt-3">
                <div className="avatar">
                    <img src={img} alt='avatar' />
                </div>
                <div className="account-info">
                    <p>{getUserLogin.name}</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <NavLink to="/project-management" activeClassName="active active_menu">
                        <i className="fa fa-credit-card" />
                        Project management
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/create-project" activeClassName="active active_menu">
                        <i className="fa fa-cog" />
                        Create project
                    </NavLink>
                </div>

            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>

    )
}
