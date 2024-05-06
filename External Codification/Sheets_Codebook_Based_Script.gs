// Function to load and parse categories from the Codebook sheet
function loadCategories() {
  var spreadsheetId = '[Replace with your spreadsheet ID located inside the URL]';
  var sheetName = 'Codebook';
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error('Sheet not found. Check the sheet name and ID.');
  }

  var dataRange = sheet.getDataRange();
  var dataValues = dataRange.getValues();
  var categories = {};

  for (var i = 1; i < dataValues.length; i++) {
    var row = dataValues[i];
    var code = row[0];
    var keyword = row[1];

    if (!categories[code]) {
      categories[code] = [];
    }
    
    categories[code].push(keyword);
  }

  return categories;
}

// Function to code responses based on loaded categories
function codeResponse(response, categories) {
  if (!response) {
    return ''; // Default code for empty response
  }

  var matchedCode = '';

  Object.keys(categories).some(function(code) {
    var matched = categories[code].some(function(keyword) {
      var regex = new RegExp('\\b' + escapeRegExp(keyword) + '\\b', 'gi');
      return response.match(regex);
    });

    if (matched) {
      matchedCode = code;
      return true; // Stop iterating after the first match
    }

    return false;
  });

  return matchedCode;
}


// Function to handle coding responses
function codeResponses() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getActiveRange();
  
  if (!range) {
    SpreadsheetApp.getUi().alert('Please select a column to code responses.');
    return;
  }

  var startColumn = range.getColumn();

  if (startColumn <= 1) {
    SpreadsheetApp.getUi().alert('Please select a valid column to code responses.');
    return;
  }

  var numRows = sheet.getLastRow(); // Get the total number of rows in the sheet

  // Prompt the user for the number of rows to process
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Number of Rows to Process', 'Enter the number of rows to check for responses (up to ' + numRows + ' rows):', ui.ButtonSet.OK_CANCEL);

  // Check user input
  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  var numToProcessText = response.getResponseText().trim();
  var numToProcess = parseInt(numToProcessText);

  if (isNaN(numToProcess) || numToProcess <= 0 || numToProcess > numRows) {
    ui.alert('Invalid input. Please enter a valid number of rows.');
    return;
  }

  var categories = loadCategories(); // Load categories from the Codebook sheet

  var outputData = [];

  for (var i = 0; i < numToProcess; i++) {
    var responseValue = sheet.getRange(i + 1, startColumn).getValue(); // Get response from the specified column
    var codes = codeResponse(responseValue, categories);

    // Ensure codes is always an array
    if (!Array.isArray(codes)) {
      codes = [codes]; // Wrap in array if it's not already
    }

    outputData.push([codes.join(',')]); // Join codes with comma and push to outputData
  }

  var outputRange = range.offset(0, 1, outputData.length, 1);
  outputRange.setValues(outputData);

  SpreadsheetApp.getUi().alert('Responses coded successfully in the adjacent column.');
}


// Function to escape special characters in a regex pattern
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Function to add keywords to the Codebook under a selected code category
function addKeywordsToCodebook() {
  var spreadsheetId = '[Replace with your spreadsheet ID located inside the URL]'; //
  var sheetName = 'Codebook';
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('Codebook sheet not found. Please check the sheet name and ID.');
    return;
  }

  // Get all existing codes and their abbreviations from the Codebook
  var dataRange = sheet.getRange('D2:E');
  var dataValues = dataRange.getValues();
  
  var codeMap = {};
  dataValues.forEach(function(row) {
    var codeName = row[0];
    var codeAbbreviation = row[1];
    codeMap[codeAbbreviation] = codeName;
  });

  // Prompt the user to select a code category
  var ui = SpreadsheetApp.getUi();
  var codeAbbreviations = Object.keys(codeMap);

  // Create a message to display all available code categories
  var categoriesMessage = 'Current Code Categories:\n\n';
  codeAbbreviations.forEach(function(abbreviation) {
    categoriesMessage += abbreviation + ' - ' + codeMap[abbreviation] + '\n';
  });

  // Show a dropdown menu with all available code abbreviations for selection
  var selectedCode = ui.prompt('Select Code Category', categoriesMessage + '\n\nChoose a code category to add keywords under:', ui.ButtonSet.OK_CANCEL);
  
  if (selectedCode.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  var chosenCodeAbbreviation = selectedCode.getResponseText().trim();
  
  if (!codeMap[chosenCodeAbbreviation]) {
    ui.alert('Invalid code category selected. Please choose a valid code category.');
    return;
  }

  var chosenCodeName = codeMap[chosenCodeAbbreviation]; // Retrieve the full name of the selected code

  // Prompt the user to enter keywords to add
  var keywordsInput = ui.prompt('Add Keywords', 'Enter keywords to add under code ' + chosenCodeName + ' (' + chosenCodeAbbreviation + ') (comma-separated):', ui.ButtonSet.OK_CANCEL);

  if (keywordsInput.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  var newKeywordsText = keywordsInput.getResponseText().trim();

  if (!newKeywordsText) {
    ui.alert('No keywords entered. Please try again.');
    return;
  }

  var newKeywords = newKeywordsText.split(',').map(function(keyword) {
    return keyword.trim().toLowerCase(); // Convert keywords to lowercase for case-insensitive comparison
  });

  // Get all existing keywords from the Codebook
  var existingKeywords = getAllKeywords(sheet);

  // Check for duplicate keywords
  var duplicateKeywords = [];
  newKeywords.forEach(function(keyword) {
    if (existingKeywords[keyword]) {
      existingKeywords[keyword].forEach(function(code) {
        duplicateKeywords.push({ keyword: keyword, code: code });
      });
    }
  });

  if (duplicateKeywords.length > 0) {
    // Display message showing duplicate keywords and where they are already used
    var message = 'The following keywords are already used in the Codebook:\n\n';
    duplicateKeywords.forEach(function(item) {
      message += item.keyword + ' (under code ' + item.code + ')\n';
    });
    ui.alert(message);
    return;
  }

  // Add new keywords to the Codebook under the selected code category
  var lastRow = sheet.getLastRow() + 1;
  newKeywords.forEach(function(keyword) {
    sheet.getRange(lastRow, 1).setValue(chosenCodeAbbreviation);
    sheet.getRange(lastRow, 2).setValue(keyword);
    lastRow++;
  });

  ui.alert('Keywords added successfully under code ' + chosenCodeName + ' (' + chosenCodeAbbreviation + ').');
}



// Helper function to retrieve all keywords and their corresponding codes from the Codebook
function getAllKeywords(sheet) {
  var keywordsMap = {};
  var dataRange = sheet.getDataRange();
  var dataValues = dataRange.getValues();

  for (var i = 1; i < dataValues.length; i++) {
    var code = dataValues[i][0];
    var keyword = dataValues[i][1].toLowerCase(); // Convert keyword to lowercase for case-insensitive comparison

    if (!keywordsMap[keyword]) {
      keywordsMap[keyword] = [];
    }
    
    if (!keywordsMap[keyword].includes(code)) {
      keywordsMap[keyword].push(code);
    }
  }

  return keywordsMap;
}

// Create a custom menu to run the 'codeResponses' and 'addKeywordsToCodebook' functions
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Coding')
    .addItem('Code Responses', 'codeResponses')
    .addItem('Add Keywords to Codebook', 'addKeywordsToCodebook')
    .addToUi();
}
