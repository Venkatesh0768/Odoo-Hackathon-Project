
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [wantInput, setWantInput] = useState('');
  
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.skillsOffered.length === 0) {
      toast({
        title: "Skills required",
        description: "Please add at least one skill you can offer.",
        variant: "destructive"
      });
      return;
    }

    if (formData.skillsWanted.length === 0) {
      toast({
        title: "Learning goals required",
        description: "Please add at least one skill you want to learn.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Demo profile setup
    setTimeout(() => {
      setIsLoading(false);
      // Update demo user profile
      const demoUser = JSON.parse(localStorage.getItem('demoUser') || '{}');
      localStorage.setItem('demoUser', JSON.stringify({
        ...demoUser,
        ...formData,
        profileComplete: true
      }));
      
      toast({
        title: "Profile completed!",
        description: "Welcome to SkillSwap! You can now explore and connect with other users.",
      });
      navigate('/dashboard');
    }, 1000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addSkill = (type) => {
    const input = type === 'offered' ? skillInput : wantInput;
    if (!input.trim()) return;

    const key = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    if (!formData[key].includes(input.trim())) {
      setFormData({
        ...formData,
        [key]: [...formData[key], input.trim()]
      });
    }

    if (type === 'offered') {
      setSkillInput('');
    } else {
      setWantInput('');
    }
  };

  const removeSkill = (type, skill) => {
    const key = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    setFormData({
      ...formData,
      [key]: formData[key].filter(s => s !== skill)
    });
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(type);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6 p-2 hover:bg-white/80"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Skip for now
        </Button>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
              <CardDescription className="text-gray-600">
                Tell us about your skills and what you want to learn
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., San Francisco, CA"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </div>

              <div className="space-y-3">
                <Label>Skills I can offer</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'offered')}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={() => addSkill('offered')}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skillsOffered.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill('offered', skill)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Skills I want to learn</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill..."
                    value={wantInput}
                    onChange={(e) => setWantInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'wanted')}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={() => addSkill('wanted')}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skillsWanted.map((skill, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill('wanted', skill)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  name="availability"
                  placeholder="e.g., Weekends, Evenings"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Saving profile..." : "Complete Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
