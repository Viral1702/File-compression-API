# 🐰 RabbitMQ PDF Compressor API

This project is a Node.js-based microservice that allows you to upload **one or multiple PDF files**, send them to a **RabbitMQ queue**, and compress them using a worker process.

## 📦 Tech Stack

- **Node.js**
- **Express**
- **Multer** for file uploads
- **RabbitMQ** for message queue
- **compress-pdf** for PDF compression
- **fs** & **path** for file handling

---

## 🚀 Features

- Upload single or multiple PDF files
- Automatically send file paths to a RabbitMQ queue
- Background worker compresses each file
- Compressed files are saved in the `uploads` directory

---

## 📁 Folder Structure
├── uploads/ # Stores uploaded & compressed files

├── send.js # Producer: sends file path to RabbitMQ 

├── worker.js # Consumer: listens to queue and compresses files 

├── index.js # Main Express server


---

## 📥 How to Use

### 1. Clone the repo

```bash
git clone https://github.com/Viral1702/File-compression-API
```
### 2. Install dependencies
```
npm install
```
### 3. Make sure RabbitMQ is running
You can use Docker:
```
docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
RabbitMQ Dashboard: http://localhost:15672
```
Default login: guest / guest

### 4. Start the server
```
node index.js
```
📤 API Endpoint
Upload PDF(s)
POST /
Content-Type: multipart/form-data

Field Name: files

Multiple files supported ✅

Example using Postman:
Key	Type	Value
files	File	Select multiple PDFs
📄 Notes
The compression logic uses compress-pdf, which internally requires Ghostscript.

Install Ghostscript and add it to your system path.

Windows: gswin64c

Linux/macOS: gs

🙋‍♂️ Author
Made with ❤️ by VIRAL SHINGADIA

