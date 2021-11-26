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

1. Setup `.env` file to contain
   ```bash
   REACT_APP_FIREBASE_API_KEY=...
   REACT_APP_FIREBASE_AUTH_DOMAIN=...
   REACT_APP_FIREBASE_DATABASE_URL=...
   REACT_APP_FIREBASE_PROJECT_ID=...
   REACT_APP_FIREBASE_STORAGE_BUCKET=...
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
   REACT_APP_FIREBASE_APP_ID=...
   REACT_APP_FIREBASE_MEASUREMENT_ID=...
   ```
1. run `yarn && yarn start` to start the development server on `http://localhost:3000/`

<hr>

big cool project by [nwPlus](https://www.nwplus.io/)
