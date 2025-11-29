import React, { useState } from "react";
import ColorHighlight from "../Extensions/ColorHighlight/ColorHighlight";
import { MdCode, MdTitle, MdHorizontalRule } from "react-icons/md";
import { RiFontSize } from "react-icons/ri";
import { BsFillPaletteFill } from "react-icons/bs";
import styles from "./Toolbar.module.scss";
import { FaImage } from "react-icons/fa";
import MarkButton from "../Extensions/MarkButton/MarkButton";
const IconMap = [
    "Bold",
    "Italic",
    "Underline",
    "setBlockquote",
    "unsetBlockquote",
    "Link",
    "BulletList",
    "OrderedList",
    "AlignLeft",
    "AlignCenter",
    "AlignRight",
    "Highlighter",
    "undo",
    "redo",
    "Image",
    "Indent",
    "Outdent",
];

export default function Toolbar({ editor }) {
    const [color, setColor] = useState("#ffff00");
    return (
        <div className={styles.toolbar}>
            {IconMap.map((value, id) => (
                <MarkButton
                    key={id}
                    editor={editor}
                    mark={value}
                    color={color}
                />
            ))}
            {/*Highlight color */}
            <ColorHighlight editor={editor} setColor={setColor} />

            <input
                type="number"
                min={8}
                max={72}
                step={1}
                defaultValue={16}
                onChange={(e) => {
                    const value = `${e.target.value}px`;
                    editor
                        .chain()
                        .focus()
                        .setMark("textStyle", { fontSize: value })
                        .run();
                }}
                style={{ width: "60px", marginLeft: "10px" }}
            />
            {/* IMAGE */}
            <label style={{ cursor: "pointer" }}>
                <FaImage />
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const render = new FileReader();
                        render.onload = () => {
                            console.log(render.result);

                            editor
                                .chain()
                                .focus()
                                .setImage({ src: render.result })
                                .run();
                        };
                        render.readAsDataURL(file);
                    }}
                />
            </label>
        </div>
    );
}
