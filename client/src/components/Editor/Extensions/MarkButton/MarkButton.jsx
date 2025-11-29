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
    FaIndent,
    FaOutdent,
    FaUndo,
    FaRedo,
    FaImages,
} from "react-icons/fa";
const IconMap = {
    Bold: FaBold,
    Italic: FaItalic,
    Underline: FaUnderline,
    setBlockquote: FaIndent,
    unsetBlockquote: FaOutdent,
    Link: FaLink,
    BulletList: FaListUl,
    OrderedList: FaListOl,
    AlignLeft: FaAlignLeft,
    AlignCenter: FaAlignCenter,
    AlignRight: FaAlignRight,
    undo: FaUndo,
    redo: FaRedo,
};

const out = {
    undo: (editor) => editor.chain().focus().undo().run(),
    redo: (editor) => editor.chain().focus().redo().run(),

    setBlockquote: (editor) => editor.chain().focus().setBlockquote().run(),
    unsetBlockquote: (editor) => editor.chain().focus().unsetBlockquote().run(),

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
    const isActive = () => {
        if (mark === "unsetBlockquote" || mark === "setBlockquote")
            return editor.isActive("blockquote");
        return editor.isActive(mark.toLowerCase());

        //
    };

    if (!editor || !Icon) return null;
    return (
        <div className={styles.icon}>
            <button
                onClick={() => {
                    console.log(mark);
                    if (mark === "Highlighter")
                        return editor
                            .chain()
                            .focus()
                            .setHighlight({ color })
                            .run();
                    if (out[mark])
                        //
                        return out[mark](editor);
                    //
                    const e = editor.chain().focus()[`toggle${mark}`];
                    console.log(e);
                    if (typeof e === "function") e().run();
                }}
                className={console.log(isActive)}
            >
                {Icon && <Icon />}
            </button>
        </div>
    );
}
