import { useEffect, useState } from "react";

//callback함수 담은 인자, useEffect의 감시대상을 담을 인자(기본값 빈배열)
const useAsync = (callback, deps = [], skip=false )=>{
    const fetchData = async ()=>{
        try{
            const data = await callback();
        }
        catch(e){
            console.log(e);
        }
    }
    //fetchData에 값이 업데이트 될 때마다 리렌더링
    useEffect(()=>{
        if(skip) return;
        fetchData();
        // eslint-disable-next-line
    },deps)
    return [ data, fetchData];

}