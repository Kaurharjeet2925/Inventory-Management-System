'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import { apiClient } from '@/utils/apiClient';
import { toast } from 'react-toastify';

interface LoginProps {
  onSwitch: () => void;
}

export default function Login({ onSwitch }: LoginProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string): string | undefined => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Enter a valid email address';
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const data = await apiClient.login(email, password);
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success(`Login successful! Welcome ${data.user.name}`);
        setEmail('');
        setPassword('');
        setTimeout(() => router.push('/Dashboard'), 600);
      } else {
        toast.error(data?.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Login failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 mx-auto" style={{ width: '100%', maxWidth: '360px', padding: '16px' }}>
        <Card.Body>
          <h3 className="text-center mb-3" style={{ fontSize: '20px', fontWeight: 700 }}>Login</h3>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Form.Label style={{ fontSize: '13px', fontWeight: 600 }}>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-envelope"></i></InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                  disabled={loading}
                  style={{ fontSize: '14px' }}
                />
              </InputGroup>
              {errors.email && (
                <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </div>

            <div className="mb-3">
              <Form.Label style={{ fontSize: '13px', fontWeight: 600 }}>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-lock"></i></InputGroup.Text>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  disabled={loading}
                  style={{ fontSize: '14px' }}
                />
                <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                  <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                </InputGroup.Text>
              </InputGroup>
              {errors.password && (
                <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </div>

            <Button type="submit" className="w-100 mb-3" disabled={loading} style={{ fontSize: '14px', padding: '8px 12px' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <div className="text-center">
              <p style={{ fontSize: 13 }}>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitch}
                  className="btn btn-link p-0"
                  style={{ textDecoration: 'none', fontSize: 13 }}
                >
                  Sign Up
                </button>
              </p>
            </div>
            
          </Form>
        </Card.Body>
      </Card>
  );
}
