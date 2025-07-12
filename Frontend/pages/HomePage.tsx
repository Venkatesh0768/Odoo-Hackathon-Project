
import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { apiGetUsers, apiSearchUsersBySkill } from '../services/api';
import UserProfileCard from '../components/UserProfileCard';

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async (term: string) => {
    setLoading(true);
    try {
      const result = await apiSearchUsersBySkill(term);
      setUsers(result);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers('');
  }, [fetchUsers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(searchTerm);
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Find Your Perfect Skill Exchange
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
          Search for a skill you want to learn, and connect with people who want to learn what you have to offer.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for skills like 'Photoshop' or 'Excel'..."
            className="w-full px-4 py-3 rounded-lg border-slate-300 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm"
          />
          <button type="submit" className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors shadow">
            Search
          </button>
        </form>
      </div>
      
      {loading ? (
        <div className="text-center">Loading profiles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {users.map(user => (
            <UserProfileCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
