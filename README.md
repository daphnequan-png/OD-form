# Team Preferences & Favorites Form

A clean, modern, and mobile-friendly solution to collect employee preferences for team birthdays, work anniversaries, dietary restrictions, and favorite treats.

This repository supports both:
1. **GitHub Pages HTML/CSS Form** (with Formspree integration for direct email submission)
2. **Google Apps Script (`Code.gs`)** (to programmatically generate a Google Form linked to a Google Sheet with a "Raw data" responses tab)

---

## 1. GitHub Pages HTML/CSS Form Setup

### Features
- **Header**: "Team Preferences & Favorites" with welcoming description.
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
- **Responsive Styling**: Clean corporate neutral palette, smooth rounded borders, and mobile optimization.
- **Submission**: Formspree integration with background AJAX fetch request and status message feedback.

### Formspree Configuration
1. Sign up or log into [Formspree.io](https://formspree.io/).
2. Create a new form and set the destination email address (e.g., Executive Assistant or HR contact).
3. Copy your Formspree endpoint URL (e.g. `https://formspree.io/f/YOUR_FORM_ID`).
4. In `index.html`, replace `YOUR_FORM_ID` in the `<form action="...">` attribute with your unique Formspree form ID.

### Publishing via GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Source**, select **Deploy from a branch**.
4. Select the `main` (or `master`) branch and `/ (root)` folder, then click **Save**.
5. Access your live form at `https://<your-username>.github.io/<your-repo-name>/`.

---

## 2. Google Apps Script Setup (`Code.gs`)

If you prefer using Google Forms linked to Google Sheets:

### Script Capabilities
- Programmatically creates a Google Form titled **"Team Preferences & Favorites"**.
- Adds all required form fields with proper field types (Short Answer, Paragraph, Date, Required attributes).
- Creates a destination Google Spreadsheet and links the form to it.
- Programmatically renames the response tab to **"Raw data"**.

### Execution Instructions
1. Open Google Apps Script ([script.google.com](https://script.google.com/)).
2. Create a new project.
3. Replace the content of `Code.gs` with the code provided in `Code.gs` in this repository.
4. Select `createPreferenceForm` from the function dropdown at the top.
5. Click **Run**.
6. When prompted, authorize the requested Google Form and Google Drive/Sheets permissions.
7. Open the Execution Log to view the generated Google Form URL and Google Sheet URL.
8. Submit a test response to verify that responses land directly in the **"Raw data"** tab of the linked sheet.

---

## Local Testing

Preview `index.html` locally using Python's built-in HTTP server:

```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.
