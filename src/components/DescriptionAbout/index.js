import React from 'react'
import imgExample from '../../assets/images/Jira/example.gif'

export default function DescriptionAbout() {
    return (
        <div>
            <p>Here you can manage Jira-like projects and tasks.</p>
            <p>On the task detail page you can change the task status by dragging and dropping the task</p>
            <img src={imgExample} alt="imgExample" className="w-100 mt-5" />
        </div>
    )
}
