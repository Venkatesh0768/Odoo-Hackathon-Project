
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Star, MessageCircle, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Directory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      bio: "UX Designer passionate about creating intuitive digital experiences",
      location: "San Francisco, CA",
      rating: 4.9,
      skillsOffered: ["UX Design", "Figma", "User Research"],
      skillsWanted: ["Python", "Data Analysis"],
      availability: "Weekends",
      responseRate: "95%"
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Professional photographer and language enthusiast",
      location: "New York, NY",
      rating: 4.8,
      skillsOffered: ["Photography", "Photo Editing", "Spanish"],
      skillsWanted: ["Web Development", "Marketing"],
      availability: "Evenings",
      responseRate: "87%"
    },
    {
      id: 3,
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      bio: "Full-stack developer with a passion for clean code",
      location: "Austin, TX",
      rating: 5.0,
      skillsOffered: ["React", "Node.js", "JavaScript"],
      skillsWanted: ["UI Design", "Product Management"],
      availability: "Weekdays",
      responseRate: "92%"
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "Data analyst who loves teaching and learning new skills",
      location: "Seattle, WA",
      rating: 4.7,
      skillsOffered: ["Excel", "Data Visualization", "SQL"],
      skillsWanted: ["Python", "Machine Learning"],
      availability: "Weekends",
      responseRate: "89%"
    }
  ];

  // Filter users based on search criteria
  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button onClick={() => navigate('/login')}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing People
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find skilled individuals ready to share knowledge and learn from you
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search skills or people..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Location Filter */}
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
                </SelectContent>
              </Select>

              {/* Availability Filter */}
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="Weekdays">Weekdays</SelectItem>
                  <SelectItem value="Weekends">Weekends</SelectItem>
                  <SelectItem value="Evenings">Evenings</SelectItem>
                </SelectContent>
              </Select>

              {/* Skill Filter */}
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
            Showing {filteredUsers.length} of {users.length} members
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-1">{user.name}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{user.location}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{user.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{user.responseRate} response</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{user.bio}</p>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Skills offered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Wants to learn:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Available: {user.availability}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-green-600">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria to find more people
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setSkillFilter('');
                setAvailabilityFilter('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredUsers.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Members
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
