import React from 'react';
import './product.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAsync from '../main/useAsync';

//다른 곳에 임폴트 하게되는 메인 컴포넌트이다. import 시 컴포넌트 이름으로 쓰이며 경로에는 파일 이름을 적어주어야 한다.
const ProductPage2 = () => {
    //useParams로 id를 받아온다. 해당 params에 담기는 파라미터 값은 App에서 Route를 할 때 적어주고 있다.
    const { id } = useParams();
    //실제 파일을 불러올 axios 구문을 따로 함수로 빼내어 담았다.
    async function getProduct(){
        const result = await axios.get(`http://localhost:3000/product/${id}`);
        return result.data
    }
    //직접 만든 HOOK을 이용해 주솟값과 각각의 아이템들을 구분할 id값을 인자로 전달해주고, 그 결과값을 배열구조분해할당하여 state에 담아준다.
    //useAsync가 가장 마지막에 현 상태가 담긴 state와 성공 실패 여부에 따라 상태를 바꿔줄 fetchData를 return해주고 있기에 배열 구조분해할당이 가능하다.
    const [state] = useAsync(getProduct,[id])
    //위에서 구조분해할당으로 state에 담은 값을 다시 구조분해할당하여 data, loading, error로 각각 담는다. 이는 객체 구조분해할당이다.
    //state는 상태로 초기값으론 객체가 들어가 있고 case가 바뀌어도 return은 계속 객체로 해주고 있기 때문에 객체 구조분해할당이 맞다.
    const {data, loading, error} = state;
    //각각의 상태에 따라 return에줄 값을 정해준다.
    if(loading) return <div>로딩중</div>
    if(error) return <div>프로덕트 페이지 에러 발생</div>
    if(!data) return;
    return (
        <div className='inner'>
            <div id='image-box'>
                <img src={data.imageUrl} alt='' />
            </div>
            <div id='profile-box'>
                <ul>
                    <li>
                        <div>
                            <img src='/images/icons/avatar.png' alt="" />
                            <span>{data.seller}</span>
                        </div>
                    </li>
                    <li>{data.name}</li>
                    <li>{data.price}</li>
                    <li>등록일 2022년 06월 02일</li>
                    <li>상세설명</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductPage2;