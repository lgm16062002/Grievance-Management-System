import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'grievance-portal-auth';

const DEMO_USERS = {
  'student@gmail.com': {
    id: 'stu-001',
    name: 'Bruce Wayne',
    role: 'student',
    email: 'student@gmail.com',
    department: 'Computer Science & Engineering',
    program: 'B.Tech',
    year: '3rd Year',
    phone: '+91 98765 43210',
    rollNumber: 'CSE23041',
  },
  'hod@gmail.com': {
    id: 'hod-001',
    name: 'Barry Allen',
    role: 'hod',
    email: 'hod@gmail.com',
    department: 'Computer Science & Engineering',
    title: 'Head of Department',
  },
  'admin@gmail.com': {
    id: 'adm-001',
    name: 'Diana Prince',
    role: 'admin',
    email: 'admin@gmail.com',
    department: 'Student Affairs',
    title: 'Portal Administrator',
  },
};

const ROLE_REDIRECTS = {
  student: '/student/dashboard',
  hod: '/hod/dashboard',
  admin: '/admin/dashboard',
  faculty: '/student/dashboard',
};

const AuthContext = createContext(null);

const readStoredAuth = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const getDefaultRouteForRole = (role) => ROLE_REDIRECTS[role] || '/login';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAuth = readStoredAuth();
    if (storedAuth?.user) {
      setUser(storedAuth.user);
    }
  }, []);

  const login = (email, password) => {
    // For demo purposes, we only check the email and assume 'password' is the password
    if (password !== 'password') {
      throw new Error('Invalid password');
    }

    const nextUser = DEMO_USERS[email.toLowerCase()];

    if (!nextUser) {
      throw new Error(`User not found: ${email}`);
    }

    setUser(nextUser);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser }));
    }

    return nextUser;
  };

  const logout = () => {
    setUser(null);

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo(
    () => ({
      user,
      role: user?.role ?? null,
      isAuthenticated: Boolean(user),
      login,
      logout,
      getDefaultRouteForRole,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
