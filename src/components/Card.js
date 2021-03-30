import React from 'react'


const Card =({stl, action, id, animating})=>
{
    return (<button className = {stl} onClick = {()=>action(id)}  style={{height: animating? '10px':'100px'}}></button>)
}

export default Card