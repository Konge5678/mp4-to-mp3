document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('#file').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('video', file);

      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
      .then(() => {
        const source = new EventSource('/progress');
source.onmessage = (event) => {
  const percentage = event.data;
  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = `${percentage}%`;
};
      })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'audio.mp3';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error(error));
    }
  });
});