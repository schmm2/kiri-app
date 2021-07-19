import { type } from 'os';
import { isIsoDate } from './isIsoDate';

var arrayConstructor = [].constructor;


const findType = (object) => {
    // console.log(typeof object);

    if (object === null) {
        return "null";
    }
    if (object === undefined) {
        return "undefined";
    }

    if(typeof object === "number"){
        return "number"
    }

    if (typeof object === "string") {
        if (isIsoDate(object)) {
            return "date"
        }
        return "string";
    }
    if (object.constructor === arrayConstructor) {
        return "array";
    }
    if (typeof object === "object") {
        return "object";
    }
    if (typeof object === "boolean") {
        return "boolean";
    }
    {
        return "error";
    }
}

export { findType };