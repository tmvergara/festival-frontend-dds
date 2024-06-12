import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import "tailwindcss/tailwind.css"; // Asegúrate de tener Tailwind importado

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border p-3 rounded-xl mb-4">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`btn btn-xs mr-1 ${
          editor.isActive("bold") ? "bg-gray-300" : "bg-white"
        }`}
      >
        bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`btn btn-xs mr-1 ${
          editor.isActive("italic") ? "bg-gray-300" : "bg-white"
        }`}
      >
        italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`btn btn-xs mr-1 ${
          editor.isActive("strike") ? "bg-gray-300" : "bg-white"
        }`}
      >
        strike
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`btn btn-xs mr-1 ${
          editor.isActive("code") ? "bg-gray-300" : "bg-white"
        }`}
      >
        code
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="btn btn-xs mr-1 bg-gray-500 text-white"
      >
        clear marks
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="btn btn-xs mr-1 bg-gray-500 text-white"
      >
        clear nodes
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className="btn btn-xs mr-1"
      >
        paragraph
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="btn btn-xs mr-1"
      >
        h1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="btn btn-xs mr-1"
      >
        h2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className="btn btn-xs mr-1"
      >
        h3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className="btn btn-xs mr-1"
      >
        h4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className="btn btn-xs mr-1"
      >
        h5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className="btn btn-xs mr-1"
      >
        h6
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="btn btn-xs mr-1"
      >
        bullet list
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="btn btn-xs mr-1"
      >
        ordered list
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="btn btn-xs mr-1"
      >
        code block
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="btn btn-xs mr-1"
      >
        blockquote
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="btn btn-xs mr-1 bg-gray-500 text-white"
      >
        horizontal rule
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="btn btn-xs mr-1 bg-gray-500 text-white"
      >
        hard break
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className="btn btn-xs mr-1 bg-purple-200"
      >
        purple
      </button>
      <hr className="my-2" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="btn btn-xs mr-1 bg-gray-900 text-white"
      >
        undo
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="btn btn-xs mr-1 bg-gray-900 text-white"
      >
        redo
      </button>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const TiptapEditor = ({ content, onChange, error }) => {
  const handleUpdate = ({ editor }) => {
    const content = editor.getHTML();
    console.log("Contenido actualizado:", content);
    if (content == "<p></p>") {
      onChange(null);
    } else {
      onChange(content);
    }
  };

  const editor = useEditor({
    extensions: extensions,
    content: content,
    onBlur: handleUpdate,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div
      className={`border p-3 rounded-xl my-2 ${error ? "border-red-500" : ""}`}
    >
      <MenuBar editor={editor} />
      <div className="border p-4 rounded-xl">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
