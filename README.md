# 🧠 Google Sheets Qualitative Analysis Scripts

This tool automatically codes customer responses in Google Sheets.  

Whether the input is open-ended feedback, user interviews, or survey comments, it helps **transform messy free-text into structured categories** — directly inside Google Sheets.

It was initially developed to streamline the process of identifying recurring customer pain points. By automating the codification of qualitative data, the tool enables the easy identification of issues related to specific topics (e.g., payment errors, product sizing, delivery delays) without requiring manual tagging.

---

## 🎥 Demo: Instant Response Codification

![Codification Demo](assets/Codification%20Demo.gif)

---

## ✅ Use Case Examples

- Coding customer NPS verbatims into pain points like **delivery issues**, **payment errors**, or **product sizing**.
- Analysing UX research notes by tagging mentions of specific problems.
- Quickly transforming survey data into clean, analyzable labels for dashboards and reports.

---

## 🧩 What Can You Do With This?

You can choose between two coding methods, depending on how you want to manage your codebook:

### 1. **Embedded Codification** (Beginner-friendly)
- Store the list of categories and keywords directly inside the script.
- Great for small one-off projects or quick coding without external references.
- Easy to customise with a few lines of JavaScript.

### 2. **External Codification** (More flexible)
- Keep your codebook in a separate Google Sheet.
- Enables shared keyword lists across multiple surveys.
- Includes a UI prompt to add new keywords directly from the spreadsheet.

### 📚 Embedded vs. External: Managing Your Codebook

| Method | Supports Large Codebooks? | Can Add Keywords via UI? | Recommended For |
|--------|---------------------------|---------------------------|-----------------|
| **Embedded Codification** | ❌ No (limited by Google Apps Script size limits) | ❌ No | Quick, small-scale coding tasks |
| **External Codification** | ✅ Yes (scales to thousands of keywords) | ✅ Yes (via in-sheet prompts) | Long-term projects, evolving surveys, team workflows |

For larger or growing projects, the **External Codification** method is strongly recommended, as it allows ongoing keyword expansion without hitting script size limits or editing the code.

---

🔧 **No external tools required. Just copy the script into your Google Sheet and start coding.**

---

## 📌 Tip for Codification Accuracy & Codebook Strategy

To get the most value out of this tool, the quality and size of your **codebook** are key to successful automated tagging.

In practice: A codebook with **~2,500 carefully chosen keywords across 10 category codes** can reach around **40% codification coverage** when using the **External Codification** method.

> 🧠 *"Codification coverage" refers to the percentage of responses that are automatically assigned a meaningful category.*

---

### 🏁 What’s Needed for ~100% Codification Coverage

While it's possible to reach 100% *coverage* (i.e., every response gets tagged), doing so requires:

- A highly detailed codebook with **7,000–10,000 keywords/phrases**, including:
  - Synonyms and variations
  - Common typos
  - Slang and region-specific language
- Well-defined, non-overlapping category labels
- A fallback category like `OTHER` for edge cases
- Optional: basic preprocessing like lowercasing or punctuation removal

> ⚠️ Keep in mind that **100% tagging doesn’t equal 100% accuracy**. This tool uses **rule-based keyword matching** — not AI or NLP — so the quality of your keyword set directly impacts performance. However 

---

## 📈 Future Scaling Ideas

This tool is designed to be simple and effective, but there is ample room for future improvements as needs evolve.

Potential enhancements include:

- **AI-assisted codification**: Using models like OpenAI or Claude to suggest categories based on context, not just keywords.
- **External keyword libraries**: Importing pre-built vocabularies to enrich the codebook more quickly.
- **Auto-suggestion for codebook expansion**: Highlighting uncoded responses and recommending new keywords.
- **Preprocessing and smarter matching**: Adding text cleaning, synonym handling, or fuzzy matching for better accuracy.

> While these features are not part of the current version, they’re all feasible extensions if deeper automation or smarter codification is required.
