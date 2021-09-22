import { ProjectRequestTypes, ProjectTypes } from "../types/Jira/ProjectTypes"

export const getCategoryAction = (category)=>{
    return {
        type: ProjectTypes.GET_CATEGORY,
        category
    }
}

export const getAllProjectAction = (projectList)=>{
    return {
        type: ProjectTypes.GET_ALL_PROJECT,
        projectList
    }
}

export const createProjectAction = ()=>{
    return { 
        type: ProjectTypes.CREATE_PROJECT
    }
}

export const setOnSubmitAction = (onSubmit)=>{
    return { 
        type: ProjectTypes.SET_SUBMIT_EDIT_PROJECT,
        onSubmit
    }
}
export const setProjectEditAction = (project)=>{
    return {
        type: ProjectTypes.SET_PROJECT_EDIT,
        projectEdit:{
            id: project.id,
            projectName: project.projectName,
            description: project.description,
            categoryId: project.categoryId,
            creator: project.creator.name
        }
    }
}

export const getProjectDetailAction = (projectDetail)=>{
    return {
        type: ProjectTypes.GET_PROJECT_DETAIL,
        projectDetail
    }
}


// =============    SAGA    ====================

export const getCategoryRequestAction = ()=>{
    return {
        type: ProjectRequestTypes.GET_CATEGORY_REQUEST
    }
}

export const getAllProjectRequest = ()=>{
    return {
        type: ProjectRequestTypes.GET_ALL_PROJECT_REQUEST
    }
}

export const createProjectRequest = (newProject)=>{
    return { 
        type: ProjectRequestTypes.CREATE_PROJECT_REQUEST,
        newProject
    }
}

export const updateProjectRequest = (project)=>{
    return { 
        type: ProjectRequestTypes.UPDATE_PROJECT_REQUEST,
        project
    }
}

export const deleteProjectRequest = (id)=>{
    return{
        type: ProjectRequestTypes.DELETE_PROJECT_REQUEST,
        id
    }
}

export const assignUserProjectRequest = (userProject)=>{
    return {
        type: ProjectRequestTypes.ASSIGN_USER_PROJECT_REQUEST,
        userProject
    }
}
export const removeUserFromProjectRequest = (userProject)=>{
    return {
        type: ProjectRequestTypes.REMOVE_USER_FROM_PROJECT_REQUEST,
        userProject
    }
}


export const getProjectDetailRequest = (id)=>{
    return {
        type: ProjectRequestTypes.GET_PROJECT_DETAIL_REQUEST,
        id
    }
}




