/* eslint-disable eqeqeq */
import { Editor } from '@tinymce/tinymce-react'
import { Button, Col, Input, Popconfirm, Progress, Row, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentRequest, removeCommentRequest } from '../../redux/actions/CommentActions'
import { getAllPriorityRequest } from '../../redux/actions/PriorityActions'
import { getAllStatusRequest } from '../../redux/actions/StatusActions'
import { addAssigness, getTaskTypeRequest, handleChangeDetailTask, removeTaskByIdRequest, removeUserAssignAction } from '../../redux/actions/TaskActions'
import { TypeTaskIcon } from '../../utils/constant/icon'
import img1 from './../../assets/images/Jira/download (1).jfif'
const { TextArea } = Input;

export default function InfoModal() {
    const getCurrentUser = useSelector(state => state.UserReducer.userLogin)
    const getTaskDetail = useSelector(state => state.TaskReducer.taskDetail)
    const getStatusList = useSelector(state => state.StatusReducer.statusList)
    const getPriorityList = useSelector(state => state.PriorityReducer.priorityList)
    const getAllTaskType = useSelector(state => state.TaskReducer.typeList)
    const getProjectDetail = useSelector(state => state.ProjectReducer.projectDetail)
    const dispatch = useDispatch()

    const [visiableEditor, setVisiableEditor] = useState(false)
    const [historyContent, setHistoryContent] = useState(getTaskDetail.description)
    const description = useRef(getTaskDetail?.description)
    const [comment, setComment] = useState('')

    const percentProgress = Number(getTaskDetail.timeTrackingSpent) / (Number(getTaskDetail.timeTrackingRemaining) + Number(getTaskDetail.timeTrackingSpent)) * 100

    useEffect(() => {
        dispatch(getAllStatusRequest())
        dispatch(getAllPriorityRequest())
        dispatch(getTaskTypeRequest())
        setComment('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch(handleChangeDetailTask(name, value))
    }

    const handleSaveDescription = () => {
        setVisiableEditor(false)
        dispatch(handleChangeDetailTask('description', description.current))
    }

    const handleCloseEditor = () => {
        setVisiableEditor(false)
        dispatch(handleChangeDetailTask('description', historyContent))
    }

    const handleRemoveUserAssign = (id) => {
        dispatch(removeUserAssignAction(id))
    }

    const handleRemoveTask = (taskId, projectId) => {
        dispatch(removeTaskByIdRequest(taskId, projectId))
    }
    const handleRemoveComment = (idComment)=>{
        dispatch(removeCommentRequest(idComment,getTaskDetail.taskId))
    }

    const handleChangeComment = (e) => {
        setComment(e.target.value)
    }

    const handleComment = () => {
        dispatch(addCommentRequest(getTaskDetail.taskId, comment))
        setComment('')
    }

    const renderComments = () => {
        return getTaskDetail.lstComment?.map((comment, index) => {
            return <div className="comment-item py-2" key={index}>
                <div className="display-comment" style={{ display: 'flex' }}>
                    <div className="avatar">
                        <img src={comment.avatar} alt='avatar' />
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>
                            <span className="fw-bold"> {comment.name} </span>
                            {/* <span className="mx-2 d-inline-block">a month ago</span> */}
                        </p>
                        <p style={{ marginBottom: 5 }}>
                            {comment.commentContent}
                        </p>
                        <div>
                            <Button type="link" className="p-0">
                                Edit
                            </Button>

                            <Button type="link" danger onClick={()=>handleRemoveComment(comment.id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        })
    }

    const renderStatus = () => {
        return getStatusList?.map((status, index) => {
            return <option value={status.statusId} key={index} >{status.statusName}</option>
        })
    }

    const renderPriority = () => {
        return getPriorityList?.map((priority, index) => {
            return <option value={priority.priorityId} key={index} >{priority.priority}</option>
        })
    }

    const renderAssignees = () => {
        return getTaskDetail.assigness?.map((member, index) => {
            return <div className="item" key={index}>
                <div className="avatar">
                    <img src={member.avatar} alt='avatar' />
                </div>
                <p className="name">
                    {member.name}
                    <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => handleRemoveUserAssign(member.id)} />
                </p>
            </div>
        })
    }

    const renderTaskType = () => {
        return getAllTaskType?.map((type, index) => {
            return <option value={type.id} key={index} >{type.taskType}</option>
        })
    }

    const handleChangeMember = (value) => {
        const userSelected = getProjectDetail.members?.find(member => member.userId == value)
        dispatch(addAssigness({ id: userSelected.userId, ...userSelected }))
    }


    const optionMembers = () => {
        return getProjectDetail?.members?.filter(mem => {
            return getTaskDetail?.assigness?.findIndex(us => us.id === mem.userId) === -1
        }).map((member, index) => {
            return { value: member.userId, label: member.name }
        })
    }

    return (
        <div style={{ zIndex: 1045 }} className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            {TypeTaskIcon[getTaskDetail.typeId]}
                            <select style={{ marginRight: '0.25rem' }} name="typeId"
                                value={getTaskDetail.typeId}
                                onChange={handleChange}>
                                {renderTaskType()}
                            </select>
                            <span className="fw-bold m-0">- {getTaskDetail.taskId}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <Popconfirm placement="bottom" title='Do you want to delete this task?' onConfirm={() => handleRemoveTask(getTaskDetail.taskId, getTaskDetail.projectId)} okText="Yes" cancelText="No">
                                <i className="fa fa-trash-alt" />
                            </Popconfirm>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <h3 className="pb-3" style={{ color: 'rgb(23, 43, 77)' }}>{getTaskDetail.taskName}</h3>
                                    <div className="description mb-3">
                                        <h6 className="fw-bold">Description</h6>
                                        <>
                                            {!visiableEditor ?
                                                <div onClick={() => {
                                                    setHistoryContent(getTaskDetail.description);
                                                    setVisiableEditor(!visiableEditor)
                                                }}>
                                                    {ReactHtmlParser(getTaskDetail.description)}
                                                </div>
                                                : <>
                                                    <Editor
                                                        name="description"
                                                        initialValue={getTaskDetail.description}
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
                                                        onEditorChange={(value, editor) => description.current = value}
                                                    />
                                                    <div className="my-3">
                                                        <Button type="primary" style={{ marginRight: '0.5rem' }} onClick={handleSaveDescription}>Save</Button>
                                                        <Button onClick={handleCloseEditor} >Close</Button>
                                                    </div>
                                                </>
                                            }
                                        </>
                                    </div>
                                    <div className="comment mt-5">
                                        <h6 className="fw-bold">Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={getCurrentUser.avatar} alt="avatar" />
                                            </div>
                                            <div className="input-comment">
                                                <TextArea value={comment} placeholder="Add a comment ..." autoSize onChange={handleChangeComment} />
                                                <div className="my-3">
                                                    <Button type="primary" style={{ marginRight: '0.5rem' }}
                                                        onClick={() => handleComment()}
                                                    >Save</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            {renderComments()}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6 className="fw-bold">STATUS</h6>
                                        <select name="statusId" className="custom-select"
                                            value={getTaskDetail.statusId}
                                            onChange={handleChange} >
                                            {renderStatus()}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6 className="fw-bold">ASSIGNEES</h6>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {renderAssignees()}
                                            <div>
                                                <Select
                                                    showSearch
                                                    options={optionMembers()}
                                                    style={{ width: 'auto', marginBottom: '5px' }}
                                                    value="+ Add more"
                                                    optionFilterProp="label"
                                                    filterOption={(input, option) =>
                                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    onSelect={value => handleChangeMember(value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reporter">
                                        <h6 className="fw-bold">REPORTER</h6>
                                        <div style={{ display: 'flex' }} className="item">
                                            <div className="avatar">
                                                <img src={img1} alt='avatar' />
                                            </div>
                                            <p className="name">
                                                Pickle Rick
                                                <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6 className="fw-bold">PRIORITY</h6>
                                        <select name="priorityId" value={getTaskDetail.priorityId}
                                            onChange={handleChange}>
                                            {renderPriority()}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" className="estimate-hours"
                                            name="originalEstimate"
                                            value={getTaskDetail.originalEstimate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="time-tracking">
                                        <h6 className="fw-bold">TIME TRACKING</h6>
                                        <div style={{ display: 'flex' }}>
                                            <i className="fa fa-clock" style={{ fontSize: `1.2rem` }} />
                                            <div style={{ width: '100%' }}>
                                                <Progress percent={percentProgress} showInfo={false} />
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p className="logged">{`${getTaskDetail.timeTrackingSpent}h logged`}</p>
                                                    <p className="estimate-time">{`${getTaskDetail.timeTrackingRemaining}h estimated`}</p>
                                                </div>
                                                <Row>
                                                    <Col span={11}>
                                                        <label className="form-label fw-bolder">Time spent</label>
                                                        <input type="number" min={0}
                                                            value={getTaskDetail.timeTrackingSpent}
                                                            className="form-control"
                                                            name="timeTrackingSpent"
                                                            onChange={handleChange} />
                                                    </Col>
                                                    <Col span={11} offset={2}>
                                                        <label className="form-label fw-bolder">Time remaining</label>
                                                        <input type="number" min={0}
                                                            value={getTaskDetail.timeTrackingRemaining}
                                                            className="form-control"
                                                            name="timeTrackingRemaining"
                                                            onChange={handleChange} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
