import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Link, useParams } from 'react-router-dom';
import './index.css';

export default function LoadingPage() {
  const { loading, data } = useQuery(QUERY_ME);
  const admin = data?.me.isAdmin;

  useEffect(() => {
    const redirect = async () => {
      if (!loading && Auth.loggedIn() && admin !== true) {
        window.location.href = "/studentAccommodations";
      } else if (data?.me.username) {
        window.location.href = `/teacherdata/${data.me.username}`;
      }
    };

    redirect();
  }, [loading, data]);

  return <div className='loader'>Loading...</div>;
}
