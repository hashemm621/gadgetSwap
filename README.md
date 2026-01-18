# 📱 GadgetSwap - Used Gadget Marketplace

GadgetSwap is a modern, responsive full-stack web application where users can list and browse used gadgets. Built with **Next.js 16** and **Express.js**, the platform features secure item listing, image uploads via ImgBB, and protected routes using Next.js Proxy/Middleware.

---

## ✨ Features

* **Secure Authentication:** Access to the `Add Product` page and API is protected by session-based cookies.
* **Item Listing:** Users can list gadgets with details like category, price, condition, and location.
* **Image Upload:** Integrated with ImgBB API for seamless cloud-based image storage.
* **Dynamic Browsing:** A real-time product feed sorted by the most recent posts.
* **Smart Redirection:** Unauthenticated users are redirected to the login page and returned back to their intended destination after signing in (Callback URL handling).
* **Responsive UI:** Fully mobile-friendly design built with Tailwind CSS and DaisyUI.
* **Robust Error Handling:** Real-time form validation and toast notifications for success/error states.

---

## 🚀 Tech Stack

**Frontend:** Next.js 16 (App Router), Tailwind CSS, DaisyUI, TanStack Query, React Hook Form, Axios.  
**Backend:** Node.js, Express.js, MongoDB, Cookie-parser.  
**Tools:** ImgBB API, Lucide React (Icons), SweetAlert2.

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js installed
- MongoDB URI
- ImgBB API Key

### 1. Clone the repositories
```bash
# Frontend + Backend
git clone https://github.com/hashemm621/gadgetSwap.git
```
### Frontend .env
NEXT_PUBLIC_IMGBB_API_KEY=31337eec15abfd2bf01b3006065c6ddf

### Backend .env
DB_URI=mongodb+srv://gadgetSwapDB:lX34fWxzNreKr1sm@simple-crud-2.ahrgsbv.mongodb.net/?appName=simple-crud-2


### run and instal
# In both directories
npm install
npm run dev # for frontend
npm start   # for backend


### Frontend
Route,Access,Description
/,Public,Home page with features summary.
/items,Public,Browse all available gadgets.
/items/:id,Public,Detailed view of a specific gadget.
/add-item,Private,Page to list a new product (Protected by Proxy).
/login,Public,Authentication page.


### Backend 
Method,Endpoint,Protection,Description
GET,/items,Public,Fetch all gadgets.
GET,/items/:id,Public,Fetch a single gadget by ID.
POST,/items,Private,Create a new listing (VerifyUser Middleware).