import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import UserCard from '../components/UserCard';
import { getAllUsers } from '../services/api';

const MOCK_SKILLS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Graphic designer', 'Musician', 'Java', 'C++', 'UI/UX'
];

function getRandomSkills(n = 2) {
  return Array.from({ length: n }, () => MOCK_SKILLS[Math.floor(Math.random() * MOCK_SKILLS.length)]);
}

const DEMO_USERS = [
  {
    id: 1,
    name: 'Marc Demo',
    profilePhoto: '',
    skillsOffered: ['JavaScript', 'Python'],
    skillsWanted: ['Musician', 'Graphic designer'],
    rating: 3.9,
  },
  {
    id: 2,
    name: 'Michell',
    profilePhoto: '',
    skillsOffered: ['JavaScript', 'Python'],
    skillsWanted: ['Musician', 'Graphic designer'],
    rating: 2.5,
  },
  {
    id: 3,
    name: 'Joe Wills',
    profilePhoto: '',
    skillsOffered: ['JavaScript', 'Python'],
    skillsWanted: ['Musician', 'Graphic designer'],
    rating: 4.0,
  },
];

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [availability, setAvailability] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let f = users;
    if (search) {
      f = f.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(f);
    setPage(1);
  }, [search, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      let withSkills = res.data.map(u => ({
        ...u,
        skillsOffered: u.skillsOffered || getRandomSkills(2),
        skillsWanted: u.skillsWanted || getRandomSkills(2),
        rating: u.rating || (Math.random() * 2 + 3),
      }));
      if (!withSkills.length) {
        withSkills = DEMO_USERS;
      }
      setUsers(withSkills);
    } catch (e) {
      setUsers(DEMO_USERS);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = (user) => {
    alert(`Request sent to ${user.name}`);
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen bg-[#111] text-white">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6 border-b border-[#333] bg-[#18181b]">
        <div className="text-2xl font-bold tracking-wide mb-4 md:mb-0">Skill Swap Platform</div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            className="bg-[#222] border border-[#444] text-white px-3 py-2 rounded-md mr-2"
            value={availability}
            onChange={e => setAvailability(e.target.value)}
          >
            <option value="">Availability</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
          </select>
          <input
            className="bg-[#222] border border-[#444] text-white px-3 py-2 rounded-md mr-2 flex-1"
            placeholder="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Link to="/login">
            <Button className="bg-[#222] border border-[#444] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#333]">Login</Button>
          </Link>
        </div>
      </div>

      {/* User List */}
      <div className="max-w-2xl mx-auto py-8">
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading users...</div>
        ) : paginated.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No users found.</div>
        ) : (
          paginated.map(user => (
            <UserCard key={user.id} user={user} onRequest={handleRequest} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pb-8">
          <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>&lt;</Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button variant="ghost" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>&gt;</Button>
        </div>
      )}
    </div>
  );
};

export default HomePage; 