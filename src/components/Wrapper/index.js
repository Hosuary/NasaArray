
import React from 'react';
import classnames from 'classnames';
import styles from './style.module.scss';

const Wrapper = ({ children, className }) => {
  return (
    <div className={classnames(styles.Wrapper, className)}>
      {children}
    </div>
  )
};

export default Wrapper;