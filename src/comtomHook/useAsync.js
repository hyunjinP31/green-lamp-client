import { useReducer, useEffect } from "react";

const initailState = {
    loading: false,
    data: null,
    error: null,
}
// 로딩중 / 데이터 받기 성공 / 데이터 받기 실패
// LOADING / SUCCESS / ERROR
function reducer (state, action){
    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            }
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            }
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.e,
            }
        default:
            return state;
    }
}
function useAsync(callback,deps){
    const [state, dispatch] = useReducer(reducer, initailState);
    const fetchData = async () => {
        dispatch({type: 'LOADING'});
        try{
            //await -> 비동기 함수를 동기적으로 쓸 수 있도록 해줌. 해당 코드가 처리되어야 다음 코드를 읽어내릴 수 있도록 해줌
            const data = await callback();
            dispatch({type: 'SUCCESS', data: data,})
        }
        catch(e){
            dispatch({type: 'ERROR', error: e,})
        }
    }
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line
    }, deps)
    //useAsync 함수가 실행되면 결과적으로 아래의 배열이 return 됨
    return [state, fetchData]
}

export default useAsync;