import './App.css'
import { useMemo, useState } from 'react'
import { loadDeveloperProfiles, type DeveloperProfile } from './lib/developers'

const { profiles: allProfiles, errors: loadErrors } = loadDeveloperProfiles()

function ProfileCard({ profile }: { profile: DeveloperProfile }) {
  const { name, role, country, skills, github, linkedin, portfolio } = profile

  return (
    <article className="card">
      <div className="cardHeader">
        <div>
          <h3 className="name">{name}</h3>
          <p className="meta">
            {role} · {country}
          </p>
        </div>
        <div className="links">
          {github ? (
            <a href={github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          {linkedin ? (
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
          {portfolio ? (
            <a href={portfolio} target="_blank" rel="noreferrer">
              Portfolio
            </a>
          ) : null}
        </div>
      </div>

      <div className="tags">
        {skills.slice(0, 12).map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
    </article>
  )
}

function App() {
  const [query, setQuery] = useState('')

  const profiles = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allProfiles

    return allProfiles.filter((p) => {
      const haystack = [
        p.name,
        p.role,
        p.country,
        ...p.skills,
        p.github ?? '',
        p.linkedin ?? '',
        p.portfolio ?? '',
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Engineers Hub</h1>
          <p className="subtitle">
            A global, open-source directory of developers and tech creators.
          </p>
        </div>

        <div className="controls">
          <div className="search" role="search">
            <svg
              className="searchIcon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path
                d="M10.5 3a7.5 7.5 0 1 0 4.55 13.47l4.49 4.48a1 1 0 0 0 1.42-1.42l-4.48-4.49A7.5 7.5 0 0 0 10.5 3Zm-5.5 7.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"
                fill="currentColor"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setQuery('')
              }}
              placeholder="Search by name, role, skill, country…"
              aria-label="Search developer profiles"
            />
            {query.trim().length > 0 ? (
              <button
                type="button"
                className="clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <span aria-hidden="true">×</span>
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {loadErrors.length > 0 ? (
        <details className="errors">
          <summary>{loadErrors.length} profile file(s) skipped (failed validation)</summary>
          <ul>
            {loadErrors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </details>
      ) : null}

      <main className="grid" aria-label="Developer profiles">
        {profiles.map((p) => (
          <ProfileCard
            key={`${p.name}-${p.github ?? p.linkedin ?? p.portfolio ?? p.country}`}
            profile={p}
          />
        ))}
      </main>
    </div>
  )
}

export default App
