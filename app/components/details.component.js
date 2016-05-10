/**
 * Created by jefferson on 10/05/16.
 */
import React from 'react';

class Details extends React.Component {
    render() {
        return (
            <div className='details'>
                <h3>{this.props.title}</h3>
            </div>
        );
    }
}

export default Details;