function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Coding')
      .addItem('Code Responses', 'codeResponses')
      .addToUi();
}

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
  
  var dataRange = sheet.getDataRange();
  var dataValues = dataRange.getValues();
  var numRows = dataValues.length;
  
  var outputData = [];
  
  // Iterate through each row and code the response
  for (var i = 0; i < numRows; i++) {
    var response = dataValues[i][startColumn - 1]; // Get response from the selected column
    var codes = codeResponse(response); // Get codes based on response
    outputData.push([codes.join(', ')]); // Push codes (joined as string) to the output data
  }
  
  // Resize the output range to match the dimensions of the outputData array
  var outputRange = range.offset(0, 1, outputData.length); // Offset to the adjacent column
  
  // Set the output data into the selected column
  outputRange.setValues(outputData);
  
  SpreadsheetApp.getUi().alert('Responses coded successfully in the adjacent column.');
}

function codeResponse(response) {
  response = String(response || '').toLowerCase();


  // Define your qualitative analysis keywords and corresponding codes
  var categories = [
    // Order & Checkout Issues (OCI)
    {
      keywords: [
        'shopping cart crashed',
        'cart crashed',
        'cart confusion',
        'confusing checkout process',
      ],
      code: 'OCI'
    },
    // Website Stability (WS)
    {
      keywords: [
        'unstable website',
        'site crashes',
        'web page issues',
        'Too often the system crashes',
      ],
      code: 'WS'
    },
    // Payment Issues & Check-Out (PIC)
    {
      keywords: [
        'payment problem',
        'payment error',
        'payment failure',
      ],
      code: 'PIC'
    },
    // Delivery Issues (DI)
    {
      keywords: [
        'slow delivery',
        'late delivery',
        'delayed delivery',
      ],
      code: 'DI'
    },
    // Packaging Problems (PP)
    {
      keywords: [
        'poor packaging',
        'inadequate packaging',
      ],
      code: 'PP'
    },
    // Discounts & Promotions (DP)
    {
      keywords: [
        'discount not applied',
        'discounts would be appreciated',
      ],
      code: 'DP'
    },
    // Size & Product Information (SPI)
    {
      keywords: [
        'size chart not available',
        'missing size chart',
        'no size guide',
      ],
      code: 'SPI'
    },
    // Filtering & Sorting (FS)
    {
      keywords: [
        'filter not working',
        'search filters fail',
        'incorrect filters',
      ],
      code: 'FS'
    },
    // Product Selection (PS)
    {
      keywords: [
        'men\'s clothes could be larger'
      ],
      code: 'PS'
    },
    // Login & Authentication (LAP)
    {
      keywords: [
        'can\'t log into my account',
        'cannot log into my account',
      ],
      code: 'LAP'
    },
    // Website Navigation & User Experience (WNU)
    {
      keywords: [
        'rewind to the beginning',
        'return to start of product page',
      ],
      code: 'WNU'
    }

  ];

  var codes = [];

  categories.forEach(function(category) {
    var matched = category.keywords.some(function(keyword) {
      var regex = new RegExp('\\b' + escapeRegExp(keyword.toLowerCase()) + '\\b', 'gi');
      return response.match(regex);
    });

    if (matched) {
      codes.push(category.code);
    }
  });

  if (codes.length === 0) {
    codes.push('');
  }

  return codes;
}

// Function to escape special characters in regex pattern
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
