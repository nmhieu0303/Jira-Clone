import {
    HomeOutlined,
    MenuOutlined, PlusOutlined,
    QuestionCircleOutlined, SearchOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { openWithFormAction } from '../../HOC/DrawerModal/DrawerActions';
import DescriptionAbout from '../DescriptionAbout';
import FormCreateTask from '../Forms/FormCreateTask';
import styles from './style.module.scss';

const { Sider } = Layout;

export default function SideBar() {
    const dispatch = useDispatch()
    const [state, setstate] = useState({
        collapsed: true,
    })


    const toggle = () => {
        setstate({ collapsed: !state.collapsed, });
    };
    return (
        <Sider className={styles.sider} trigger={null} collapsible collapsed={state.collapsed}>
            <Button className={styles.btn_menu} onClick={toggle} ><MenuOutlined /></Button>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <NavLink to="/">
                        BACK TO HOME
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2" icon={<SearchOutlined />}>
                    SEARCH ISSUES
                </Menu.Item>
                <Menu.Item key="3" icon={<PlusOutlined />}
                    onClick={() => dispatch(openWithFormAction("Create task", <FormCreateTask />))}
                >
                    CREATE TASK
                </Menu.Item>
                <Menu.Item key="4" icon={<QuestionCircleOutlined />}
                    onClick={() => dispatch(openWithFormAction('About',<DescriptionAbout/>))}>
                    ABOUT
                </Menu.Item>
            </Menu>
        </Sider>

        // <div className="sideBar" >
        //     <div className="sideBar-top">
        //         <div className="sideBar-icon">
        //             <i className="fab fa-jira" />
        //         </div>
        //         <div className="sideBar-icon" data-toggle="modal" data-target="#searchModal" style={{ cursor: 'pointer' }}>
        //             <i className="fa fa-search" />
        //             <span className="title">SEARCH ISSUES</span>
        //         </div>
        //         <div className="sideBar-icon">
        //             <i className="fa fa-plus" />
        //             <span className="title">CREATE ISSUES</span>
        //         </div>
        //     </div>
        //     <div className="sideBar-bottom">
        //         <div className="sideBar-icon">
        //             <i className="fa fa-question-circle" />
        //             <span className="title">ABOUT</span>
        //         </div>
        //     </div>
        // </div >
    )
}
