# **Event Management Web App - Implementation Report**

## **Overview**

This project is a **React-based event management web app** that allows users to create, list, and manage events while ensuring a **visually appealing** and **responsive UI/UX**. The app persists data using **local storage** and optimizes media handling through client-side processing.

---

## **Implemented Features**

### ✅ **Event Creation Form**

- Implemented a **form** for creating events, following the provided mock-up.
- **Fields included**:
  - Event Title (**text input**)
  - Event Date and Time (**date/time picker**)
  - Event Location (**text input**)
  - Event Description (**text area**)
  - **Media Upload** (image/video) with preview and 4:5 aspect ratio resizing (using Canvas API).
- **Input Validation** ensures required fields are filled before submission.

---

### ✅ **Event Listing Page**

- Displays a **scrollable list** of all created events.
- Each event card shows:
  - **Title**
  - **Date and Time**
  - **Thumbnail of uploaded media (if available)**
- **Responsive Design**:
  - **1 event per row** on small screens
  - **2 events per row** on medium screens
  - **3 events per row** on large screens

---

### ✅ **Data Persistence**

- **Stored event data in local storage** to ensure data retention across page reloads.
- Used **base64 encoding** to store media efficiently while avoiding local storage limitations.

---

### ✅ **UI/UX Enhancements**

- Built using **React** with a focus on **responsive design**.
- Ensured **visual appeal** and **user-friendly interactions**.
- Optimized media handling to prevent performance issues.

---

## **Additional Features & Improvements** 🚀

### 🌟 **Home Page & Navbar**

- Added a **dedicated home page** to improve navigation.
- Implemented a **navbar** for easy access across different sections.
- **Custom hamburger-style navbar** for smaller screens for better usability.

### 🎨 **UI Adjustments for Different Screen Sizes**

- On **large screens**, the preview **image does not fill the parent div entirely**, improving layout consistency.
- **Dynamic event display**:
  - **1 event per row** on small screens
  - **2 events per row** on medium screens
  - **3 events per row** on large screens

### 🖱️ **Event Card Enhancements**

- **Hover effect**: Event cards **pop out slightly** when hovered to enhance interactivity.
- **Click to expand**: Users can **click on an event card** to **view the full event details** in an enlarged modal/pop-up.

---
