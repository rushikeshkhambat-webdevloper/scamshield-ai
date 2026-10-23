import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function AlertToast({ alert }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!alert) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <AnimatePresence>
      {visible && alert && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm rounded-xl border border-red-200 dark:border-red-900 bg-white dark:bg-neutral-900 p-4 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-red-100 dark:bg-red-950/50 p-2">
              <AlertTriangle size={16} className="text-red-700 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Family Guard alert
              </p>
              <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                {alert.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}