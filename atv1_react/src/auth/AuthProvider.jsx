import { useState } from 'react';
import { AuthContext } from './AuthContext.js';

const demoCredentials = { username: 'admin', password: 'admin' };

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(username, password) {
    if (
      username !== demoCredentials.username ||
      password !== demoCredentials.password
    ) {
      return false;
    }

    setUser({ username });
    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
