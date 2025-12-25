import React from "react";

export default function ConImg({ img, title, className }) {
    return (
        <div className={className}>
            <img src={img} alt="khong co anh"></img>
            <h3>{title}</h3>
        </div>
    );
}
