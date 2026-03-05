# Emberhewn

A community for people navigating fertility treatment.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com), import the repo
3. Add the environment variable (see below)
4. Deploy
5. In Vercel dashboard → Settings → Domains → Add `emberhewn.com`

## Google Sheets Email Capture Setup

### Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Emberhewn Signups"
3. In Row 1, add headers: `timestamp` | `email` | `source`

### Step 2: Create the Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.email,
    data.source || "direct"
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy → New deployment**
4. Choose type: **Web app**
5. Set "Execute as" to **Me**
6. Set "Who has access" to **Anyone**
7. Click **Deploy** and authorize when prompted
8. Copy the Web App URL

### Step 3: Add the URL to Vercel

1. In your Vercel dashboard, go to **Settings → Environment Variables**
2. Add: `NEXT_PUBLIC_SHEET_URL` = your Web App URL from Step 2
3. Redeploy

### Step 4: Point your domain

Update your DNS at your domain registrar:
- If using Vercel's nameservers: follow Vercel's domain setup instructions
- If using external DNS: add a CNAME record pointing `emberhewn.com` to `cname.vercel-dns.com`

## Local Development

```bash
npm install
cp .env.example .env.local
# Add your Google Apps Script URL to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
