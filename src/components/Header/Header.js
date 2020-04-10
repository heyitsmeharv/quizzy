import React from 'react';
import styles from './styles.module.scss';

const Header = props => {
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>
        {props.text}
      </div>
    </div>
  )
}

export default Header
