import React from "react";
import Maps from "../../components/Maps/Maps";
export default function Location() {
    const file = localStorage.getItem("editor");
    return (
        <div>
            <Maps />
            <div dangerouslySetInnerHTML={{ __html: file }} />
        </div>
    );
}
