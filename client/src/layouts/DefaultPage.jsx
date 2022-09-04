import React from "react"

import './DefaultPage.css'

export default function DefaultPage(props) {
    return (
        <div className="defaultPage">
            {props.children}
        </div>
    );
}

