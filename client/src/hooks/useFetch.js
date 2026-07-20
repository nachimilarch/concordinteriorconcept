import { useState, useEffect } from "react";
import api from "../api/axios";

export function useFetch(endpoint, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramKey = JSON.stringify(params);

  useEffect(() => {
    if (!endpoint) { setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    setError(null);
    api.get(endpoint, { params })
      .then(r => { if (!cancelled) setData(r.data); })
      .catch(e => { if (!cancelled) setError(e.message || "Request failed"); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, paramKey]);

  return { data, loading, error };
}
