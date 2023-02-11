import { useRef, useState, useEffect, useCallback } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../common/axios';
import './Signup.css'
import {
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    ChakraProvider,
  } from '@chakra-ui/react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Address from './Address'
import { useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'https://i8a806.p.ssafy.io/api/user/signup';

// 아이디, 비밀번호, 비밀번호 확인, 이름, 성별, 나이, 닉네임, 주소, 전화 , 이미지 
function Register({userResult}){
    // console.log(userResult);
    const userRef = useRef();
    const errRef = useRef();
    const imgRef = useRef();

    const [id, setId] = useState('');
    const [emailMsg, setEmailMsg] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [userName, setUserName] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userPhonenum, setUserPhonenum] = useState('');
    const [popup, setPopup] = useState(false);
    const [userAddress, setUserAddress] = useState({
        address:'',
    });

    const [userimgFile, setUserImgFile] = useState("");
    const [previewImg, setPreviewImg] = useState();
    
    // 이메일 인증버튼 모달을 위한 작성란
    const initialRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleInput = (e) => {
        setUserAddress({
            ...userAddress,
            [e.target.name]:e.target.value,
        })
    }
    
    const handleComplete = () => {
        setPopup(!popup);
    }
    //이메일 유효성 검사
    const validateEmail = (id) => {
        return id
          .toLowerCase()
          .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
      };

    const isEmailValid = validateEmail(id);

    //이메일 
  const onChangeEmail = useCallback( async (e) => {
    const currEmail = e.target.value;
    setId(currEmail);

    if (!validateEmail(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.")
    } else {
        setEmailMsg("올바른 이메일 형식입니다.")
      }
    })

    const navigate = useNavigate(); // navigate 변수 생성
    const navigateTag = () => { // 취소 클릭 시 홈으로 가기 위함
        navigate("/user/signup/hashtag");
      };
   
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [id, password, matchPwd])
  
    const encodeFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = () => {
            setPreviewImg(reader.result);
            resolve();
          };
        });
      };

  	const fileHandler = (event) => {
    	const [file] = event.target.files;
        
      
      	imageCompression(file, {
        	maxSizeMB: 1,
          	maxWidthOrHeight: 100,
        }).then((compressedFile) => {
        	const newFile = new File([compressedFile], file.name, {type: file.type});
          
          	//미리보기 관련 함수 추가
          	encodeFile(newFile);
          	setUserImgFile(newFile);
        });
    };

    function checkEmail (email) {
        console.log(email);
        const res = axios.get(`http://localhost:8080/api/auth/email?userEmail=${email}`);
        console.log(res.data);
        // return res.data;
    }
    
    return (
        <ChakraProvider>    
        <Header></Header>
            {success ? (
                <section className="SignupSection" style={{width : '90%'}}>
                    <h1>해시태그 선택창으로 이동합니다</h1>
                    <p>
                        <a href="/user/login">로그인</a>
                    </p>
                </section>
            ) : (
                <section className="SignupSection" style={{width : '90%'}}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 style={{textAlign:'center' ,fontSize:'30px'}}>회원가입</h1>
                    <form className="SignupForm">
                        <label className='SignLabel' htmlFor="userid">
                            <div className="id-and-check">
                                <div>
                                아이디
                                </div>
                            <button className='check-btn' onClick={checkEmail(id)}>인증코드 전송</button>
                            </div>
                            </label>
                        <input
                        className="SignupInput"
                        type="text"
                        id="userid"
                        ref={userRef}
                        autoComplete="off"
                        onChange={onChangeEmail}
                        value={id}
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        placeholder='아이디를 입력하세요'
                    />
                        <p className={isEmailValid ? 'success' : 'error'}>{emailMsg}</p>
                        <label className='SignLabel' htmlFor="password">
                            비밀번호
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="SignupInput"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            placeholder='비밀번호를 입력하세요'
                            />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8~24자까지<br />
                            소문자, 숫자, 특수문자를 포함해야 합니다.<br />
                            허용 특수문자: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        <br/>
                        <label htmlFor="confirm_pwd">
                            비밀번호 확인
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="SignupInput"
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            placeholder='비밀번호를 다시 입력하세요'
                            />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            입력했던 비밀번호와 정확히 일치해야 합니다.
                        </p>


                        {/* 이하 상세정보 - 이름, 나이, 성별, 닉네임, 주소, 핸드폰번호*/}
                        <label className='signup-detail-label' htmlFor="confirm_pwd">
                            이름
                        </label>

                        <input
                            className="SignupInput"
                            type="userName"
                            id="confirm_pwd"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            placeholder='이름을 입력하세요'
                            />

                        <label className='signup-detail-label' htmlFor="confirm_pwd">
                            나이
                        </label>
                        <input
                            className="SignupInput"
                            type="userAge"
                            id="confirm_pwd"
                            onChange={(e) => setUserAge(e.target.value)}
                            value={userAge}
                            placeholder='나이를 입력하세요'
                            />

                        <label className='signup-detail-label' htmlFor="confirm_pwd">
                            성별
                        </label>
                        <div style={{display:'flex', justifyContent:'space-around'}} > 
                            <p>
                                <label for="male">남성</label>
                                <input style={{marginLeft:'10px'}} id="male" type="radio" value="남성" name="ss"/>
                            </p>
                            <p>
                                <label for="female">여성</label>
                                <input style={{marginLeft:'10px'}} id="female" type="radio" value="여성" name="ss"/>
                            </p>
                        </div>

                        {/* 중복여부 설정해야함 */}
                        <label className='signup-detail-label' htmlFor="confirm_pwd">
                            닉네임
                        </label>

                        <input
                            className="SignupInput"
                            type="userNickname"
                            id="confirm_pwd"
                            onChange={(e) => setUserNickname(e.target.value)}
                            value={userNickname}
                            placeholder='닉네임을 입력하세요'
                            />
                        
                        {/* 다음주소 라이브러리 끌어오기 */}
                        <label className='signup-detail-label' htmlFor="confirm_pwd">
                            주소
                        </label>
                        <input 
                            className="SignupInput" 
                            placeholder="주소를 입력하세요"  
                            type="text" 
                            name="address" 
                            onChange={handleInput} 
                            value={userAddress.address}
                            br/>

                        <button style={{textAlign:'left'}} className="address-button" onClick={handleComplete}>주소 찾기</button>
                        {popup && <Address company={userAddress} setcompany={setUserAddress}></Address>}

                        <label className='signup-detail-label' htmlFor="confirm_pwd">
                            핸드폰 번호
                        </label>
                        <input
                            className="SignupInput"
                            type="userPhonenum"
                            id="confirm_pwd"
                            onChange={(e) => setUserPhonenum(e.target.value)}
                            value={userPhonenum}
                            placeholder='핸드폰 번호를 입력하세요'
                            />

                        {/* <Button disabled={success} onClick={navigateTag} style={{margin:'0 auto' ,marginTop:'10px' }}> 
                        완료
                        </Button>  */}
                        <button onClick={checkEmail}>완료</button>
                     </form>
                    <p>
                        이미 회원가입을 하셨다면?
                     <a href="/user/login" style={{ marginLeft:'10px', textDecoration: 'underline'}}>로그인페이지로 이동</a>
                    </p>
                    <p>
                        프로필 사진을 추가하고 싶으시다면? 
                        <img src={previewImg}/>
                        <input type="file" accept="image/*" onChange={(event) => fileHandler(event)}/>
                    </p>
            {/* 모달창 코드 */}
                <Modal isCentered isOpen={isOpen} onClose={onClose} size='xs' className='modal'>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>이메일 인증</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pt='10px' pb='10px'>
                    입력하신 이메일로 인증번호를 전송했습니다.
                    </ModalBody>
                    <Input style={{width:'90%'}} ml='15px' ref={initialRef} placeholder='인증번호를 입력해주세요' />
                    <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onClose}>
                        취소
                    </Button>
                    <Button variant='ghost' onClick={onClose}>확인</Button>
                    </ModalFooter>
                    </ModalContent>
            </Modal>
            </section>
            )}
    <Footer></Footer>
    </ChakraProvider>
    )
}

export default Register;