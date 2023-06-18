import React, { Component } from 'react';
import "./Button.scss";


const Button = (props) => {
    // extraClass = dark, light, small, big
    return (
        <>
            <div className={"button " + props.extraClass}>
                {props.text}
            </div>
        </>
    )
}
export default Button;