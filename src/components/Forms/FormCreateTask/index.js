import { Editor } from '@tinymce/tinymce-react';
import { Col, Input, Row, Select, Slider } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOnSubmitAction } from '../../../HOC/DrawerModal/DrawerActions';
import { getAllPriorityRequest } from '../../../redux/actions/PriorityActions';
import { getAllProjectRequest } from '../../../redux/actions/ProjectActions';
import { getAllStatusRequest } from '../../../redux/actions/StatusActions';
import { createTaskRequest, getTaskTypeRequest } from '../../../redux/actions/TaskActions';
import { getUserByProjectIdRequest } from '../../../redux/actions/UserActions';

const { Option } = Select;
export default function FormCreateTask(props) {
    const getAllProject = useSelector(state => state.ProjectReducer.projectList)
    const getAllTaskType = useSelector(state => state.TaskReducer.typeList)
    const getAllPriority = useSelector(state => state.PriorityReducer.priorityList)
    const getAllMembers = useSelector(state => state.UserReducer.userSearch)
    const getAllStatus = useSelector(state => state.StatusReducer.statusList)

    const dispatch = useDispatch();
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    const formik = useFormik({
        initialValues: {
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: getAllStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: getAllProject[0]?.id,
            typeId: getAllTaskType[0]?.id,
            priorityId: getAllPriority[0]?.id
        },
        onSubmit: values => {
            dispatch(createTaskRequest(values))
        }
    })

    useEffect(() => {
        dispatch(getAllProjectRequest())
        dispatch(getTaskTypeRequest())
        dispatch(getAllPriorityRequest())
        dispatch(getAllStatusRequest())
        dispatch(setOnSubmitAction(formik.handleSubmit))
        formik.setValues({
            ...formik.values,
            statusId: getAllStatus[0]?.statusId,
            projectId: getAllProject[0]?.id,
            typeId: getAllTaskType[0]?.id,
            priorityId: getAllPriority[0]?.id
        })
        // dispatch(getUserByProjectIdRequest(getAllProject[0]?.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleChangeTimeTrackings = (e) => {
        const { name, value } = e.target;
        setTimeTracking({ ...timeTracking, [name]: value });
        formik.setFieldValue(name, value);
    }

    const handleEditorChange = (content, editorRef) => {
        formik.values.description = content;
    }

    const renderAllProject = () => {
        return getAllProject?.map((project, index) => {
            return <Option value={project.id} key={index}>{project.projectName}</Option>;
        })
    }

    const renderTaskType = () => {
        return getAllTaskType?.map((type, index) => {
            return <Option value={type.id} key={index}>{type.taskType}</Option>
        })
    }
    const renderStatus = () => {
        return getAllStatus?.map((status, index) => {
            return <Option value={status.statusId} key={index}>{status.statusName}</Option>
        })
    }

    const renderPriority = () => {
        return getAllPriority?.map((item, index) => {
            return <Option value={item.priorityId} key={index}>{item.priority}</Option>
        })
    }

    const renderMembers = () => {
        return getAllMembers?.map((member, index) => {
            return <Option value={member.userId} key={index}>{member.name}</Option>
        })
    }



    return (
        <form className="container" onSubmit={formik.handleSubmit}>
            {/* Task Name */}
            <div className="form-group mb-3">
                <label className="form-label fw-bolder">Task name</label>
                <Input value={formik.values.taskName} name="taskName" onChange={formik.handleChange} />
            </div>
            {/* Project */}
            <div className="form-group mb-3">
                <label className="form-label fw-bolder">Project</label>
                <Select
                    value={formik.values.projectId}
                    className="d-block"
                    name="projectId"
                    showSearch
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(value) => {
                        formik.setFieldValue('projectId', value)
                        dispatch(getUserByProjectIdRequest(value))
                    }}
                >
                    {renderAllProject()}
                </Select>
            </div>
            {/* Assigness */}
            <div className="form-group mb-3">
                <label className="form-label fw-bolder">Assignees</label>
                <Select
                    size="large"
                    mode="multiple"
                    placeholder="Please select"
                    style={{ width: '100%' }}
                    className="d-block"
                    onChange={(values) => {
                        formik.setFieldValue("listUserAsign", values)
                    }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {renderMembers()}
                </Select>
            </div>

            {/* Task type & Priority */}
            <div className="form-group mb-3">
                <Row>
                    <Col span={11}>
                        <label className="form-label fw-bolder">Task type</label>
                        <Select
                            value={formik.values.typeId}
                            className="d-block"
                            name="typeId"
                            onChange={(value) => formik.setFieldValue("typeId", value)}>
                            {renderTaskType()}
                        </Select>
                    </Col>
                    <Col span={11} offset={2}>
                        <label className="form-label fw-bolder">Priority</label>
                        <Select value={formik.values.priorityId} className="d-block"
                            name="priorityId"
                            onChange={(value) => formik.setFieldValue("priorityId", value)}>
                            {renderPriority()}
                        </Select>
                    </Col>
                </Row>
            </div>
            {/* Time & Status */}
            <div className="form-group mb-3">
                <Row>
                    <Col span={11}>
                        {/* Status */}
                        <div className="mb-3">
                            <label className="form-label fw-bolder">Status</label>
                            <Select value={formik.values.statusId} className="d-block"
                                name="statusId"
                                onChange={(value) => formik.setFieldValue("statusId", value)}>
                                {renderStatus()}
                            </Select>
                        </div>
                        {/* Original Estimate */}
                        <div style={{ paddingTop: '1.4rem' }}>
                            <label className="form-label fw-bolder">Original Estimate</label>
                            <input type="number" min={0} className="form-control"
                                name="originalEstimate"
                                value={formik.values.originalEstimate}
                                onChange={formik.handleChange}
                            />
                        </div>

                    </Col>

                    <Col span={11} offset={2}>
                        {/*Slider Time tracking */}
                        <div className="mb-3">
                            <label className="form-label fw-bolder">Time tracking</label>
                            <Slider value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                            <Row>
                                <div className="col-6 text-start">
                                    <small>{`${timeTracking.timeTrackingSpent} logged`}</small>
                                </div>
                                <div className="col-6 text-end">
                                    <small>{`${timeTracking.timeTrackingRemaining} remaining`}</small>
                                </div>
                            </Row>
                        </div>

                        {/* Input Time tracking */}
                        <Row>
                            <Col span={11}>
                                <label className="form-label fw-bolder">Time spent</label>
                                <input type="number" min={0} value={timeTracking.timeTrackingSpent} className="form-control" name="timeTrackingSpent" onChange={handleChangeTimeTrackings} />
                            </Col>
                            <Col span={11} offset={2}>
                                <label className="form-label fw-bolder">Time remaining</label>
                                <input type="number" min={0} value={timeTracking.timeTrackingRemaining} className="form-control" name="timeTrackingRemaining" onChange={handleChangeTimeTrackings} />
                            </Col>
                        </Row>

                    </Col>
                </Row>

            </div>
            {/* Description */}
            <div className="form-group">
                <label className="form-label fw-bolder">Description</label>
                <Editor
                    name="description"
                    initialValue={formik.values.description}
                    init={{
                        height: 300,
                        menubar: false,
                        statusbar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={handleEditorChange}
                />
            </div>
            {/* <button className="btn btn-success" type="submit">submit</button> */}
        </form>
    )
}
