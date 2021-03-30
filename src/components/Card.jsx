import React from 'react';
import PropTypes from 'prop-types';

const Card =({ stl, action, id, animating }) =>{
    return (
    <button className = {stl} onClick = {()=>action(id)}  style={{height: animating? '10px':'100px'}}/>
    
    )
};

Card.propTypes=
{
    stl: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    animating: PropTypes.bool.isRequired
}

export default Card;
