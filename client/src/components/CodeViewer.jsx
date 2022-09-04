import React from "react"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CodeViewer = ({ code, language, convertFromBase64 }) => {
    if(convertFromBase64){
        code = Buffer.from(code, "base64").toString();
    }
    return (
        <SyntaxHighlighter language={language} style={materialDark}>
            {code}
        </SyntaxHighlighter>
    );
};