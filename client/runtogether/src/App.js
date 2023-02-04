import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import RunningCrewList from './RunningCrewList/RunningCrewList';
import CreateFeed from './CreateFeed/CreateFeed';
import RecruitCrew from './RecruitCrew/RecruitCrew';
import Search from './Search/Search';
import Feed from './Feed/Feed';
import FollowPage from './FollowList/FollowList';
import SettingIntro from './Setting/SettingIntro';
import User from './Setting/User';
import Login from './User/Login';
import Register from './User/Signup';
import Notice from './Notice/Notice';
import DrawMap from './DrawMap/DrawMap';
import "./App.css";

function App() {
  return (
      <main className="App">
        <ChakraProvider theme={theme} className='body'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/user/login' element={<Login />} />
              <Route path='/user/signup' element={<Register />} />
              <Route path='/create-feed' element={<CreateFeed />} />
              <Route path='/running-crew-list' element={<RunningCrewList />} />
              <Route path='/create-running-crew' element={<RecruitCrew />} />
              <Route path='/search' element={<Search />} />
              <Route path='/feed' element={<Feed />} />
              <Route path='/feed/follow' element={<FollowPage />} />
              <Route path='/settingIntro' element={<SettingIntro />} />
              <Route path='/user' element={<User />} />
              <Route path='/notice' element={<Notice />} />
              <Route path='/draw-map' element={<DrawMap />} />
            </Routes>
          </BrowserRouter>
          {/* <MainPage></MainPage> */}
          {/* <RunningCrewList></RunningCrewList> */}
          {/* <CreateFeed></CreateFeed> */}
          {/* <RecruitCrew></RecruitCrew> */}
        </ChakraProvider>
      </main>
  );
}


export default App;