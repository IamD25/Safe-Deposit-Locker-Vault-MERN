import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
// import ProgressBar from './ProgressBar';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
const API_URL = import.meta.env.VITE_API_URL;
import './../../style/AuthStyle.css';
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    answer: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    lockerSize: '',
    lockerType: '',
    lockerDimensions: ''
  }); 
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateStep = (step) => {
    let isValid = true;
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full Name is required';
        isValid = false;
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
        isValid = false;
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
        isValid = false;
      }else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/.test(formData.password)) {
        newErrors.password = 'Password must include upper, lower, number & special char';
        isValid = false;
      }
      

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Contact Number is required';
        isValid = false;
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Contact Number must be 10 digits';
        isValid = false;
      }

      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
        isValid = false;
      }

      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of Birth is required';
        isValid = false;
      }
      if (!formData.answer.trim()) {
        newErrors.answer = 'Answer is required';
        isValid = false;
      }

    } else if (step === 3) {
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
        isValid = false;
      }

      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
        isValid = false;
      }

      if (!formData.state.trim()) {
        newErrors.state = 'State is required';
        isValid = false;
      }

      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
        isValid = false;
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Pincode must be 6 digits';
        isValid = false;
      }
    } else if (step === 4) {
      if (!formData.lockerSize) {
        newErrors.lockerSize = 'Locker Size is required';
        isValid = false;
      }

      if (!formData.lockerType) {
        newErrors.lockerType = 'Locker Type is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      try {
        const response = await axios.post(`${API_URL}/api/v1/auth/register`, {formData});
        console.log('Registration successful:', response.data);
        // Redirect to success page or login
        toast.success(response.data.message);
        navigate("/login")
      } catch (error) {
        toast.error('Registration error:', error.response?.data || error.message);
        setErrors({ submit: error.response?.data?.message || 'Registration failed. Please try again.' });
      }
      
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1 
            formData={formData} 
            handleChange={handleChange} 
            errors={errors} 
          />
        );
      case 2:
        return (
          <Step2 
            formData={formData} 
            handleChange={handleChange} 
            errors={errors} 
          />
        );
      case 3:
        return (
          <Step3 
            formData={formData} 
            handleChange={handleChange} 
            errors={errors} 
          />
        );
      case 4:
        return (
          <Step4 
            formData={formData} 
            handleChange={handleChange} 
            errors={errors} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-sm" style={{ width: '500px' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-2">Register here</h2>
          <p className="text-center mb-4">Step {currentStep} of 4</p>
          
          <Form onSubmit={currentStep === 4 ? handleSubmit : handleNext}>
            {renderStep()}
            
            <Row className="mt-4">
              <Col>
                {currentStep > 1 && (
                  <Button 
                    variant="secondary" 
                    onClick={handlePrevious}
                    className="px-4"
                  >
                    Previous
                  </Button>
                )}
              </Col>
              <Col className="text-end">
                {currentStep < 4 ? (
                  <Button 
                    variant="dark" 
                    type="button" 
                    onClick={handleNext}
                    className="px-4"
                  >
                    Next
                  </Button>
                ) : (
                  <Button   
                    variant="dark" 
                    type="submit"
                    className="px-4"
                  >
                    Submit
                  </Button>
                )}
              </Col>
            </Row>
            
            {errors.submit && (
              <div className="text-danger text-center mt-3">
                {errors.submit}
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>  
    </Layout>
  );
};

export default RegistrationForm;