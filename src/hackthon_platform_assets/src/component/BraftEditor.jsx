import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const BraftEditor = (props) => {
    const { value, setValue, type } = props;

    return (
        <ReactQuill theme="snow" style={{ color: "black" }} value={value} onChange={(val) => {
            //console.log(val)
            setValue((pre) => ({ ...pre, [type]: val }))
        }} />
    );
}