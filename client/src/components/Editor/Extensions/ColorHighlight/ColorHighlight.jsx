// HighlighterColorPicker.jsx
import React, { useState } from "react";
import styles from "./ColorHighlight.module.scss";
import { FaHighlighter } from "react-icons/fa";
import Highlight from "@tiptap/extension-highlight";

const colors = [
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#ff00ff",
    "#0000ff",
    "#ff0000",
    "#008080",
    "#008000",
    "#800080",
    "#000080",
    "#800000",
    "#808000",
    "#808080",
    "#000000",
    "#ffffff",
    "No color",
];
export default function ColorHighlight({ editor }) {
    const [show, setShow] = useState(false);
    return (
        <div className={styles.container}>
            <button
                onClick={() => {
                    setShow(!show);
                }}
            >
                <FaHighlighter />
            </button>
            {show && (
                <div className={styles.grid}>
                    {colors.map((value, id) => (
                        <div
                            key={id}
                            className={styles.member}
                            style={{
                                backgroundColor:
                                    value === "No color"
                                        ? "transparent"
                                        : value,
                                border:
                                    value === "No color"
                                        ? "1.5px dashed black"
                                        : "none",
                                position: "relative",
                            }}
                            onClick={() => {
                                setShow(!show);
                                if (value === "No color")
                                    editor
                                        .chain()
                                        .focus()
                                        .unsetHighlight()
                                        .run();
                                else
                                    editor
                                        .chain()
                                        .focus()
                                        .setHighlight({ color: value })
                                        .run();
                            }}
                        >
                            {value === "No color" && (
                                <span className={styles.no} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
