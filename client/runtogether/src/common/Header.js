import React from 'react';
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // fontawesome 사용
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons"; // 로고(사람 달리는 아이콘)
import {faHeart, faCommentDots} from "@fortawesome/free-regular-svg-icons" // 알림(하트), 채팅 버튼
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <ChakraProvider theme={theme}>
            <header className='header'>
              <div className='logo left-header'><Link to='/'><FontAwesomeIcon icon={faPersonRunning} /></Link></div>
              <div className='right-header'>
                <div className='notice'><Link to="/notice"><FontAwesomeIcon icon={faHeart} /></Link></div>
                <div className='chat'><Link to="/chatting"><FontAwesomeIcon icon={faCommentDots} /></Link></div>
              </div>
            </header>
        </ChakraProvider>
      );
}

export default Header;
