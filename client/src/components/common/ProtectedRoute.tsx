import Cookies from 'js-cookie'
import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../../redux/user/userAction';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

interface MyComponentProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<MyComponentProps>  = ({children}) => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if(token){
      dispatch(getUser(token));
    }else {
      navigate('/auth')
    }
  }, [])

  return (
    children
  )
}

export default ProtectedRoute