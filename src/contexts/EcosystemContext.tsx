import { createContext, useContext, useState, type ReactNode } from 'react';

export type Treatment = 'Hybrid' | 'Manual' | 'Native';

interface EcosystemContextValue {
  installedIds: Set<string>;
  toggleInstall: (id: string) => void;
  isInstalled: (id: string) => boolean;
  treatment: Treatment;
  setTreatment: (t: Treatment) => void;
}

const EcosystemContext = createContext<EcosystemContextValue | null>(null);

export function EcosystemProvider({ children }: { children: ReactNode }) {
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set());
  const [treatment, setTreatment] = useState<Treatment>('Hybrid');

  function toggleInstall(id: string) {
    setInstalledIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function isInstalled(id: string) {
    return installedIds.has(id);
  }

  return (
    <EcosystemContext.Provider value={{ installedIds, toggleInstall, isInstalled, treatment, setTreatment }}>
      {children}
    </EcosystemContext.Provider>
  );
}

export function useEcosystem() {
  const ctx = useContext(EcosystemContext);
  if (!ctx) throw new Error('useEcosystem must be used within EcosystemProvider');
  return ctx;
}
