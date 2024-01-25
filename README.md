# Project Description

This project is a simple web application that allows users to upload MP4 files and convert them to MP3 format. It uses Node.js and Express for the server-side logic, and ffmpeg for the file conversion.

The application provides a form for users to upload their MP4 files. Once a file is uploaded, it is converted to MP3 format using ffmpeg. The converted file is then downloaded to the user's device. After the download is complete, the uploaded and converted files are deleted from the server to save storage space.

## How to Run the Project

Follow these steps to run the project:

1. **Clone the repository:** Use the following command to clone the repository to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. **Install the dependencies:** Navigate to the project directory and install the necessary dependencies with the following command:

    ```bash
    cd <project-directory>
    npm install
    ```

3. **Start the server:** Start the server with the following command:

    ```bash
    npm start
    ```

The server will start on port 3000. You can access the application by opening your web browser and navigating to `http://localhost:3000`.

Please note that you need to have Node.js and npm installed on your machine to run this project. You also need to have ffmpeg installed and added to your system's PATH.
