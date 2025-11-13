'use client';

import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Login from './components/Login';
import Register from './components/Register';

export default function UserFormPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Row className="w-100 m-0" style={{ minHeight: '100vh' }}>
        {/* LEFT SIDE */}
        <Col
          md={6}
          className="d-none d-md-flex"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="text-center text-white p-3" style={{ maxWidth: 420 }}>
            <div style={{ fontSize: '48px', lineHeight: 1 }}>
              <i className="bi bi-box"></i>
            </div>
            <h1 style={{ fontSize: '40px', fontWeight: 700, margin: '8px 0' }}>IMS</h1>

            <p style={{ fontSize: '16px', marginBottom: 0 }}>
              Unlock and manage your <b>inventory’s</b> full potential.
            </p>
          </div>
        </Col>

        {/* RIGHT SIDE */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
          style={{ background: '#fff' }}
        >
          <div style={{ width: '100%', maxWidth: '360px', margin: '20px auto' }}>
            {isRegister ? (
              <Register onSuccess={() => setIsRegister(false)} onSwitch={() => setIsRegister(false)} />
            ) : (
              <Login onSwitch={() => setIsRegister(true)} />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
