import React from 'react'
import { ProjectTypes } from '../../redux/types/Jira/ProjectTypes'
import { DrawerTypes } from './DrawerTypes'
const initialState = {
    visible: false,
    title: "",
    component: <p>default</p>,
    onSubmit: () => { alert('submit') }
}

const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case DrawerTypes.SHOW_DRAWER:
            return { ...state, visible: true }
        case DrawerTypes.HIDE_DRAWER:
            return { ...state, visible: false }
        case DrawerTypes.OPEN_WITH_FORM:
            state.visible = true
            state.component = action.component
            state.title = action.title
            return { ...state }
        case DrawerTypes.SET_SUBMIT:
            state.onSubmit = action.onSubmit
            return { ...state }
        case ProjectTypes.SET_SUBMIT_EDIT_PROJECT:
            state.onSubmit = action.onSubmit
            return { ...state }
        default:
            return state
    }
}

export default DrawerReducer
