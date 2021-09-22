import { Avatar } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function InfoMain(props) {
    const { projectDetail } = props;

    const renderMembers = () => {
        return projectDetail.members?.map((member, index) => {
            return <Avatar src={member.avatar} key={index} style={{ border: 'none' }} />
        })
    }
    return (
        <>
            <h3 className="text-center display-5">{projectDetail.projectName}</h3>
            <section className="mb-4">
                {ReactHtmlParser(projectDetail.description)}
            </section>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <Search placeholder="Input search text" enterButton />
                </div>
                <Avatar.Group maxCount={4} className="mx-3">
                    {renderMembers()}
                </Avatar.Group>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </>
    )
}
