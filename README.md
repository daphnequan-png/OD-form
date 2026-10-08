# Team Preferences & Favorites Form

A clean, modern, and mobile-friendly HTML/CSS form designed to collect employee preferences for team birthdays, work anniversaries, dietary restrictions, and favorite treats.

Hosted via **GitHub Pages** and configured to email responses directly using **Formspree**.

---

## Features

- **Header**: "Team Preferences & Favorites" with a welcoming description.
- **Fields**:
  - Full Name (Text, Required)
  - Email Address (Email, Required)
  - Birth Month & Day (Select dropdowns - no birth year required)
  - Work Anniversary Date (Datepicker)
  - Favorite Snacks & Treats (Textarea)
  - Favorite Drinks (Coffee, Tea, Soda, etc.)
  - Favorite Restaurants / Coffee Shops
  - Hobbies & Interests (Textarea)
  - Preferred Gift Card Stores (Amazon, Starbucks, Target, etc.)
  - Dietary Restrictions or Allergies
  - Any specific dislikes or things to avoid
- **Responsive Design**: Clean corporate neutral aesthetic, optimized for both desktop and mobile viewports.
- **Form Submission**: Formspree integration with AJAX background submission and user feedback messages.

---

## Setup & Deployment Instructions

### 1. Setting up Formspree Endpoint

1. Go to [Formspree.io](https://formspree.io/) and sign up or log into your account.
2. Click **Create New Form**.
3. Name your form (e.g., *Team Preferences Form*) and enter the target email address where form responses (such as the EA or HR manager) should be sent.
4. Copy your unique **Form Endpoint URL** (it looks like `https://formspree.io/f/xeqy...`).
5. Open `index.html` in your repository.
6. Find the `<form>` tag and replace `YOUR_FORM_ID` with your actual Formspree endpoint ID:
   ```html
   <form id="preferencesForm" action="https://formspree.io/f/xeqy..." method="POST">
   ```
7. Save and commit your changes.

### 2. Publishing via GitHub Pages

1. Push this repository to GitHub.
2. Navigate to your repository on GitHub.com.
3. Click on **Settings** (top navigation tab).
4. In the left sidebar, under the **Code and automation** section, click **Pages**.
5. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
6. Under **Branch**, select `main` (or `master`) branch and `/ (root)` folder, then click **Save**.
7. Wait 1-2 minutes for GitHub Pages to build and deploy.
8. Your published form will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## Local Development & Testing

You can preview `index.html` locally by simply opening the file in any modern browser, or by serving it using a local HTTP server:

```bash
# Using Python 3 HTTP server
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.
