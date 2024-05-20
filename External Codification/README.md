# Google Sheets Codebook Manager

The **Google Sheets Codebook Manager** is a utility script developed using Google Apps Script to manage a codebook within Google Sheets. This script enables users to categorize and organize keywords under specific code categories, facilitating data coding and analysis workflows.

## Features

- **Code Responses**: Automatically code responses based on predefined categories and keywords.
- **Add Keywords to the Codebook**: Easily add new keywords to the codebook under selected code categories.
- **Interactive User Interface**: Utilizes Google Sheets UI to prompt users for inputs and selections.
- **Duplicate Keyword Checking**: Checks for duplicate keywords before adding them to the codebook.

## Installation

To use this script:

1. Open your Google Sheets document.
2. From the menu, go to `Extensions` > `Apps Script`.
3. Paste the script into the Apps Script editor.
4. Save the script and close the Apps Script editor.

## Usage

### Code Responses

1. Select the column containing responses in your Google Sheets document.
2. Go to `Custom Menu` > `Coding` > `Code Responses`.
3. Follow the prompts to specify the number of rows to process and view coded responses in the adjacent column.

### Add Keywords to Codebook

1. Go to `Custom Menu` > `Coding` > `Add Keywords to Codebook`.
2. Select the code category to add keywords under.
3. Enter keywords (comma-separated) to be added under the selected code category.

## Codebook Template

I have shared a template Excel file (`Codebook_Template.xlsx`) to be used as the codebook. You can copy this template and populate it with your code categories and keywords before using the Google Sheets Codebook Manager.

## Functionality Details

### Duplicate Keyword Checking

When adding new keywords to the codebook, the script automatically checks for duplicate keywords to ensure data integrity. If a keyword already exists under the selected code category, the script alerts the user and prevents duplicate entries.

## Customization

You can customize the script by modifying the following sections:

- **Codebook Data**: Update the Google Sheets ID and sheet name in the `loadCategories()` and `addKeywordsToCodebook()` functions to match your codebook location.
- **User Interface**: Modify UI messages and prompts as needed for your specific use case.

## Contributing

Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

