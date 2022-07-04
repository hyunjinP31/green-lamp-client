import React, {useState} from 'react';
import { Form, Divider, Input, InputNumber, Button, Upload } from 'antd';
import 'antd/dist/antd.css'
import './upload.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/contansts';


const UploadPage = () => {
    const navigate = useNavigate();
    //이미지 경로 상태관리하기
    const [imageUrl, setImageUrl ] = useState(null);
    //이미지 처리함수
    //info == 이미지를 업로드 했을 때 받아오는 값
    const onChangeImage = (info)=>{
        //info라는 객체 안에있는 file 이라는 key값에 접근. 해당 key의 value는 객체이고 그 객체 안에 각각의 값들이 있음
        //다시 찍어보기 귀찮을 테니까 긁어왔다..^^
        //console.log(info) 찍었을 때 {file: {…}, fileList: Array(1)} <-- 이런 객체가 담겨있고 file을 열어보면 아래의 값들이 담거있음
        //file:
            // lastModified: 1656634296439
            // lastModifiedDate: Fri Jul 01 2022 09:11:36 GMT+0900 (한국 표준시) {}
            // name: "product3.jpg"
            // originFileObj: File {uid: 'rc-upload-1656905527484-3', name: 'product3.jpg', lastModified: 1656634296439, lastModifiedDate: Fri Jul 01 2022 09:11:36 GMT+0900 (한국 표준시), webkitRelativePath: '', …}
            // percent: 0
            // size: 30750
            // 스테이터스가 한 번 바뀜. uploading 이 먼저 찍히고 done으로 바뀜.때문에 console에 총 세 번 찍히는데 이 둘의 중간에 ProgressEvent 이벤트 땜에(얘는 event not status) 한 번 또 찍힘
            // status: "uploading" 
            // type: "image/jpeg"
            // uid: "rc-upload-1656905527484-3"

            //done 일 때
            // file:
            //     lastModified: 1656634296439
            //     lastModifiedDate: Fri Jul 01 2022 09:11:36 GMT+0900 (한국 표준시) {}
            //     name: "product3.jpg"
            //     originFileObj: File {uid: 'rc-upload-1656906073877-3', name: 'product3.jpg', lastModified: 1656634296439, lastModifiedDate: Fri Jul 01 2022 09:11:36 GMT+0900 (한국 표준시), webkitRelativePath: '', …}
            //     percent: 100
            //     response: {imageUrl: 'http://localhost:3000/upload/product3.jpg'}
            //     size: 30750
            //     status: "done"
            //     type: "image/jpeg"
            //     uid: "rc-upload-1656906073877-3"
            //     xhr: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
            //     [[Prototype]]: Object
            //     fileList: [{…}]

        console.log(info);
        //파일이 업로드 중일때
        if(info.file.status === "uploading"){
            return;
        }
        if(info.file.status === "done"){
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            //받은 이미지경로를 imageUrl에 넣어줌
            setImageUrl(imageUrl);
        }
    }

    const onSubmit = (values)=>{
        //values == input들이 가지고 있던 값들 values.뫄뫄 의 '뫄뫄'
        console.log(values)
        //서버로 데이터 작성하기
        //post를 씀으로 해당 주소로 두 번째 인자로 적은 데이터들을 보내준다.
        axios.post(`${API_URL}/products`,{
            name: values.name,
            seller: values.seller,
            price: values.price,
            imageUrl : imageUrl,
            description: values.description,
        }).then(result=>{
            console.log(result);
            //submit하면 메인으로 돌아감.
            navigate(`/`);
        })
        .catch(e=>{
            console.log(e);
        })
    }
    return (
        <div id='upload-container' className='inner'>
            {/* submit 버튼을 누르면 onFinish 작동 */}
            <Form name='productUpload' onFinish={onSubmit}>
                <Form.Item name='imageUpload' label={<div className='upload-label'>상품사진</div>} >
                    {/* antd에서 import한 걸로 알아서 file을 업로드 할 수 있도록 해줌 지정해준 속성들은 antd 공홈에 upload 검색하면 맨 밑에 지정할 수 있는 속성들과 default 값이 나옴*/}
                    <Upload name='image' action={`${API_URL}/image`} listType='picture' showUploadList={false} onChange={onChangeImage}>
                        {/* 업로드 이미지가 있으면 이미지를 나타내고 이미지가 없으면 회색 배경에 업로드 아이콘이 나타나도록 */}
                        { imageUrl ? <img src={imageUrl} alt="" width="200px" height="200px" /> : (
                            <div id='upload-img-placeholder'>
                                <img src='images/icons/camera.png' alt='' />
                                <span>이미지를 업로드해주세요</span>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Divider />
                <Form.Item name='seller' label={<div className='upload-label'>판매자명</div>}>
                    <Input className='nameUpload' size='large' placeholder='판매자 이름을 입력하세요' />
                </Form.Item>
                <Divider />
                <Form.Item name='name' label={<div className='upload-label'>상품 이름</div>}>
                    <Input className='upload-name' size='large' placeholder='상품 이름을 입력해주세요' />
                </Form.Item>
                <Divider/>
                <Form.Item name='price' label={<div className='upload-label'>상품가격</div>}>
                    <InputNumber defaultValue={0} size='large' />
                </Form.Item>
                <Divider />
                <Form.Item name='description' label={<div className='upload-label'>상품소개</div>}>
                    <Input.TextArea size='large' id='product-description' maxLength={300} placeholder='상품소개를 적어주세요' />
                </Form.Item>
                <Form.Item>
                    <Button id='submit-button' size='large' htmlType='submit'>
                        상품 등록하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UploadPage;