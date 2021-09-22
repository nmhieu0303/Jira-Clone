import { DrawerTypes } from "./DrawerTypes"

export const showDrawerAction = () => {
    return { type: 'SHOW_DRAWER' }
}

export const hideDrawerAction = () => {
    return { type: 'HIDE_DRAWER' }
}

export const openWithFormAction = (title,component) => {
    return {
        type: 'OPEN_WITH_FORM',
        title,
        component,
    }
}

export const setOnSubmitAction = (onSubmit) => {
    return {
        type: DrawerTypes.SET_SUBMIT,
        onSubmit,
    }
}







