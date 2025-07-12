import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Users } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css'; // your pure CSS file
import { register } from '../services/api'; // API call

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    agree: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert('You must agree to the terms.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.location || 'Unknown',
        profilePhoto: null,
        role: 'USER',
        public: true,
        banned: false,
      });

      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '6px' }} />
          Back to Home
        </button>

        <div className="register-card">
          <div className="card-header">
            <div className="icon-box"><Users /></div>
            <div className="card-title">Join SkillSwap</div>
            <div className="card-description">Create your account and start learning</div>
          </div>

          <div className="demo-box">
            <strong>Demo/API Mode:</strong> Fill in any details to create an account
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input name="name" id="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="input-group password-wrapper">
              <label htmlFor="password">Password</label>
              <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={formData.password} onChange={handleChange} required />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label htmlFor="agree" style={{ marginLeft: '8px' }}>
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button className="signin-btn" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="signup-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;