import Quill from 'quill';

export const quillStartup = () => {
  const container = document.getElementById('editor');
  const toolbarOptions = [['bold','italic','underline']]
  const options = {
    modules: {
      toolbar: '#toolbar'
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
  };
  return new Quill(container, options);
}
