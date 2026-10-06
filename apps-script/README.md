# Athena Leadership Accelerator Nomination Web App

Google Apps Script web app for submitting Athena Leadership Accelerator nominations to Google Sheets.

## Deployment Setup Instructions

1. **Bind Script to the Spreadsheet**
   - Open the Google Sheet: [Nominate a future Operations Director](https://docs.google.com/spreadsheets/d/1xTvjpWEDbCO121xt9NSmIXbdzCY2STPCvZJAwjYdh48)
   - Go to **Extensions** → **Apps Script**.
   - Copy the contents of `Code.gs` into `Code.gs` in the editor.
   - Click **+** next to Files, add an HTML file named `Index` and paste the contents of `Index.html`.
   - Go to **Project Settings** (gear icon) and check **"Show appsscript.json manifest file in editor"**.
   - Open `appsscript.json` in the editor and replace its contents with `appsscript.json` from this repository.

2. **Initialize Sheet Formatting**
   - In the Apps Script editor, select the `setupSheet` function from the dropdown list.
   - Click **Run** and grant the necessary permissions when prompted.
   - Confirm that the `Nominations` tab is formatted with header colors, freeze rows/columns, dropdown status validations, conditional formatting, and filter.

3. **Deploy Web App**
   - Click **Deploy** → **New deployment**.
   - Select type: **Web app**.
   - Set **Description**: `Initial Deployment`.
   - Set **Execute as**: `Me` (`USER_DEPLOYING`).
   - Set **Who has access**: `Anyone within Athena` (`DOMAIN`).
   - Click **Deploy**.
   - Copy the generated Web App URL. Share this URL with Operations Directors (ODs) and Hub VPs.

4. **Permissions & Access Control**
   - Keep the underlying Google Sheet shared **only** with the program team.
   - Nominators submit via the web app URL and do not need view or edit access to the Sheet itself.

5. **Updating Code**
   - After editing code in the Apps Script editor (such as pasting an updated `Index.html`) or pushing via Clasp:
   - Go to **Deploy** → **Manage deployments** → **Edit (pencil icon)** → **Version: New version** → **Deploy**. The web app URL stays the same.

6. **Testing Deployment**
   - Submit a test nomination using a second Athena account.
   - Verify the row appears in the `Nominations` tab with status `Submitted`.
   - Verify that the second account can submit via the web app but cannot view or open the Google Sheet directly.
