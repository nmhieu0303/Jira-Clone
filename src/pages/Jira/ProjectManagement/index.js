/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Button, Popconfirm, Popover, Space, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import FormEditProject from '../../../components/Forms/FormEditProject';
import { openWithFormAction } from '../../../HOC/DrawerModal/DrawerActions';
import { assignUserProjectRequest, deleteProjectRequest, getAllProjectRequest, removeUserFromProjectRequest, setProjectEditAction } from '../../../redux/actions/ProjectActions';
import { getUsersRequestAction } from '../../../redux/actions/UserActions';
import {NavLink} from 'react-router-dom'



export default function ProjectManagement() {
    const getAllProjects = useSelector(state => state.ProjectReducer.projectList)
    const getUserSearch = useSelector(state => state.UserReducer.userSearch)
    const debounceSearch = useRef(null)
    const [member, setMember] = useState('')
    const [projectId, setProjectId] = useState(-1)
    const [state, setstate] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProjectRequest())
    }, []);

    const handleOk = (id) => {
        dispatch(deleteProjectRequest(id))
    };

    const handleChange = (pagination, filters, sorter) => {
        setstate({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const onSearch = (value) => {
        if (debounceSearch.current) {
            clearTimeout(debounceSearch.current);
        }
        debounceSearch.current = setTimeout(() => dispatch(getUsersRequestAction(value)), 500)

    }
    const handleSelectMember = (value, option) => {
        setMember(option.label)
        if (projectId !== -1) {
            dispatch(assignUserProjectRequest({
                projectId: projectId,
                userId: parseInt(value)
            }))
            setMember('')
            setProjectId(-1)
        }
    };

    const handleRemoveMember = (projectId, userId) => {
        dispatch(removeUserFromProjectRequest({ projectId, userId }))
    }

    const renderMembersTable = (record) => {
        return <table className="table align-middle">
            <thead>
                <tr>
                    <th>UserId</th>
                    <th>Name</th>
                    <th>Avatar</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {record.members?.map((member, index) => {
                    return <tr key={index}>
                        <td>{member.userId}</td>
                        <td>{member.name}</td>
                        <td><Avatar src={member.avatar} /></td>
                        <td>
                            <Popconfirm title="Are you sure to delete this member?"
                                onConfirm={() => handleRemoveMember(record.id, member.userId)}
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                                <Button type="text" danger size="large" shape="circle" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    }

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            // sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            // ellipsis: true,
        }, {
            title: 'Project name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record)=>{
                return <NavLink to={`/project-detail/${record.id}`}>{text}</NavLink>
            },
             sorter: (a, b) => {
                let strA = a.projectName.trim().toLowerCase();
                let strB = b.projectName.trim().toLowerCase();
                return strA < strB ? 1 : -1;
            },
            // sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
            ellipsis: true,
        }, {
            title: 'Creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag key={index} color="green">{record.creator.name}</Tag>
            },
            onFilter: (value, record) => record.creator.name.includes(value),
            sorter: (a, b) => {
                let strA = a.creator.name.trim().toLowerCase();
                let strB = b.creator.name.trim().toLowerCase();
                return strA < strB ? 1 : -1;
            },
            // sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
            ellipsis: true,
        }, {
            title: 'Category name',
            dataIndex: 'categoryName',
            key: 'categoryName',
            onFilter: (value, record) => record.categoryName.includes(value),
            sorter: (a, b) => {
                let strA = a.categoryName.trim().toLowerCase();
                let strB = b.categoryName.trim().toLowerCase();
                return strA < strB ? 1 : -1;
            },
            // sortOrder: sortedInfo.columnKey === 'categoryName' && sortedInfo.order,
            ellipsis: true,
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => {
                let strA = a.description.trim().toLowerCase();
                let strB = b.description.trim().toLowerCase();
                return strA < strB ? 1 : -1;
            },
            // sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
            ellipsis: true,
            render: (text, row, index) => {
                return {
                    children: ReactHtmlParser(text)
                };
            }
        },
        {
            title: 'Members',
            dataIndex: 'members',
            key: 'members',
            sorter: (a, b) => a.members.length > b.members.length,
            // sortOrder: sortedInfo.columnKey === 'categoryName' && sortedInfo.order,
            ellipsis: true,
            render: (text, record, index) => {
                return <div className="d-flex align-items-center">
                    <Avatar.Group maxCount={2}>
                        {record.members?.map((member, index) => {
                            return <Tooltip title={member.name} placement="top" key={index}>
                                <Popover placement="bottom" title='Menbers' trigger="hover"
                                    content={renderMembersTable(record)}
                                >
                                    <Avatar src={member.avatar} />
                                </Popover>
                            </Tooltip>
                        })}
                    </Avatar.Group>
                    <Popover placement="bottom" trigger="click"
                        title="Add member"
                        content={
                            <AutoComplete
                                style={{
                                    width: '100%',
                                }}
                                options={getUserSearch?.map((user, index) => {
                                    return { label: user.name, value: user.userId.toString() }
                                })}
                                value={member}
                                placeholder="Type member's name"
                                onSearch={onSearch}
                                onSelect={handleSelectMember}
                                onChange={(value) => setMember(value)}
                            />
                        }
                    >
                        <Button style={{ fontSize: '1.2rem', padding: '0 10px', borderRadius: '50%' }}
                            onClick={() => setProjectId(record.id)}>+</Button>
                    </Popover>
                </div>
            }
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="text" size="large" shape="circle" icon={<EditOutlined />}
                        onClick={() => {
                            dispatch(openWithFormAction("Edit Project",<FormEditProject />))
                            dispatch(setProjectEditAction(record))
                        }}
                    />

                    <Popconfirm title="Are you sure to delete this project?"
                        onConfirm={() => handleOk(text.id)}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    >
                        <Button type="text" danger size="large" shape="circle" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },

    ];


    return (
        <div className="container">
            <h1 className="mt-3 text-center">Project management</h1>
            <Table columns={columns} rowKey="id" dataSource={getAllProjects} onChange={handleChange} />
        </div>
    )
}
