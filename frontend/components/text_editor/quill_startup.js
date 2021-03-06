import Quill from 'quill';

export const quillStartup = () => {
  const container = document.getElementById('editor');
  const toolbarOptions = ['image']
  const options = {
    modules: {
      toolbar: '#toolbar' //toolbarOptions
    },
    placeholder: 'Just start typing...',
    theme: 'snow'
  };

  var Font = Quill.import('formats/font');
  Font.whitelist = [
    'lato',
    'monospace',
    'arial',
    'georgia',
    'pressStart2P',
    'permanentMarker',
    'pacifico',
    'courier',
    'times'];
  Quill.register(Font, true);

  return new Quill(container, options);

}
