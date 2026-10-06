const SPREADSHEET_ID = '1xTvjpWEDbCO121xt9NSmIXbdzCY2STPCvZJAwjYdh48';
const SHEET_NAME = 'Nominations';
const STATUS_OPTIONS = ['Submitted', 'Hub VP approved', 'Declined'];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Leadership Accelerator Nominations')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function setupSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    const sheets = ss.getSheets();
    sheet = sheets[0];
    sheet.setName(SHEET_NAME);
  }

  const headers = [
    'Nomination ID',
    'Submitted at',
    'Status',
    'Nominee name',
    'Nominee email',
    'Nominee current role',
    'Nominee hub or team',
    'Time in role (months)',
    'Current scope',
    'Readiness',
    'Performance evidence',
    'Business judgment',
    'Leadership range',
    'Nominator email',
    'Nominator role',
    'Nominator hub',
    'Discussed with nominee',
    'Protects 4 hrs/month',
    'Acknowledged no OD guarantee',
    'Hub VP reviewer',
    'Review notes'
  ];

  // Set headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#062812');
  headerRange.setFontColor('#FAF8F3');
  headerRange.setFontWeight('bold');
  headerRange.setFontFamily('Helvetica Neue');
  headerRange.setFontSize(10);
  headerRange.setVerticalAlignment('middle');
  sheet.setRowHeight(1, 36);
  headerRange.setWrap(true);

  // Freeze row 1 and cols A-C
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(3);

  // Default body formatting
  const bodyRange = sheet.getRange(2, 1, 999, headers.length);
  bodyRange.setFontFamily('Arial');
  bodyRange.setFontSize(10);
  bodyRange.setFontColor('#062812');

  // Wrap setting for long text columns: I (9), K (11), L (12), M (13), U (21)
  const wrapCols = [9, 11, 12, 13, 21];
  for (let c = 1; c <= headers.length; c++) {
    const colRange = sheet.getRange(2, c, 999, 1);
    if (wrapCols.includes(c)) {
      colRange.setWrap(true);
      sheet.setColumnWidth(c, 320);
    } else {
      colRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
      sheet.setColumnWidth(c, 160);
    }
  }

  // Format Submitted at column (Col B)
  sheet.getRange(2, 2, 999, 1).setNumberFormat('yyyy-mm-dd hh:mm');

  // Banding
  const fullRange = sheet.getRange(1, 1, 1000, headers.length);
  const bandings = fullRange.getBandings();
  bandings.forEach(b => b.remove());
  const banding = fullRange.applyRowBanding(SpreadsheetApp.BandingTheme.NONE);
  banding.setHeaderRowColor('#062812');
  banding.setFirstRowColor('#FFFFFF');
  banding.setSecondRowColor('#FAF8F3');

  // Status Data Validation
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_OPTIONS, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 3, 999, 1).setDataValidation(statusRule);

  // Status Conditional Formatting
  const approvedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Hub VP approved')
    .setBackground('#E3EDE5')
    .setFontColor('#3E6B4A')
    .setRanges([sheet.getRange(2, 3, 999, 1)])
    .build();

  const declinedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Declined')
    .setBackground('#F5E1DD')
    .setFontColor('#A33A2B')
    .setRanges([sheet.getRange(2, 3, 999, 1)])
    .build();

  const submittedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Submitted')
    .setBackground('#F5EEDF')
    .setFontColor('#AB8854')
    .setRanges([sheet.getRange(2, 3, 999, 1)])
    .build();

  sheet.setConditionalFormatRules([approvedRule, declinedRule, submittedRule]);

  // Checkboxes for Q, R, S (cols 17, 18, 19)
  sheet.getRange(2, 17, 999, 3).insertCheckboxes();

  // Filter on header row
  if (sheet.getFilter()) {
    sheet.getFilter().remove();
  }
  fullRange.createFilter();
}

function sanitizeValue(val, maxLen) {
  if (val === null || val === undefined) return '';
  if (typeof val === 'boolean' || typeof val === 'number') return val;
  let str = String(val).trim();
  if (maxLen && str.length > maxLen) {
    str = str.substring(0, maxLen);
  }
  if (/^[=+\-@]/.test(str)) {
    str = "'" + str;
  }
  return str;
}

