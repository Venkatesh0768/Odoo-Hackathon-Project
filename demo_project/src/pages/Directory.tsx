
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Clock, Star, MessageCircle, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Directory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      location: "San Francisco, CA",
      rating: 4.9,
      reviewCount: 23,
      skillsOffered: ["UX Design", "Figma", "User Research"],
      skillsWanted: ["Python", "Data Analysis"],
      availability: "Weekends",
      isOnline: true,
      lastSeen: "2 hours ago"
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      location: "New York, NY",
      rating: 4.8,
      reviewCount: 31,
      skillsOffered: ["Spanish", "Marketing", "Social Media"],
      skillsWanted: ["Photography", "Video Editing"],
      availability: "Evenings",
      isOnline: false,
      lastSeen: "1 day ago"
    },
    {
      id: 3,
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      location: "Austin, TX",
      rating: 5.0,
      reviewCount: 18,
      skillsOffered: ["React", "JavaScript", "Node.js"],
      skillsWanted: ["UI Design", "Branding"],
      availability: "Flexible",
      isOnline: true,
      lastSeen: "Just now"
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      location: "Seattle, WA",
      rating: 4.7,
      reviewCount: 42,
      skillsOffered: ["Excel", "Data Visualization", "Analytics"],
      skillsWanted: ["Machine Learning", "AI"],
      availability: "Weekdays",
      isOnline: false,
      lastSeen: "3 hours ago"
    },
    {
      id: 5,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      location: "Chicago, IL",
      rating: 4.9,
      reviewCount: 27,
      skillsOffered: ["Photography", "Photoshop", "Lightroom"],
      skillsWanted: ["Web Development", "SEO"],
      availability: "Weekends",
      isOnline: true,
      lastSeen: "30 minutes ago"
    },
    {
      id: 6,
      name: "James Thompson",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      location: "Los Angeles, CA",
      rating: 4.6,
      reviewCount: 15,
      skillsOffered: ["Guitar", "Music Theory", "Song Writing"],
      skillsWanted: ["Video Production", "After Effects"],
      availability: "Evenings",
      isOnline: true,
      lastSeen: "1 hour ago"
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !locationFilter || locationFilter === 'all' || user.location.includes(locationFilter);
    const matchesAvailability = !availabilityFilter || availabilityFilter === 'all' || user.availability === availabilityFilter;
    const matchesSkill = !skillFilter || 
      user.skillsOffered.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));

    return matchesSearch && matchesLocation && matchesAvailability && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  SkillSwap
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')} className="bg-gradient-to-r from-blue-600 to-green-600">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Amazing <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Skill Swappers</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with {mockUsers.length} talented individuals ready to share their knowledge
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search skills or names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Austin">Austin</SelectItem>
                  <SelectItem value="Seattle">Seattle</SelectItem>
                  <SelectItem value="Chicago">Chicago</SelectItem>
                  <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="Weekdays">Weekdays</SelectItem>
                  <SelectItem value="Weekends">Weekends</SelectItem>
                  <SelectItem value="Evenings">Evenings</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Filter by skill..."
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredUsers.length} of {mockUsers.length} skill swappers
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">{user.name}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {user.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{user.rating}</span>
                      <span className="text-gray-500 ml-1">({user.reviewCount})</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {user.isOnline ? 'Online now' : user.lastSeen}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Skills Offered</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Looking to Learn</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-green-300 text-green-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {user.availability}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="group-hover:bg-gray-50">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      Request Swap
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Profiles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Directory;
