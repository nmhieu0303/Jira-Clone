import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../../../utils/constant/router'

export default function HeaderMain({ projectName }) {
    return (
        <div className="header py-2">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item text-primary">
                        <NavLink to={ROUTE_PATHS.PROJECT_MANAGEMENT}>
                            Project Management
                        </NavLink>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {projectName}
                    </li>
                </ol>
            </nav>

        </div>
    )
}
