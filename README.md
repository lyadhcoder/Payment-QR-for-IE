# 💳 Indrani Electronics — UPI Payment QR Generator

A simple, responsive, and user-friendly **UPI Payment QR Generator** developed for **Indrani Electronics**.

The application allows users to enter a payment amount, select a UPI ID, optionally add a payment description, and instantly generate a UPI payment QR code.

It also includes a split-payment feature for generating multiple QR codes from a single payment amount.

## 🌐 Live Website

**[payment.indranielectronics.com](https://payment.indranielectronics.com/)**

## ✨ Features

* Generate UPI payment QR codes instantly
* Enter custom payment amount
* Select from configured UPI IDs
* Add a payment description
* Split a payment into multiple QR codes
* Two split-payment calculation methods:

  * Equal Parts
  * Maximum ₹1,999 per QR
* Mark individual split-payment QR codes as **Paid**
* Undo the Paid status when required
* Dark Mode / Light Mode
* Theme preference saved using browser local storage
* Responsive design for desktop, tablet, and mobile devices
* Input validation and error messages
* Reset all fields and generated QR codes
* Dedicated Disclaimer page
* Terms & Conditions page
* Privacy Policy & Data Security page

## 🧾 How It Works

1. Enter the required payment amount.
2. Select the UPI account from the dropdown.
3. Optionally enter a payment description.
4. Choose whether to use Split Payment.
5. If Split Payment is enabled, select:

   * **Equal Part** — divides the total amount into multiple parts.
   * **Max ₹1,999** — creates multiple QR codes while keeping each QR amount at or below ₹1,999.
6. Click **Generate QR**.
7. Scan the generated QR code using a supported UPI application to initiate payment.

The application creates a standard `upi://pay` payment link containing the selected UPI ID, amount, currency, and, where applicable, the payment description.

## 💰 Split Payment

The Split Payment feature is designed to divide a larger payment amount into multiple QR codes.

### Equal Part

The total amount is divided into multiple approximately equal parts while keeping each generated QR amount below ₹1,999.

### Max ₹1,999

The application divides the payment into sequential parts, with each QR amount capped at ₹1,999.

For split payments, each generated QR card can also be individually marked as **Paid** or **Undo Paid**.

## 🌓 Theme Support

The website supports both:

* 🌙 Dark Mode
* ☀️ Light Mode

The selected theme is stored in the browser using `localStorage`, allowing the preference to persist between visits.

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* UPI Deep Link (`upi://pay`)
* QRCode.js
* Google Fonts — Titillium Web
* Browser Local Storage

## 📂 Project Structure

```text
Payment-QR-for-IE/
│
├── index.html
├── script.js
├── style.css
├── style2.css
│
├── disclaimer.html
├── term.html
├── privacy.html
│
└── README.md
```

## 📄 Pages

### Main Payment Page

`index.html`

The main application interface where users can enter the amount, select a UPI account, generate QR codes, and manage split payments.

### Disclaimer

`disclaimer.html`

Contains the website's disclaimer information.

### Terms & Conditions

`term.html`

Contains the Terms & Conditions applicable to the website.

### Privacy Policy & Data Security

`privacy.html`

Contains information regarding privacy and data security.

## 🚀 Run Locally

No backend or database is required to run the basic application locally.

### 1. Clone the repository

```bash
git clone https://github.com/lyadhcoder/Payment-QR-for-IE.git
```

### 2. Open the project folder

```bash
cd Payment-QR-for-IE
```

### 3. Run the website

Open `index.html` in a modern web browser.

Alternatively, you can use a local development server such as VS Code Live Server.

## 🔗 External Dependencies

The project uses:

* **QRCode.js** for QR code generation
* **Google Fonts** for typography

QRCode.js is loaded through the CDN included in `index.html`.

## 📱 Responsive Design

The interface is designed to provide a consistent experience across:

* Desktop
* Laptop
* Tablet
* Mobile devices

## 🔐 Privacy & Security

The project includes dedicated **Privacy Policy & Data Security**, **Terms & Conditions**, and **Disclaimer** pages.

The application generates UPI payment links in the browser and does not require a traditional backend server for QR generation.

Users should verify the payment details and the recipient UPI ID before completing a transaction.

## ⚠️ Important

This project generates UPI payment QR codes. It does **not** independently verify whether a payment has actually been received.

The **Mark as Paid** feature is a manual status indicator for split-payment QR cards and should not be treated as automatic payment confirmation.

Always verify successful payment through the appropriate bank or UPI payment application.

## 👨‍💻 Developer

**Sourav Mondal**

Developed for:

**Indrani Electronics**

## 📜 License

This project is currently published as a public GitHub repository.

Unless otherwise stated, the source code, design, branding, and associated content are intended for the project owner's use. Please contact the repository owner before reusing proprietary branding, logos, or business-specific content.

## 🔗 Repository

**GitHub:**
https://github.com/lyadhcoder/Payment-QR-for-IE

## 🌐 Live Project

**Website:**
https://payment.indranielectronics.com/
