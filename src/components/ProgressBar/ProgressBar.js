import React from 'react';

// components
import Filler from './Filler';

// styles
import style from './styles.module.scss';

const ProgressBar = (props) => {
  return (
    <div className={style.progressBar}>
      <Filler percentage={props.percentage} />
    </div>
  );
}

export default ProgressBar;
