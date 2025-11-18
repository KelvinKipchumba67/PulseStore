import React from 'react';
import styles from './message.module.css';

const Message = ({ variant = 'info', children }) => {
  // Get the style class based on the variant (e.g., 'danger', 'success')
  const messageClass = styles[variant] || styles.info;

  return <div className={`${styles.message} ${messageClass}`}>{children}</div>;
};

export default Message;