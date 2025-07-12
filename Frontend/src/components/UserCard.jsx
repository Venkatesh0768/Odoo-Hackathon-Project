import React from 'react';
import { Button } from './ui/button';

const UserCard = ({ user, onRequest }) => {
  return (
    <div className="bg-[#18181b] border border-[#444] rounded-xl p-6 flex items-center mb-6 relative">
      <div className="w-20 h-20 rounded-full bg-[#222] flex items-center justify-center text-white text-xl font-bold mr-6 border-2 border-[#444]">
        {user.profilePhoto ? (
          <img src={user.profilePhoto} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
        ) : (
          user.name?.charAt(0)?.toUpperCase() || 'U'
        )}
      </div>
      <div className="flex-1">
        <div className="text-white text-xl font-semibold mb-1">{user.name}</div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-green-400 text-sm">Skill Offered →</span>
          {user.skillsOffered?.map((skill, idx) => (
            <span key={idx} className="bg-[#222] border border-green-400 text-green-300 rounded-full px-3 py-1 text-xs font-medium mr-1">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-blue-400 text-sm">Skill wanted =&gt;</span>
          {user.skillsWanted?.map((skill, idx) => (
            <span key={idx} className="bg-[#222] border border-blue-400 text-blue-300 rounded-full px-3 py-1 text-xs font-medium mr-1">
              {skill}
            </span>
          ))}
        </div>
        <div className="text-gray-400 text-xs mt-1">rating <span className="text-yellow-400 font-bold">{user.rating?.toFixed(1) || 'N/A'}/5</span></div>
      </div>
      <Button className="bg-[#0ea5e9] hover:bg-[#38bdf8] text-white px-6 py-2 rounded-full text-lg font-semibold" onClick={() => onRequest(user)}>
        Request
      </Button>
    </div>
  );
};

export default UserCard; 