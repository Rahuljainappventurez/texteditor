import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const MyEditor = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleChange = (value) => {
    setEditorContent(value);
  };

  return (
    <div>
      <h2>React Quill Editor</h2>
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        modules={MyEditor.modules}
        formats={MyEditor.formats}
      />
      <div>
        <h3>Editor Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
};

// Define modules and formats for the editor
MyEditor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['blockquote', 'code-block'],
    ['clean']
  ]
};

MyEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'color', 'background', 'align'
];

export default MyEditor;
