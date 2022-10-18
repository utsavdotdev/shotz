import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useOutletContext } from 'react-router-dom';
import styles from '../styles/pages/Profile.module.css';

const Profile = () => {
  const { user } = useOutletContext();

  return (
    <>
      <Helmet>
        <title>Profile - Nhost</title>
      </Helmet>
    </>
  );
};

export default Profile;
