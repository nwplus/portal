# 🔴 Portal

Portal aims to be a central information hub for hackers which will contain important information about the hackathon

## 🖼️ big picture

We hope for Portal to

- relay important time sensitive information like announcements
- contain a schedule detailing the events happening during a hackathon which can be updated through a CMS
- provide a convenient way to access useful links and resources. e.g.
  - the slack/discord workspace
  - hacker package / slides / prize info
  - devpost
- be reusable across different hackathons

## 💯 epic features

- [x] Web notifications/announcements
- [x] Countdown
- [x] Event schedule
- [x] Live FAQ
- [x] Sponsor List
- [x] Judging
- [ ] Application Portal

## dev

0. Please use `node v18+`.
1. Setup `.env` file to contain
   ```bash
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_DATABASE_URL=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   VITE_FIREBASE_MEASUREMENT_ID=...
   ```
2. run `yarn && yarn dev` to start the development server on `http://localhost:3000/`

<hr>

big cool project by [nwPlus](https://www.nwplus.io/)
