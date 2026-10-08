/**
 * Programmatically generates a Google Form to collect employee preferences
 * for team birthdays and anniversaries, links it to a dedicated Google Sheet,
 * and routes all form submissions into a tab explicitly named "Raw data".
 */
function createPreferenceForm() {
  // 1. Form Setup
  const form = FormApp.create('Team Preferences & Favorites');
  form.setDescription('Help us celebrate your milestones! Please share your favorite things so we can personalize birthday and work anniversary cards.');

  // 2. Form Fields to Include
  // Full Name (Short Answer, Required)
  form.addTextItem()
    .setTitle('Full Name')
    .setRequired(true);

  // Birth Date (Month & Day - Short Answer, Required)
  form.addTextItem()
    .setTitle('Birth Date (Month & Day)')
    .setHelpText('e.g., October 15 or 10/15 (no year required)')
    .setRequired(true);

  // Work Anniversary Date (Date)
  form.addDateItem()
    .setTitle('Work Anniversary Date')
    .setHelpText('Select your start date or work anniversary date');

  // Favorite Snacks & Sweets (Paragraph)
  form.addParagraphTextItem()
    .setTitle('Favorite Snacks & Sweets');

  // Favorite Beverages (Coffee/Tea orders, favorite drinks) (Short Answer)
  form.addTextItem()
    .setTitle('Favorite Beverages (Coffee/Tea orders, favorite drinks)');

  // Go-To Restaurants or Coffee Shops (Short Answer)
  form.addTextItem()
    .setTitle('Go-To Restaurants or Coffee Shops');

  // Hobbies & Personal Interests (Paragraph)
  form.addParagraphTextItem()
    .setTitle('Hobbies & Personal Interests');

  // Preferred Gift Card Brands (e.g., Amazon, Starbucks, Target) (Short Answer)
  form.addTextItem()
    .setTitle('Preferred Gift Card Brands (e.g., Amazon, Starbucks, Target)');

  // Dietary Restrictions or Allergies (Short Answer)
  form.addTextItem()
    .setTitle('Dietary Restrictions or Allergies');

  // Dislikes / Things to Avoid (Short Answer)
  form.addTextItem()
    .setTitle('Dislikes / Things to Avoid');

  // 3. Sheet & Destination Configuration
  const ss = SpreadsheetApp.create('Team Preferences & Favorites (Responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // Pause briefly to ensure Google Apps Script finishes linking destination sheet
  Utilities.sleep(1000);

  // Open destination spreadsheet and rename response sheet/tab to "Raw data"
  const refreshedSs = SpreadsheetApp.openById(ss.getId());
  const sheets = refreshedSs.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    const sheetName = sheets[i].getName();
    if (sheetName.startsWith('Form Responses') || sheets.length === 1) {
      sheets[i].setName('Raw data');
      break;
    }
  }

  Logger.log('Form Published URL: ' + form.getPublishedUrl());
  Logger.log('Form Edit URL: ' + form.getEditUrl());
  Logger.log('Spreadsheet URL: ' + refreshedSs.getUrl());

  return {
    formId: form.getId(),
    formUrl: form.getPublishedUrl(),
    spreadsheetId: refreshedSs.getId(),
    spreadsheetUrl: refreshedSs.getUrl()
  };
}

/**
 * Trigger handler for form submissions (optional additional processing).
 */
function onFormSubmit(e) {
  Logger.log('Form submission received: ' + JSON.stringify(e));
}

if (typeof module !== 'undefined') {
  module.exports = {
    createPreferenceForm,
    onFormSubmit
  };
}
