import { useReducer, useEffect } from 'react';
import axios from 'axios';

const actions = {
    make_request: 'make-request',
    get_data: 'get-data',
    error: 'error',
    update_has_next_page: 'update-has-next-page'
}
// const baseUrl = 'https://api.allorigins.win/raw?url=https://jobs.github.com/positions.json'
const baseUrl = 'http://localhost:8080/jobs'

function reducer(state, action) {
    switch (action.type) {
        case actions.make_request:
            return { loading: true, jobs: [] }
        case actions.get_data:
            return { ...state, loading: false, jobs: action.payload.jobs }
        case actions.error:
            return { ...state, loading: false, error: action.payload.error, jobs: [] }
        case actions.update_has_next_page:
            return { ...state, hasNextPage: action.payload.hasNextPage }

        default:
            return state
    }
}

export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type: actions.make_request })
        axios.get(baseUrl, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: actions.get_data, payload: { jobs: res.data } })
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: actions.error, payload: { error: e } })
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(baseUrl, {
            cancelToken: cancelToken2.token,
            params: { markdown: true, page: page + 1, ...params }
        }).then(res => {
            dispatch({ type: actions.update_has_next_page, payload: { hasNextPage: res.data.length !== 0 } })
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: actions.error, payload: { error: e } })
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    }, [params, page])


    return state
}