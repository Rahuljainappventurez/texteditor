import React, { useState } from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MyEditor = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
  };

  return (
    <div>
      <h2>CKEditor in React</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onChange={handleEditorChange}
        config={{
            toolbar: [
              'heading', '|',
              'bold', 'italic', 'underline', 'strikethrough', '|',
              'link', 'blockQuote', '|',
              'bulletedList', 'numberedList', 'todoList', '|',
              'imageUpload', 'insertTable', '|',
              'mediaEmbed', 'codeBlock', '|',
              'undo', 'redo'
            ],
            image: {
              toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
            },
            table: {
              contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
            }
          }}
      />
      <div>
        <h3>Editor Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
};

export default MyEditor;
