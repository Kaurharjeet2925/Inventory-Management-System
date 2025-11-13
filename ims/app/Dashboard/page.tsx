'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { apiClient } from '@/utils/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardData {
  message: string;
  user: User;
  stats: {
    totalProducts: number;
    lowStock: number;
    recentSales: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      return raw ? JSON.parse(raw) as User : null;
    } catch (err) {
      console.warn('Failed to parse user from localStorage', err);
      return null;
    }
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/UserForms');
          return;
        }

        const data = await apiClient.getDashboard(token);
        setDashboardData(data);
        // update user from response if available
        if (data?.user) setUser(data.user);
      } catch (err) {
        console.error('Failed to fetch dashboard:', err);
        router.push('/UserForms');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/UserForms');
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="text-muted" style={{ fontSize: 14 }}>Preparing your dashboard...</p>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="align-items-center mb-4">
        <Col>
          <h2 style={{ fontSize: 22, marginBottom: 2 }}>
            Welcome{user?.name || dashboardData?.user?.name ? `, ${user?.name || dashboardData?.user?.name}` : ''}
          </h2>
          {user?.email || dashboardData?.user?.email ? (
            <div className="text-muted mb-2" style={{ fontSize: 13 }}>{user?.email || dashboardData?.user?.email}</div>
          ) : null}
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

     

      <Row>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <h6>Total Products</h6>
              <h3 className="text-primary">{dashboardData?.stats.totalProducts}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <h6>Low Stock Items</h6>
              <h3 className="text-warning">{dashboardData?.stats.lowStock}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <h6>Recent Sales</h6>
              <h3 className="text-success">{dashboardData?.stats.recentSales}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}