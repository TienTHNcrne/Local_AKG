import React from "react";
import styles from "./MarkButton.module.scss";
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
const IconMap = {
    Bold: FaBold,
    Italic: FaItalic,
    Underline: FaUnderline,
    Blockquote: FaQuoteRight,
    Link: FaLink,
    BulletList: FaListUl,
    OrderedList: FaListOl,
    AlignLeft: FaAlignLeft,
    AlignCenter: FaAlignCenter,
    AlignRight: FaAlignRight,
    Highlighter: FaHighlighter,
};
const out = {
    AlignLeft: (editor) => editor.chain().focus().setTextAlign("left").run(),
    AlignCenter: (editor) =>
        editor.chain().focus().setTextAlign("center").run(),
    AlignRight: (editor) => editor.chain().focus().setTextAlign("right").run(),
    Link: (editor) => {
        const url = prompt("URL:");
        if (url) editor.chain().focus().setLink({ href: url }).run();
    },
};
//EXPORT
export default function MarkButton({ mark, editor, color }) {
    const Icon = IconMap[mark];
    const isActive = editor.isActive(mark.toLowerCase());
    if (!editor || !Icon) return null;
    return (
        <div className={styles.icon}>
            <button
                onClick={() => {
                    if (mark === "Highlighter") {
                        console.log(color);
                        return editor
                            .chain()
                            .focus()
                            .setHighlight({ color })
                            .run();
                    }
                    if (out[mark]) return out[mark](editor);

                    const e = editor.chain().focus()[`toggle${mark}`];
                    if (typeof e === "function") e().run();
                }}
                className={isActive ? styles.ok : ""}
            >
                {Icon && <Icon />}
            </button>
        </div>
    );
}
