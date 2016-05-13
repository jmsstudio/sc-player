/**
 * Created by jefferson on 10/05/16.
 */
import React from 'react';

const Progress = ({elapsed, position, total}) => {
    return (
        <div className='progress'>
            <span className='player__time-elapsed'>{elapsed}</span>
            <progress
                value={position}
                max='1'>
            </progress>
            <span className='player__time-total'>{total}</span>
        </div>
    );
};

export default Progress;