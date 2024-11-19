"use client";

import React, { useCallback, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { uploadFileTextEditor } from "./utils";

// Define the type for the Quill instance
type QuillType = any; // We'll use any here since the types are tricky with dynamic import

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(
  async () => {
    const { default: ReactQuill } = await import("react-quill");
    const WrappedQuill = (props: any) => {
      return <ReactQuill {...props} />;
    };
    WrappedQuill.displayName = "WrappedQuill";
    return WrappedQuill;
  },
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function TextEditor({ value: initialValue, onChange }: TextEditorProps) {
  const [value, setValue] = useState<string>(initialValue || "");
  const [quillInstance, setQuillInstance] = useState<QuillType>(null);

  useEffect(() => {
    if (initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = (content: string) => {
    setValue(content);
    onChange(content);
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      try {
        const files = input.files;
        if (!files?.length) return;

        const file = files[0];
        const filename = await uploadFileTextEditor(file);
        const url = `https://pub-4a63f2a777414973af0945f89596da80.r2.dev/${filename}`;

        if (quillInstance) {
          const range = quillInstance.getSelection();
          if (range) {
            quillInstance.insertEmbed(range.index, "image", url);
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  }, [quillInstance]);

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["code-block"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
  ];

  return (
    <ReactQuill
      theme="snow"
      placeholder="Start writing..."
      modules={modules}
      formats={formats}
      value={value}
      onChange={handleChange}
      onInit={(quill: QuillType) => setQuillInstance(quill)}
    />
  );
}

TextEditor.displayName = "TextEditor";

export default TextEditor;
