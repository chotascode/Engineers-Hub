# Contributing to Engineers Hub

Thanks for contributing! The main way to help is to add your developer profile.

## Add your profile

- Create a new file in `developers/`:
  - `developers/yourname.json`
- Use this schema:

```json
{
  "name": "Your Name",
  "role": "Full Stack Developer",
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "portfolio": "https://yourwebsite.com",
  "skills": ["JavaScript", "React", "Node.js", "Docker"],
  "country": "Your Country"
}
```

## Rules

- Only add **one** new profile file per PR.
- Do **not** modify other developer profiles.
- Keep JSON valid and formatted.
- Ensure links are valid URLs.
- Keep `skills` to a reasonable list (recommended: 4–12).

## Local verification

```bash
npm install
npm run dev
```

If your profile JSON is invalid, the app will skip it and list the reason on the page.

