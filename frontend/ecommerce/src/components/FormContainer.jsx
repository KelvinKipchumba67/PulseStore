import React from 'react';
import styles from './Formcontainer.module.css';

const FormContainer = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FormContainer;