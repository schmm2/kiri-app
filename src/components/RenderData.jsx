import React from "react"
import ReactJson from 'react-json-view'
import { findType } from 'util/findType';
import { renderDate } from 'util/renderDate'

export const RenderData = ({ record }) => {
    let type = findType(record);
    // console.log("found type " + type + " for data " + record);

    switch (type) {
        case "array":
            return (<ReactJson name={false} enableClipboard={true} displayDataTypes={false} src={record} />)
        case "object":
            return (<ReactJson name={false} enableClipboard={true} displayDataTypes={false} src={record} />)
        case "date":
            return renderDate(record);
            break;
        case "boolean":
            return record.toString()
        case "null":
            return "not set"
        default:
            console.log(record);
            return (<span className="lineBreakAnywhere" > { record} </span>)
    }
}