function validateForm(form) {
  const missing = [];
  if (!form.nomRole) missing.push('your role');
  if (!form.nomHub) missing.push('your hub');
  if (!form.neName) missing.push('nominee name');
  if (!form.neEmail) {
    missing.push('nominee email');
  } else {
    const emailStr = String(form.neEmail).trim();
    if (!/^\S+@\S+\.\S+$/.test(emailStr)) {
      missing.push('a valid nominee email');
    }
  }
  if (!form.neRole) missing.push('current role');
  if (!form.neHub) missing.push('hub or team');
  if (!form.evPerf) missing.push('performance evidence');
  if (!form.evJudgment) missing.push('business judgment');
  if (!form.ready) missing.push('readiness');
  if (!form.ackTime) missing.push('the time commitment');
  if (!form.ackNoPromise) missing.push('the no-guarantee acknowledgment');

  if (missing.length > 0) {
    let formattedList = '';
    if (missing.length === 1) {
      formattedList = missing[0];
    } else if (missing.length === 2) {
      formattedList = missing[0] + ' and ' + missing[1];
    } else {
      formattedList = missing.slice(0, -1).join(', ') + ', and ' + missing[missing.length - 1];
    }
    throw new Error('Add ' + formattedList + ' before submitting.');
  }
}

function generateNominationId() {
  const dateStr = Utilities.formatDate(new Date(), 'America/Denver', 'yyyyMMdd');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return 'ALA-' + dateStr + '-' + rand;
}

function submitNomination(form) {
  const nominatorEmail = Session.getActiveUser().getEmail();
  if (!nominatorEmail) {
    throw new Error('Sign in with your Athena Google account to submit.');
  }

  validateForm(form);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    const nomId = generateNominationId();
    const now = new Date();

    const nomineeName = sanitizeValue(form.neName, 5000);
    const nomineeEmail = sanitizeValue(String(form.neEmail).toLowerCase(), 5000);
    const nomineeRole = sanitizeValue(form.neRole, 5000);
    const nomineeHub = sanitizeValue(form.neHub, 5000);
    const tenure = form.neTenure !== '' && form.neTenure !== null && form.neTenure !== undefined ? Number(form.neTenure) : '';
    const scope = sanitizeValue(form.neScope, 5000);
    const readiness = sanitizeValue(form.ready, 5000);
    const evPerf = sanitizeValue(form.evPerf, 5000);
    const evJudgment = sanitizeValue(form.evJudgment, 5000);
    const evRange = sanitizeValue(form.evRange, 5000);
    const nomRole = sanitizeValue(form.nomRole, 5000);
    const nomHub = sanitizeValue(form.nomHub, 5000);
    const ackDiscussed = Boolean(form.ackDiscussed);

    const row = [
      nomId,
      now,
      'Submitted',
      nomineeName,
      nomineeEmail,
      nomineeRole,
      nomineeHub,
      tenure,
      scope,
      readiness,
      evPerf,
      evJudgment,
      evRange,
      nominatorEmail,
      nomRole,
      nomHub,
      ackDiscussed,
      true,
      true,
      '',
      ''
    ];

    sheet.appendRow(row);

    return {
      id: nomId,
      nomineeName: nomineeName,
      nominatorHub: nomHub
    };
  } finally {
    lock.releaseLock();
  }
}

function getMyNominations() {
  const activeEmail = Session.getActiveUser().getEmail();
  if (!activeEmail) {
    return [];
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return [];
  }

  const results = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const nominatorEmail = String(row[13] || '').trim();
    if (nominatorEmail.toLowerCase() === activeEmail.trim().toLowerCase()) {
      let submittedAtStr = '';
      if (row[1] instanceof Date) {
        submittedAtStr = Utilities.formatDate(row[1], 'America/Denver', 'yyyy-MM-dd HH:mm');
      } else {
        submittedAtStr = String(row[1] || '');
      }
      results.push({
        nomineeName: row[3],
        nomineeRole: row[5],
        status: row[2],
        submittedAt: submittedAtStr
      });
    }
  }

  return results.reverse();
}

if (typeof module !== 'undefined') {
  module.exports = {
    SPREADSHEET_ID,
    SHEET_NAME,
    STATUS_OPTIONS,
    sanitizeValue,
    validateForm,
    generateNominationId
  };
}
