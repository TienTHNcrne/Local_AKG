import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Toolbar from "./Toolbar";
import { tab } from "./Extensions/tab";
import { FontSize } from "@tiptap/extension-text-style";
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
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            tab,
        ],
        content: "<p>Soạn thảo nội dung ở đây...</p>",
    });

    return (
        <div style={{ padding: 20 }}>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
