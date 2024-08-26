import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const MyEditor = () => {
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
  };

  useEffect(() => {
    // Trigger MathJax rendering whenever the content changes
    if (window.MathJax) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
    }
  }, [editorContent]);

  return (
    <div>
      <h2>CKEditor with MathJax Integration</h2>
      <div id="toolbar-container"></div>
      <CKEditor
        editor={DecoupledEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onChange={handleEditorChange}
        onReady={(editor) => {
          // Attach the toolbar to the HTML container
          const toolbarContainer = document.querySelector('#toolbar-container');
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        }}
        config={{
          toolbar: [
            'heading', '|',
            'bold', 'italic', '|',
            'link', 'blockQuote', '|',
            'bulletedList', 'numberedList',
            'imageUpload', 'insertTable', '|',
            'mediaEmbed', '|',
            'undo', 'redo', '|',
            'insertMath'
          ],
          extraPlugins: [function (editor) {
            editor.ui.componentFactory.add('insertMath', locale => {
              const view = new editor.ui.button.ButtonView(locale);

              view.set({
                label: 'Insert Math',
                withText: true,
                tooltip: true
              });

              view.on('execute', () => {
                const mathInput = prompt('Enter LaTeX math equation:');
                editor.model.change(writer => {
                  editor.model.insertContent(writer.createText(`\\(${mathInput}\\)`));
                });
              });

              return view;
            });
          }]
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


// import React, { useState, useEffect } from 'react';
// import {CKEditor} from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const MyEditor = () => {
//   const [editorContent, setEditorContent] = useState('');

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setEditorContent(data);
//   };

//   useEffect(() => {
//     // Trigger MathJax rendering whenever the content changes
//     if (window.MathJax) {
//       window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
//     }
//   }, [editorContent]);

//   return (
//     <div>
//       <h2>CKEditor in React</h2>
//       <CKEditor
//         editor={ClassicEditor}
//         data="<p>Hello from CKEditor 5!</p>"
//         onChange={handleEditorChange}
//         config={{
//             toolbar: [
//               'heading', '|',
//               'bold', 'italic',  '|',
//               'link', 'blockQuote', '|',
//               'bulletedList', 'numberedList',
//               'imageUpload', 'insertTable', '|',
//               'mediaEmbed',  '|',
//               'undo', 'redo'
//             ],
//             image: {
//               toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
//             },
//             table: {
//               contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
//             },

//             extraPlugins: [function (editor) {
//               // Adding a simple button to insert math syntax for MathJax
//               editor.ui.componentFactory.add('insertMath', locale => {
//                 const view = new editor.ui.button.ButtonView(locale);
  
//                 view.set({
//                   label: 'Insert Math',
//                   withText: true,
//                   tooltip: true
//                 });
  
//                 // Insert a LaTeX math placeholder when the button is clicked
//                 view.on('execute', () => {
//                   const mathInput = prompt('Enter LaTeX math equation:');
//                   editor.model.change(writer => {
//                     editor.model.insertContent(writer.createText(`\\(${mathInput}\\)`));
//                   });
//                 });
  
//                 return view;
//               });
//             }]


//           }}
//       />
//       <div>
//         <h3>Editor Content:</h3>
//         <div dangerouslySetInnerHTML={{ __html: editorContent }} />
//       </div>
//     </div>
//   );
// };  

// export default MyEditor;
