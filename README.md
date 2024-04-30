#Google Sheets Qualitative Analysis Script
This script is designed to perform qualitative analysis tasks on Google Sheets data. It allows you to code responses based on predefined categories and keywords, helping to automate the analysis of textual data.

##Features
- Coding Responses: Automatically assign codes to responses based on predefined categories and keywords.
- Easy Integration: Utilizes Google Apps Script, making it easy to run directly within Google Sheets.
- Customizable: Modify categories and keywords to suit your specific analysis needs.

##Usage
###Setup
1. Open your Google Sheets document containing the responses you want to analyze.
2. From the menu, go to Extensions > Apps Script.
3. Paste the script into the Apps Script editor and save the project.
4. Authorize the script to access your Google Sheets data.

###Running the Script
1. In your Google Sheets document, select the column containing the responses you want to analyze.
2. From the menu, go to Coding > Code Responses.
3. The script will analyze the selected column and output the coded responses in an adjacent column.

##Configuration
You can customize the script by modifying the categories and keywords defined in the script code. Each category corresponds to specific codes that will be assigned based on matching keywords.

###Categories Placeholders
OCI: Order & Checkout Issues
WS: Website Stability
PIC: Payment Issues & Check-Out
DI: Delivery Issues
PP: Packaging Problems
DP: Discounts & Promotions
SPI: Size & Product Information
FS: Filtering & Sorting
PS: Product Selection
LAP: Login & Authentication
WNU: Website Navigation & User Experience
