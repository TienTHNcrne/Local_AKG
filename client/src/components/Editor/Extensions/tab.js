import { Extension } from "@tiptap/core";

export const tab = Extension.create({
    name: "tab",

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                return this.editor.commands.insertContent("     ");
            },
        };
    },
});
