import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Step4 = ({ formData, handleChange, errors }) => {
  const [lockerSizes, setLockerSizes] = useState([]);
  const [lockerTypes, setLockerTypes] = useState([]);
  const [lockerDimensions, setDimensions] = useState('');

  useEffect(() => {
    // In a real app, fetch this data from the backend
    setLockerSizes(['Small', 'Medium', 'Large']);
    
    // Update locker types based on selected size
    if (formData.lockerSize === 'Small') {
      setLockerTypes(['A', 'B', 'C', 'D']);
    } else if (formData.lockerSize === 'Medium') {
      setLockerTypes(['H1', 'G', 'G1', 'F']);
    } else if (formData.lockerSize === 'Large') {
      setLockerTypes(['H', 'L', 'FR']);
    } else {
      setLockerTypes([]);
    }
  }, [formData.lockerSize]);

  useEffect(() => {
    // In a real app, fetch this data from the backend
    // For now, hardcoding based on the image data
    if (formData.lockerSize === 'Small' && formData.lockerType === 'A') {
      setDimensions('05x07x21');
    } else if (formData.lockerSize === 'Small' && formData.lockerType === 'B') {
      setDimensions('06X08X21');
    } else if (formData.lockerSize === 'Small' && formData.lockerType === 'C') {
      setDimensions('05X14X21');
    } else if (formData.lockerSize === 'Small' && formData.lockerType === 'D') {
      setDimensions('07X11X21');
    } else if (formData.lockerSize === 'Medium' && formData.lockerType === 'H1') {
      setDimensions('13X08X21');
    } else if (formData.lockerSize === 'Medium' && formData.lockerType === 'G') {
      setDimensions('06X17X21');
    } else if (formData.lockerSize === 'Medium' && formData.lockerType === 'G1') {
      setDimensions('08X21X21');
    } else if (formData.lockerSize === 'Medium' && formData.lockerType === 'F') {
      setDimensions('11X14X21');
    } else if (formData.lockerSize === 'Large' && formData.lockerType === 'H') {
      setDimensions('13X17X21');
    } else if (formData.lockerSize === 'Large' && formData.lockerType === 'L') {
      setDimensions('19X21X21');
    } else if (formData.lockerSize === 'Large' && formData.lockerType === 'FR') {
      setDimensions('20X18X21');
    } else {
      setDimensions('');
    }
    
    // Update the form data with the dimensions
    if (lockerDimensions) {
      handleChange({
        target: {
          name: 'lockerDimensions',
          value: lockerDimensions
        }
      });
    }
  }, [formData.lockerType, formData.lockerSize]);

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Select Locker Size</Form.Label>
            <Form.Select
              name="lockerSize"
              value={formData.lockerSize}
              onChange={handleChange}
              isInvalid={!!errors.lockerSize}
              className="bg-light"
            >
              <option value="">Select Size</option>
              {lockerSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.lockerSize}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Select Locker Type</Form.Label>
            <Form.Select
              name="lockerType"
              value={formData.lockerType}
              onChange={handleChange}
              isInvalid={!!errors.lockerType}
              disabled={!formData.lockerSize}
              className="bg-light"
            >
              <option value="">Select Type</option>
              {lockerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.lockerType}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Locker Dimensions</Form.Label>
            <Form.Control
              type="text"
              value={lockerDimensions}
              readOnly
              className="bg-light"
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default Step4;