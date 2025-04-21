import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Step2 = ({ formData, handleChange, errors }) => {
  return (
    <>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
              className="bg-light"
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              isInvalid={!!errors.gender}
              className="bg-light"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.gender}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              isInvalid={!!errors.dateOfBirth}
              className="bg-light"
            />
            <Form.Control.Feedback type="invalid">
              {errors.dateOfBirth}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Security Answer</Form.Label>
            <Form.Control
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              isInvalid={!!errors.answer}
              className="bg-light"
            />
            <Form.Control.Feedback type="invalid">
              {errors.answer}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default Step2;