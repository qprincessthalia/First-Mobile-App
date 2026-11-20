import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const SESSION_KEY = 'auth:user'; // the student who is logged in right now
const ACCOUNTS_KEY = 'auth:accounts'; // every account created on this phone

const AuthContext = createContext(null);

// Scrambles a password with a random salt, so the real password is never saved.
async function hashPassword(salt, password) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);
}

// Reads all accounts saved on this phone.
async function readAccounts() {
  const raw = await AsyncStorage.getItem(ACCOUNTS_KEY);
  return raw ? JSON.parse(raw) : {};
}

// Keeps track of who is logged in, and remembers them after the app closes.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { studentNumber, username } or null
  const [loading, setLoading] = useState(true); // true while the saved login is loaded

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(SESSION_KEY)
      .then((raw) => {
        if (active && raw) {
          setUser(JSON.parse(raw));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // Marks the student as logged in, and remembers it.
  const startSession = async (student) => {
    setUser(student);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(student));
  };

  // Creates a new account, then logs the student in.
  const register = async ({ studentNumber, username, password }) => {
    try {
      const id = studentNumber.trim().toLowerCase();
      const accounts = await readAccounts();

      if (accounts[id]) {
        return { ok: false, error: 'An account with this student number already exists. Please log in.' };
      }

      const salt = Crypto.randomUUID();
      accounts[id] = {
        username: username.trim(),
        salt,
        hash: await hashPassword(salt, password),
      };
      await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

      await startSession({ studentNumber: id, username: username.trim() });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Something went wrong. Please try again.' };
    }
  };

  // Checks the student number and password, then logs the student in.
  const login = async ({ studentNumber, password }) => {
    try {
      const id = studentNumber.trim().toLowerCase();
      const accounts = await readAccounts();
      const account = accounts[id];

      if (!account) {
        return { ok: false, error: 'No account found for this student number. Tap "Create account" below.' };
      }

      const hash = await hashPassword(account.salt, password);
      if (hash !== account.hash) {
        return { ok: false, error: 'Wrong password. Please try again.' };
      }

      await startSession({ studentNumber: id, username: account.username });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Something went wrong. Please try again.' };
    }
  };

  // Logs the student out. Their tasks stay saved for the next login.
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Use inside any screen: const { user, login, register, logout } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
}