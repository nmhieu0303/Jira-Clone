import { ProjectTypes } from "../../types/Jira/ProjectTypes"

const initialState = {
    category: [],
    projectList: [],
    projectEdit: {
        id: null,
        projectName: "",
        creator: null,
        description: "",
        categoryId: ""
    },
    projectDetail:null
}

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case ProjectTypes.GET_CATEGORY:
            state.category = action.category
            return { ...state }
        case ProjectTypes.GET_ALL_PROJECT:
            state.projectList = action.projectList
            return { ...state }
        case ProjectTypes.SET_PROJECT_EDIT:
            state.projectEdit = action.projectEdit
            return { ...state }
        case ProjectTypes.GET_PROJECT_DETAIL:
            state.projectDetail = action.projectDetail
            return { ...state }
        default:
            return { ...state }
    }
}

export default ProjectReducer