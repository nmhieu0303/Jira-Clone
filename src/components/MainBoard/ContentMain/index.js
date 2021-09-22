import { Avatar, Empty } from 'antd';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { getTaskByIdRequest, updateStatusTaskRequest } from '../../../redux/actions/TaskActions';
import { PriorityIcon, TypeTaskIcon } from '../../../utils/constant/icon';

export default function ContentMain({ listTasks }) {
    const dispatch = useDispatch()

    const handleDragEnd = (result) => {
        const { destination } = result
        const draggableId = JSON.parse(result.draggableId)
        if (!destination) return
        dispatch(updateStatusTaskRequest({ taskId: draggableId.taskId, statusId: destination.droppableId, projectId: draggableId.projectId }))
    }

    const renderCartTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {listTasks.map((item, index) => {
                return <Droppable key={index} droppableId={item.statusId.toString()} index={index} >
                    {(provided) => <div className="card" style={{ width: '17rem', height: 'auto' }}
                    >
                        <div className="card-header">
                            {`${item.statusName} ${item.lstTaskDeTail?.length}`}
                        </div>
                        <ul className="list-group list-group-flush py-2" style={{ height: '100%' }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >

                            {item.lstTaskDeTail.length !== 0 ?
                                item.lstTaskDeTail?.map((task, index) => {
                                    return (
                                        <Draggable index={index} key={task.taskId}
                                            draggableId={JSON.stringify({ projectId: task.projectId, taskId: task.taskId })}
                                        >
                                            {(provided) => <li className="list-group-item" data-bs-toggle="modal" data-bs-target="#infoModal" style={{ cursor: 'pointer' }} key={index}
                                                onClick={() => dispatch(getTaskByIdRequest(task.taskId))}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <p>
                                                    {task.taskName}
                                                </p>
                                                <div className="block" style={{ display: 'flex' }}>
                                                    <div className="block-left">
                                                        {TypeTaskIcon[task.taskTypeDetail.id]}
                                                        {PriorityIcon[task.priorityTask.priority]}
                                                    </div>
                                                    <div className="block-right">
                                                        <Avatar.Group>
                                                            {task.assigness?.map((member, index) => {
                                                                return <Avatar src={member.avatar} key={index} style={{border:'none'}}/>
                                                            })}
                                                        </Avatar.Group>
                                                    </div>
                                                </div>
                                            </li>
                                            }
                                        </Draggable>
                                    )
                                })
                                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            }
                        </ul>
                        {provided.placeholder}
                    </div>}
                </Droppable>

            })}
        </DragDropContext>
    }
    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCartTaskList()}
        </div>

    )
}
