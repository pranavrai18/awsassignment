# 🌐 AWS S3 Static Website Hosting

This project demonstrates how to host a static website on Amazon S3 using HTML, CSS, and JavaScript.

---

## 📌 Objective

The objective of this assignment is to:

* Create a static website using HTML, CSS, and JavaScript
* Host the website using AWS S3
* Enable static website hosting
* Make the website publicly accessible via a URL

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* AWS S3 (Simple Storage Service)

---

## 📁 Project Structure

```
├── index.html
├── style.css
├── script.js
├── me.jpeg
└── README.md
```

---

## 🚀 Deployment Steps

### 1. Create Website Files

* Created `index.html` for structure
* Used `style.css` for styling
* Added `script.js` for interactivity
* Included an image (`me.jpeg`) 

---

### 2. Create S3 Bucket

* Open AWS Console → S3
* Created a bucket with a unique name

---

### 3. Upload Files

* Uploaded all project files:

  * `index.html`
  * `style.css`
  * `script.js`
  * `me.jpeg`

---

### 4. Enable Static Website Hosting

* Open bucket → **Properties**
* Enable **Static Website Hosting**
* Set:

  * Index document: `index.html`

---

### 5. Make Bucket Public

* Disabled "Block all public access"
* Added the following bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::your-bucket-name/*"]
    }
  ]
}
```

---

## 🌍 Live Website

🔗 http://aws-assignment-1-2026.s3-website.ap-south-1.amazonaws.com


---

## ✅ Result

The static website is successfully deployed and accessible publicly through an S3 endpoint.

---

## 📚 Learning Outcomes

* Learned how to deploy static websites on AWS S3
* Understood bucket policies and public access settings
* Gained practical experience with cloud-based hosting

---

## ✍️ Author

Pranav Rai
