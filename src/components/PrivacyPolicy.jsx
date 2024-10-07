import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


function PrivacyPolicy() {
  let navigate = useNavigate();
  return (
    <>
      <Card className="privacy-info">
        <Card.Body>
        <div className="text-center">
        <Button variant="outline-danger" className="mb-4" onClick={() => navigate('/subscribe')}>Subscribe to News Break</Button> {' '}
        </div>
        
          <Card.Text>
            It’s essential to note our commitment to transparency: <br />
            <br />
            Our Terms of Use acknowledge that our services may not always be
            error-free, and our Community Standards emphasize our discretion in
            enforcing policies. As a platform hosting over 100,000 pieces of
            content published daily, we cannot pre-vet content, but we strive to
            foster a dynamic environment for free expression and robust
            discourse through safety guardrails of human and AI moderation.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default PrivacyPolicy;