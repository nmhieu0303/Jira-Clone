import { Button, Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawerAction } from './DrawerActions';

export default function DrawerModal() {
    const dispatch = useDispatch()
    const {visible,component,onSubmit,title} = useSelector(state => state.DrawerReducer)
    const onClose = () => {
        dispatch(hideDrawerAction())
    };
    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={()=>onSubmit()} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                {component}
            </Drawer>
        </>
    )
}


