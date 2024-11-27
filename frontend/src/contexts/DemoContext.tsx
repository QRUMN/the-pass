import React, { createContext, useContext, useState } from 'react';

interface DemoUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'educator' | 'school';
  avatar?: string;
  description: string;
}

interface DemoContextType {
  isDemoMode: boolean;
  setIsDemoMode: (mode: boolean) => void;
  demoUser: DemoUser | null;
  setDemoUser: (user: DemoUser | null) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const demoUsers: DemoUser[] = [
  {
    id: 'demo-admin',
    email: 'admin@thepass.com',
    firstName: 'Admin',
    lastName: 'Demo',
    role: 'admin',
    description: 'System administrator with full access to manage users, settings, and monitor platform activity.',
  },
  {
    id: 'demo-educator',
    email: 'educator@thepass.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'educator',
    description: 'Experienced math teacher with 5+ years of experience, seeking new opportunities.',
  },
  {
    id: 'demo-school',
    email: 'school@thepass.com',
    firstName: 'Lincoln',
    lastName: 'High School',
    role: 'school',
    description: 'Public high school looking for qualified educators to join our growing team.',
  },
];

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        setIsDemoMode,
        demoUser,
        setDemoUser,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};

export default DemoContext;
