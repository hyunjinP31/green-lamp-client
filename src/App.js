import './App.css';
import Footer from './include/Footer';
import Header from './include/Header';
import MainPage from './main'; // useAsync 안 쓴거
import { Routes, Route } from 'react-router-dom';
import UploadPage from './upload';
import ProductsCostomHook from './main/index2';
import ProductPage3 from './product/index_teacher';
import './main/index.scss';
import MainPage3 from './main/index_teacher';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage3 />} />
        {/* 파라미터로 id를 넣어줌. 해당 id는 차후 각각 상품들의 페이지를 구별해준다. 이를 위해 id값을 받아 link=to""로 경로를 적을 때 해당 파라미터 값에 id변수를 넣어주었다. */}
        <Route path='/product/:id' element={<ProductPage3 />} />
        <Route path='/upload' element={<UploadPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
