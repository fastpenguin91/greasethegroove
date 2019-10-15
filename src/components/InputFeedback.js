import React from 'react';
import classNames from 'classnames';

// Input feedback
const InputFeedback = ({ error }) =>
      error ? <div className={classNames("input-feedback")}>{error}</div> : null;

export default InputFeedback;
