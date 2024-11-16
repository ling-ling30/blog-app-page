"use client";

import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

type Props = {
  value: string;
  onChangeFn: (value: string) => void;
};

export const TextEditor = ({ value, onChangeFn }: Props) => {
  const [mounted, setMounted] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Quill modules configuration
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        // ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: {},
      },
    },
  };

  // Quill formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "align",
    "link",
    "image",
  ];

  // Image upload handler
  //   function imageHandler() {
  //     const input = document.createElement("input");
  //     input.setAttribute("type", "file");
  //     input.setAttribute("accept", "image/*");
  //     input.click();

  //     input.onchange = async () => {
  //       const file = input.files[0];
  //       if (file) {
  //         try {
  //           // Create FormData
  //           const formData = new FormData();
  //           formData.append("image", file);

  //           // Upload image to your server
  //           const response = await fetch("/api/upload", {
  //             method: "POST",
  //             body: formData,
  //           });

  //           const data = await response.json();

  //           // Get the Quill instance
  //           const quill = quillRef.current.getEditor();
  //           // Get the current cursor position
  //           const range = quill.getSelection(true);
  //           // Insert the image
  //           quill.insertEmbed(range.index, "image", data.url);
  //         } catch (error) {
  //           console.error("Error uploading image:", error);
  //           alert("Failed to upload image");
  //         }
  //       }
  //     };
  //   }

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-[400px]">
      <ReactQuill
        // ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChangeFn}
        modules={modules}
        formats={formats}
        className="h-[350px]"
      />
    </div>
  );
};

export default TextEditor;
