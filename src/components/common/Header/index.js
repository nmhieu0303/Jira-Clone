import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userTypes } from '../../../redux/types/Jira/UserTypes';
import { ROUTE_PATHS } from '../../../utils/constant/router';
import './style.scss'

const Header = () => {
    const dispatch = useDispatch()
    const getUserLogin = useSelector(state => state.UserReducer.userLogin)
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Jira</NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink activeClassName="active_link" className="nav-link" to={ROUTE_PATHS.DRAG_DROP}>Drag and Drop</NavLink>
                        </li>

                        {getUserLogin ?
                            (<>
                                <li className="nav-item">
                                    <NavLink activeClassName="active_link" className="nav-link" to="/jira">Jira</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active_link" className="nav-link" to="/profile">Profile</NavLink>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" onClick={() => dispatch({ type: userTypes.LOGOUT })}>Logout</span>
                                </li>
                            </>) :
                            <li className="nav-item">
                                <NavLink activeClassName="active_link" className="nav-link" to="/login">Login</NavLink>
                            </li>
                        }
                    </ul>
                    <form className="d-flex my-2 my-lg-0">
                        <input className="form-control me-sm-2" type="text" placeholder="Search" />
                        <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};



export default Header;
