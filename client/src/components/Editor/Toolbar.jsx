import React, { useState } from "react";

import { MdCode, MdTitle, MdHorizontalRule } from "react-icons/md";
import { RiFontSize } from "react-icons/ri";
import { BsFillPaletteFill } from "react-icons/bs";
import styles from "./Toolbar.module.scss";
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaQuoteRight,
    FaLink,
    FaListUl,
    FaListOl,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
    FaHighlighter,
} from "react-icons/fa";
import MarkButton from "./Extensions/MarkButton";
const IconMap = [
    "Bold",
    "Italic",
    "Underline",
    "Blockquote",
    "Link",
    "BulletList",
    "OrderedList",
    "AlignLeft",
    "AlignCenter",
    "AlignRight",
    "Highlighter",
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
            <input
                type="color"
                value={color}
                onChange={(e) => {
                    setColor(e.target.value);
                }}
            />
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
        </div>
    );
}
