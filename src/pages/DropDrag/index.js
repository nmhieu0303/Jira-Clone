import _ from 'lodash';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './style.css';


const listTask = {
    toDo: {
        id: 'toDo',
        name:'To do',
        items: [
            { id: '1', name: 'Task 1' },
            { id: '2', name: 'Task 2' },
            { id: '3', name: 'Task 3' },
            { id: '4', name: 'Task 4' },
            { id: '5', name: 'Task 5' }
        ]
    },
    inProcess: {
        id: 'inProcess',
        name:'Process',
        items: [
            { id: '6', name: 'Task 6' },
            { id: '7', name: 'Task 7' },
            { id: '8', name: 'Task 8' },
            { id: '9', name: 'Task 9' },
            { id: '10', name: 'Task 10' }
        ]
    },
    done: {
        id: 'done',
        name:'Done',
        items: [
            { id: '11', name: 'Task 11' },
            { id: '12', name: 'Task 12' },
            { id: '13', name: 'Task 13' },
            { id: '14', name: 'Task 14' },
            { id: '15', name: 'Task 15' }
        ]
    }
}


const DropDrag = () => {
    const [lstTask, setlstTask] = useState(listTask)

    const onDragEnd = (result) => {
        const { destination, source } = result
        if (!destination) return

        // Lấy task drag
        const itemSrc = lstTask[source.droppableId].items[source.index]
        // cắt bỏ task drag
        lstTask[source.droppableId].items.splice(source.index, 1);

        lstTask[destination.droppableId].items.splice(destination.index, 0, itemSrc);

        setlstTask({ ...lstTask })
    }

    return (
        <div className="container py-4">
            <h1 className="display-3 text-center">Drag & Drop</h1>
            <DragDropContext onDragEnd={rs => onDragEnd(rs)}>
                <div className="row justify-content-between text-center text-light">
                    {_.map(lstTask, (statusTask, index) => {
                        return <Droppable droppableId={statusTask.id} key={index} >
                            {(provided) => {
                                return <div
                                    className="col-4 p-2" style={{ height: 'auto' }}
                                    key={index}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div className="bg-dark p-4 h-100">
                                        <h3 className="mb-3 text-light">{statusTask.name}</h3>
                                        {statusTask.items.map((task, index) => {
                                            return <Draggable draggableId={task.id} index={index} key={task.id} >
                                                {(provided) => (
                                                    <div className="bg-warning mx-auto my-2 p-3"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {task.name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        })}
                                    </div>

                                    {provided.placeholder}
                                </div>
                            }}

                        </Droppable>

                    })}
                    {/* 
                <div className="col-5 bg-dark p-3" style={{ height: 500 }}
                    onDragOver={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    onDrop={e => handleDrop(e)}
                > 

            </div>*/}
                </div>
            </DragDropContext >

        </div >
    );
}

export default DropDrag;
