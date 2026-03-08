import { useEffect, useState } from 'react';
import { GITHUB_STARS_CACHE_TTL, GITHUB_API_TIMEOUT, GITHUB_REPO } from '../constants';

const CACHE_KEY = 'github_stars_cache';

export function useGitHubStars() {
  const [stars, setStars] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { stars: cachedStars, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < GITHUB_STARS_CACHE_TTL) {
          queueMicrotask(() => setStars(cachedStars));
          return;
        }
      } catch (e) {
        console.error('[GitHub Stars] Cache parse error:', e);
      }
    }

    // Fetch from API
    queueMicrotask(() => setLoading(true));
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GITHUB_API_TIMEOUT);

    fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
      .then((r) => {
        if (r.status === 403) {
          throw new Error('GitHub API rate limited');
        }
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data.stargazers_count) {
          const cacheData = {
            stars: data.stargazers_count,
            timestamp: Date.now()
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
          setStars(data.stargazers_count);
          setError(null);
        }
      })
      .catch((err) => {
        console.error('[GitHub Stars]', err.message);
        setError(err.message);
      })
      .finally(() => {
        clearTimeout(timeoutId);
        setLoading(false);
      });

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  return { stars, error, loading };
}
