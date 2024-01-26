document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];
  
      if (!file) {
        alert('No file selected');
        return;
      }
  
      const formData = new FormData();
      formData.append('video', file);
  
      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    });
  });