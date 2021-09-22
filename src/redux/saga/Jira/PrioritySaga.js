import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { priorityServices } from "../../../services/PriorityServices";
import { getAllPriorityAction } from "../../actions/PriorityActions";
import { PriorityRequestTypes } from "../../types/Jira/PriorityTypes";
function* getAllPriority(action) {
    try {
        const { data, status } = yield call(() => priorityServices.getAllPriority())
        if (status === 200) {
            yield put(getAllPriorityAction(data.content))
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

function* watchGetAllPriority(){
    yield takeLatest(PriorityRequestTypes.GET_ALL_PRIORITY_REQUEST,getAllPriority)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield all([
        watchGetAllPriority(),
    ])
}