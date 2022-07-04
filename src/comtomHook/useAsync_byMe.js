import { useEffect, useReducer } from "react";


//reducer로 axios 파일 불러오는 것 관리하기.
//기본값.
const initailState = {
    loading: false,
    data: null,
    error: null,
}
//case가 바뀔 때 마다 다르게 바뀔 값들
function reducer(state, action) {
    switch(action.type){
        //로딩중일 때 loading이 true, 다른 값들은 null값이 들어간다.
        case 'LOADING':
            return {
                loading : true,
                data: null,
                error: null,
            };
            //불러오기에 성공하면 loading은 false가 되고 data에 action(dispatch에서 적어줄 객체).data가 담긴다.
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            }
            //에러가 뜨면 loading은 false, data는 null 값이 담기며 action에서 받아온 error값이 담긴다.
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.e,
            }
            //default는 위에 받아왔던 기본값으로 한다.
        default:
            return state;
    }
}


//callback함수 담은 인자, useEffect의 감시대상을 담을 인자(기본값 빈배열)
const useAsync = (callback, deps = [], skip=false )=>{
    //useReducer 구조분해할당
    const [state, dispatch] = useReducer(reducer, initailState);
    //fetchData 라는 비동기 함수를 만든다.
    const fetchData = async ()=>{
        //처음 실행될 땐 case가 loading이 되도록 한다.
        dispatch({type:'LOADING'})
        //성공시
        try{
            //callback함수에서 불러온 데이터를 변수 data에 담아 주고 dispatch로 type을 SUCCESS로 바꿔준 후 data에 받아온 data를 넣는다.
            //해당 데이터는 위의 reducer 함수에서 action객체로 전달되어 들어간다.
            const data = await callback();
            dispatch({type:'SUCCESS', data: data});
        }
        //실패시
        catch(e){
            //콘솔에 에러를 찍고 dispatch로 type을 ERROR로 바꾼다. e에 받아온 e를 넣어준다. 해당 e는 위의 reducer함수에서 action객체로 전달되어 들어간다.
            console.log(e);
            dispatch({type:'ERROR', e: e})
        }
        
    }
    //fetchData에 값이 업데이트 될 때마다 리렌더링
    //사실 없어도 되지 않나..?
    useEffect(()=>{
        if(skip) return;
        fetchData();
        // eslint-disable-next-line
    },deps)
    //return값. reducer type이 변경될 때 마다 바뀌는 상태 state와 값을 로딩중일때, 실패 했을 때, 성공했을 때 각각의 case를 담고 있는 fetchData 함수를 return해준다.
    return [ state, fetchData];
}
export default useAsync;