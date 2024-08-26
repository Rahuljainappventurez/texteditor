import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const MyEditor = () => {
  const [editorContent, setEditorContent] = useState('');


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (value) => {
    setEditorContent(value);
  };

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
    }
  }, [editorContent]);


  const handleInsertMath = () => {
    const mathInput = prompt('Enter LaTeX math equation:');
    if (mathInput) {
      setEditorContent(editorContent + `\\(${mathInput}\\)`);
    }
  };


  return (
    <div>
      <h2>React Quill Editor</h2>
      <button onClick={handleInsertMath}>Insert Math</button>
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
