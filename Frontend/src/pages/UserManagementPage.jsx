import React, { useState, useEffect } from 'react';
import { getAllUsers, banUser, unbanUser, deleteUser } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId) => {
    try {
      await banUser(userId);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isBanned: true } : user
      ));
    } catch (err) {
      setError('Failed to ban user');
      console.error('Error banning user:', err);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      await unbanUser(userId);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isBanned: false } : user
      ));
    } catch (err) {
      setError('Failed to unban user');
      console.error('Error unbanning user:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage all users in the system</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Label htmlFor="search">Search Users</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search by name, email, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button onClick={fetchUsers} className="mt-6">
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {user.profilePhoto ? (
                      <img 
                        src={user.profilePhoto} 
                        alt={user.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-lg">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.name}
                      {user.isBanned && (
                        <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                          BANNED
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.location}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded ${
                        user.isPublic 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.isPublic ? 'Public' : 'Private'}
                      </span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewUserDetails(user)}
                  >
                    View Details
                  </Button>
                  {user.isBanned ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnbanUser(user.id)}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      Unban
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBanUser(user.id)}
                      className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                    >
                      Ban
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No users found</p>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  {selectedUser.profilePhoto ? (
                    <img 
                      src={selectedUser.profilePhoto} 
                      alt={selectedUser.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-xl">
                      {selectedUser.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-gray-700">{selectedUser.location || 'Not specified'}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Role</Label>
                  <p className="text-gray-700">{selectedUser.role}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      selectedUser.isPublic 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedUser.isPublic ? 'Public' : 'Private'}
                    </span>
                    {selectedUser.isBanned && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                        Banned
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">User ID</Label>
                  <p className="text-gray-700">{selectedUser.id}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowUserDetails(false)}
                  className="flex-1"
                >
                  Close
                </Button>
                {selectedUser.isBanned ? (
                  <Button
                    onClick={() => {
                      handleUnbanUser(selectedUser.id);
                      setShowUserDetails(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Unban User
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleBanUser(selectedUser.id);
                      setShowUserDetails(false);
                    }}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                  >
                    Ban User
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage; 