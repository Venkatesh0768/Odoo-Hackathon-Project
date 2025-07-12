
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, 
  MessageCircle, 
  Users, 
  Star, 
  TrendingUp, 
  Calendar, 
  Award,
  Zap,
  Eye,
  Heart,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("matches");

  // Mock data
  const smartMatches = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      compatibility: 95,
      skillOffered: "UX Design",
      skillWanted: "Python",
      yourSkill: "Python",
      yourWant: "UX Design",
      matchReason: "Perfect complement match",
      rating: 4.9,
      responseRate: "95%",
      location: "San Francisco, CA"
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      compatibility: 88,
      skillOffered: "Spanish",
      skillWanted: "Photography",
      yourSkill: "Photography",
      yourWant: "Spanish",
      matchReason: "Language & Creative skills",
      rating: 4.8,
      responseRate: "87%",
      location: "New York, NY"
    },
    {
      id: 3,
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      compatibility: 82,
      skillOffered: "React",
      skillWanted: "UI Design",
      yourSkill: "UI Design",
      yourWant: "React",
      matchReason: "Frontend Development focus",
      rating: 5.0,
      responseRate: "92%",
      location: "Austin, TX"
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      skillOffered: "Excel",
      skillWanted: "Python",
      message: "Hi! I'd love to learn Python from you. I can teach you advanced Excel and data visualization.",
      timeAgo: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      skillOffered: "Photography",
      skillWanted: "Web Development",
      message: "I'm a professional photographer looking to transition into tech. Would love to trade skills!",
      timeAgo: "1 day ago",
      status: "pending"
    }
  ];

  const activeSwaps = [
    {
      id: 1,
      name: "James Thompson",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      skillOffered: "Guitar",
      skillWanted: "Video Editing",
      progress: 65,
      nextSession: "Tomorrow 7:00 PM",
      status: "active"
    }
  ];

  const stats = {
    totalSwaps: 12,
    rating: 4.8,
    completionRate: 94,
    skillsLearned: 8
  };

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
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            You have 3 new match suggestions and 2 pending requests.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Swaps</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSwaps}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Your Rating</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skills Learned</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.skillsLearned}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="matches" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Smart Matches</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Requests</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Active Swaps</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>

          {/* Smart Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span>Smart Match Suggestions</span>
                  <Badge variant="secondary">AI Powered</Badge>
                </CardTitle>
                <CardDescription>
                  These users have skills you want and want skills you have
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {smartMatches.map((match) => (
                    <Card key={match.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={match.avatar} 
                              alt={match.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold">{match.name}</h3>
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                  {match.compatibility}% Match
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{match.location}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-gray-900">They offer:</p>
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {match.skillOffered}
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm font-medium text-gray-900">They want:</p>
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    {match.skillWanted}
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{match.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{match.responseRate} response rate</span>
                                </div>
                              </div>

                              <p className="text-sm text-blue-600 font-medium mb-4">
                                💡 {match.matchReason}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2">
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600">
                              Request Swap
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Profile
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Heart className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>
                  Users who want to swap skills with you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <Card key={request.id} className="border-l-4 border-l-yellow-400">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={request.avatar} 
                              alt={request.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold">{request.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {request.timeAgo}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <span>Offers: <strong>{request.skillOffered}</strong></span>
                                <span>Wants: <strong>{request.skillWanted}</strong></span>
                              </div>
                              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 mb-4">
                                {request.message}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="h-4 w-4 mr-1" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Swaps Tab */}
          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Skill Swaps</CardTitle>
                <CardDescription>
                  Your ongoing learning exchanges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSwaps.map((swap) => (
                    <Card key={swap.id} className="border-l-4 border-l-green-400">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={swap.avatar} 
                              alt={swap.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold mb-2">{swap.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <span>Learning: <strong>{swap.skillOffered}</strong></span>
                                <span>Teaching: <strong>{swap.skillWanted}</strong></span>
                              </div>
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{swap.progress}%</span>
                                </div>
                                <Progress value={swap.progress} className="h-2" />
                              </div>
                              <p className="text-sm text-gray-600">
                                Next session: <strong>{swap.nextSession}</strong>
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Calendar className="h-4 w-4 mr-1" />
                              Schedule
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Swap History</CardTitle>
                <CardDescription>
                  Your completed skill exchanges and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-600">
                    Your swap history and achievements will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
