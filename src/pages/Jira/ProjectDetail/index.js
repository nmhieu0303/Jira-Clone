import React, { useEffect } from 'react'
import HeaderMain from '../../../components/MainBoard/HeaderMain'
import InfoMain from '../../../components/MainBoard/InfoMain'
import ContentMain from '../../../components/MainBoard/ContentMain'
import { useDispatch, useSelector } from 'react-redux';
import { getProjectDetailRequest } from '../../../redux/actions/ProjectActions';

export default function ProjectDetail(props) {
    const getProjectDetail = useSelector(state => state.ProjectReducer.projectDetail)
    const dispatch = useDispatch();
    useEffect(() => {
        const { id } = props.match.params;
        dispatch(getProjectDetailRequest(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="container pt-3">
            {getProjectDetail ? (

                <div className="main">
                    <HeaderMain projectName={getProjectDetail.projectName} />
                    <InfoMain projectDetail={getProjectDetail} />
                    <ContentMain listTasks={getProjectDetail.lstTask} />
                </div>
            ) : (
                <h3 className="mt-5 text-center display-2">Project not exist</h3>
            )}
        </div>

    )
}
