
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, SkillType } from '../types';
import { UserCircleIcon, LocationMarkerIcon } from './icons';

interface UserProfileCardProps {
  user: User;
}

const SkillTag: React.FC<{ children: React.ReactNode, type: SkillType }> = ({ children, type }) => {
  const baseClasses = "text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full";
  const typeClasses = type === SkillType.OFFERED 
    ? "bg-sky-100 text-sky-800"
    : "bg-indigo-100 text-indigo-800";
  return <span className={`${baseClasses} ${typeClasses}`}>{children}</span>;
};


const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const navigate = useNavigate();

  const offeredSkills = user?.skills?.filter(skill => skill.skillType === SkillType.OFFERED) || [];
  const wantedSkills = user?.skills?.filter(skill => skill.skillType === SkillType.WANTED) || [];

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full cursor-pointer" onClick={() => navigate(`/users/${user.id}`)}>
      <div className="p-6 flex-grow">
        <div className="flex items-center space-x-4 mb-4">
          {user.profilePhoto ? (
            <img className="h-16 w-16 rounded-full object-cover" src={user.profilePhoto} alt={user.name} />
          ) : (
            <UserCircleIcon className="h-16 w-16 text-slate-400" />
          )}
          <div>
            <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
            {user.location && (
              <div className="flex items-center text-sm text-slate-500 mt-1">
                <LocationMarkerIcon className="h-4 w-4 mr-1"/>
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-600 mb-2 text-sm">Skills Offered</h4>
            <div className="flex flex-wrap">
              {offeredSkills.length > 0 ? (
                offeredSkills.slice(0, 5).map(skill => <SkillTag key={skill.id} type={SkillType.OFFERED}>{skill.skillName}</SkillTag>)
              ) : (
                <p className="text-sm text-slate-400">No skills offered yet.</p>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-600 mb-2 text-sm">Skills Wanted</h4>
            <div className="flex flex-wrap">
              {wantedSkills.length > 0 ? (
                wantedSkills.slice(0, 5).map(skill => <SkillTag key={skill.id} type={SkillType.WANTED}>{skill.skillName}</SkillTag>)
              ) : (
                <p className="text-sm text-slate-400">No skills wanted yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-6 py-3">
         <span className="text-sm font-medium text-sky-600 hover:text-sky-700">View Profile &rarr;</span>
      </div>
    </div>
  );
};

export default UserProfileCard;
