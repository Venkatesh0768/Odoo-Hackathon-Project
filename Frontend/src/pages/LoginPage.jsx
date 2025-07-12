import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { loginUser } from '../services/api';
import './LoginPage.css';


const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@skillswap.com',
      password: 'demo123'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo mode: if demo credentials, skip backend
    if (
      formData.email === 'demo@skillswap.com' &&
      formData.password === 'demo123'
    ) {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('demoUser', JSON.stringify({
          id: 'demo-user-123',
          email: formData.email,
          name: 'Demo User'
        }));
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in with demo credentials.",
        });
        navigate('/dashboard');
      }, 1000);
      return;
    }

    // Real login using the correct endpoint
    try {
      const response = await loginUser(formData);
      
      // Handle the response based on your backend structure
      if (response.data) {
        // Store user data and token
        localStorage.setItem('token', response.data.token || 'demo-token');
        localStorage.setItem('user', JSON.stringify(response.data.user || response.data));
        
        toast({
          title: "Welcome back!",
          description: `Logged in as ${response.data.user?.name || response.data.name || 'User'}`,
        });

        navigate('/dashboard');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials or server error.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

return (
  <div className="login-page">
    <div className="login-container">
      <button 
        className="back-button" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft style={{ width: "16px", height: "16px", marginRight: "6px" }} />
        Back to Home
      </button>

      <div className="login-card">
        <div className="card-header">
          <div className="icon-box">
            <Users />
          </div>
          <div className="card-title">Welcome Back</div>
          <div className="card-description">Sign in to your Odoo Project account</div>
        </div>

        <div className="demo-box">
          <p>
            <strong>Demo Mode:</strong> Use any email/password or click the button below
          </p>
          <button 
            type="button" 
            className="signin-btn" 
            onClick={handleDemoLogin}
          >
            Fill Demo Credentials
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <Label htmlFor="password">Password</Label>
            <div className="password-wrapper">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="signin-btn"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="signup-text">
          Don't have an account?{' '}
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  </div>
);
};
export default Login;
