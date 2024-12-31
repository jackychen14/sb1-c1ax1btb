import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { CreditsBanner } from './CreditsBanner';
import { LanguageSelector } from './LanguageSelector';
import { AuthError } from '../../services/auth/errors';

export function AuthForm() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.email.trim() || !formData.password.trim()) {
        throw new AuthError('Please fill in all required fields');
      }

      if (!isLogin && !formData.name.trim()) {
        throw new AuthError('Name is required for sign up');
      }

      if (formData.password.length < 6) {
        throw new AuthError('Password must be at least 6 characters long');
      }

      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await signUp(formData);
      }
    } catch (error) {
      setError(error instanceof AuthError ? error.message : 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same
  // ...
}