import { useEffect, useState } from "react";
import { client, DB_ID, ALERTS_COLLECTION } from "../lib/appwrite";

export default function useRealtime() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${DB_ID}.collections.${ALERTS_COLLECTION}.documents`,
      (response) => {
        if (response.events.some((e) => e.includes(".create"))) {
          setAlerts((prev) => [response.payload, ...prev]);
        }
      }
    );

    return () => {
      try {
        unsubscribe();
      } catch {}
    };
  }, []);

  return alerts;
}