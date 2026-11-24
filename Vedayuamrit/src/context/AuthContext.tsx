'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserAddress {
  id: string;
  label: string; // e.g. 'Home' | 'Office'
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  doshaQuizResult?: string;
  addresses: UserAddress[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeAuthModal: () => void;
  login: (emailOrPhone: string) => boolean;
  register: (name: string, email: string, phone: string) => boolean;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'usr-101',
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98765 43210',
  doshaQuizResult: 'Pitta-Vata',
  addresses: [
    {
      id: 'addr-1',
      label: 'Home',
      fullName: 'Aarav Sharma',
      phone: '+91 98765 43210',
      addressLine: 'Flat 402, Lotus Residency, 12th Main Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Office',
      fullName: 'Aarav Sharma',
      phone: '+91 98765 43210',
      addressLine: 'Ayush Business Park, 5th Floor, Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      isDefault: false,
    },
  ],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('va_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default logged-in user for effortless demo experience
        setUser(DEMO_USER);
        localStorage.setItem('va_user', JSON.stringify(DEMO_USER));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (emailOrPhone: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Ayurvedic Seeker',
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@vedayu.in`,
      phone: emailOrPhone.includes('@') ? '+91 98765 43210' : emailOrPhone,
      addresses: DEMO_USER.addresses,
    };
    setUser(newUser);
    localStorage.setItem('va_user', JSON.stringify(newUser));
    closeAuthModal();
    return true;
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: name,
      email,
      phone,
      addresses: [],
    };
    setUser(newUser);
    localStorage.setItem('va_user', JSON.stringify(newUser));
    closeAuthModal();
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('va_user');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const nextUser = { ...user, ...updated };
    setUser(nextUser);
    localStorage.setItem('va_user', JSON.stringify(nextUser));
  };

  const addAddress = (newAddrData: Omit<UserAddress, 'id'>) => {
    if (!user) return;
    const newAddress: UserAddress = {
      ...newAddrData,
      id: `addr-${Date.now()}`,
    };
    const nextAddresses = newAddress.isDefault
      ? user.addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddress)
      : [...user.addresses, newAddress];
    updateProfile({ addresses: nextAddresses });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const nextAddresses = user.addresses.filter((a) => a.id !== id);
    updateProfile({ addresses: nextAddresses });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        openLoginModal,
        openRegisterModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

