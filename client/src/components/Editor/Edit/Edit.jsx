import React from "react";
import styles from "./Edit.module.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Toolbar from "../Toolbar/Toolbar";
import { tab } from "../Extensions/tab";
import { FontSize } from "@tiptap/extension-text-style";
import { Placeholder } from "@tiptap/extensions";
import Blockquote from "@tiptap/extension-blockquote";
import { Image } from "@tiptap/extension-image";
export default function Edit() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                underline: false,
                link: false,
            }),
            Underline,
            TextStyle,
            FontSize,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            Link,
            Blockquote,
            tab,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({
                placeholder: "My Custom Placeholder",
            }),
            Image.configure({ inline: false, allowBase64: true }),
        ],
    });
    const save = () => {
        if (!editor) return;

        const html = editor.getHTML();
        console.log(html);
        localStorage.setItem("editor", html);
    };

    return (
        <div className={styles.container}>
            <Toolbar editor={editor} className={styles.toolbar} />
            <EditorContent editor={editor} className={styles.write} />
            <button type="submit" onClick={save} className={styles.submit}>
                SUBMIT
            </button>
        </div>
    );
}
