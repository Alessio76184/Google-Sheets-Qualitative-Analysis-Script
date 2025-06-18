# 📄 Embedded Codification Script (Google Sheets)

Automatically tag open-text survey responses based on a list of keywords and predefined categories.  
This version of the script stores the codebook *directly in the code itself* (embedded).

---

## ⚡ What This Script Does

- Adds a custom menu called **"Coding"** to your Google Sheet.
- Lets you select a column of survey responses.
- Automatically tags each response using keyword matching.
- Writes the result (e.g., `WS`, `PIC`, etc.) in the adjacent column.

---

## 🛠️ How to Set It Up

### 1. Open your Google Sheet
Start with a Google Sheet that contains free-text responses. Place them in a single column (e.g., column B).

### 2. Open the Script Editor
Go to:

![Open Script Editor](assets/Step_1_App_Script.png)

---

### 3. Paste the Script  
Delete the default code and paste in the script from this repo (`embedded-codification.gs`).

![Paste the Script](assets/Step_2_Copy_Paste.png)

---

### 4. Save the Script  
Click the save icon 💾 or press `Ctrl + S` to save the script.

![Save the Script](assets/Step_3_Save_Script.png)

---

### 5. Reload Your Google Sheet  
Once saved, reload the tab. You’ll see a new menu item at the top of the sheet:

![Run the Script from the Menu](assets/Step_4_Code_Responses.png)

---

## 🧪 How to Use It

1. Highlight the column that contains the free-text responses (e.g., column B).
2. Click **Coding → Code Responses**
3. The script will:
   - Look for keywords inside each response
   - Tag the response using codes like `WS`, `PIC`, `DP`, etc.
   - Write the result in the next column (e.g., column C)
4. A popup will confirm when it’s done.

---

## 🧠 About the Codebook

This script uses an **embedded codebook**, defined inside the `codeResponse()` function as a list of categories and keywords.

Example:

```js
{
  code: 'PIC',
  keywords: ['payment error', 'payment failure', 'payment problem']
}
```

🔒 Since this is embedded inside the script, it’s not editable from the Sheet.
🧱 Google Apps Script has a size limit, so this method is best for small codebooks (under ~1,000 keywords).

If you need to manage a larger codebook or edit it without touching the code, try the External Codification version.

---

| Response                                           | Code |
|----------------------------------------------------|------|
| "My payment kept failing"                          | PIC  |
| "The website keeps crashing on mobile"             | WS   |
| "I wish the discount was applied at checkout"      | DP   |

---

## 🧩 Customising Categories
To add or change codes/keywords:

1. Open the Apps Script editor again.
2. Scroll to the categories array in the codeResponse() function.
3. Add a new object for your category or expand the keyword list.
4. Save changes and reload the Sheet.

---

## 💡 Tip
Use short, consistent category codes like:

WS = Website Stability

PIC = Payment Issue

DP = Discounts & Promotions

They’re easier to filter, analyze, and summarize later.

---

## 📌 Limitations
❌ Does not support linking to an external file or .xlsx — all keywords must be inside the script.

⛔ Limited by Google Apps Script storage size — not suitable for very large codebooks.

🔍 Keyword matching is exact — no fuzzy or semantic matching.
