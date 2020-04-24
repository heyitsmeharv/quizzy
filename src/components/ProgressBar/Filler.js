import React from 'react';

// styles
import style from './styles.module.scss';

const Filler = (props) => {
  return (
    <div className={style.filler} style={{ width: `${props.percentage}%`}} />
  );
}

export default Filler;
