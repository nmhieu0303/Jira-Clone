import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { statusServices } from "../../../services/StatusServices";
import { getAllStatusAction } from "../../actions/StatusActions";
import { StatusRequestTypes } from "../../types/Jira/StatusTypes";
function* getAllStatus(action) {
    try {
        const { data, status } = yield call(() => statusServices.getAllStatus())
        if (status === 200) {
            yield put(getAllStatusAction(data.content))
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

function* watchGetAllStatus(){
    yield takeLatest(StatusRequestTypes.GET_ALL_STATUS_REQUEST,getAllStatus)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield all([
        watchGetAllStatus(),
    ])
}