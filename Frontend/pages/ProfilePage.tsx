
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Skill, SkillType } from '../types';
import { apiGetSkillsByUser, apiAddSkill, apiDeleteSkill, apiUpdateUser } from '../services/api';
import { UserCircleIcon, LocationMarkerIcon, PlusCircleIcon, TrashIcon } from '../components/icons';

const SkillList: React.FC<{ title: string; skills?: Skill[]; type: SkillType; onAdd: (name: string, type: SkillType) => void; onDelete: (id: number) => void; }> = ({ title, skills = [], type, onAdd, onDelete }) => {
    const [newSkillName, setNewSkillName] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if((newSkillName ?? '').trim()) {
            onAdd((newSkillName ?? '').trim(), type);
            setNewSkillName('');
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <ul className="space-y-2 mb-4">
                {skills.map(skill => (
                    <li key={skill.id} className="flex justify-between items-center bg-slate-100 p-2 rounded">
                        <span>{skill.skillName}</span>
                        <button onClick={() => onDelete(skill.id)} className="text-red-500 hover:text-red-700">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </li>
                ))}
                {skills.length === 0 && <p className="text-slate-500">No skills listed yet.</p>}
            </ul>
            <form onSubmit={handleAdd} className="flex gap-2">
                <input 
                    type="text"
                    value={newSkillName ?? ''}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Add a new skill"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                />
                <button type="submit" className="bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600">
                    <PlusCircleIcon className="w-6 h-6"/>
                </button>
            </form>
        </div>
    );
};


const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isPublic, setIsPublic] = useState(user?.isPublic ?? true);
    const [loading, setLoading] = useState(true);

    const fetchSkills = useCallback(async () => {
        if (user) {
            setLoading(true);
            try {
                const userSkills = await apiGetSkillsByUser(user.id);
                setSkills(userSkills);
                setIsPublic(user.isPublic);
                // Patch: update user in localStorage and context
                const updatedUser = { ...user, skills: userSkills };
                localStorage.setItem('skill-swap-user', JSON.stringify(updatedUser));
                window.dispatchEvent(new Event('storage'));
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchSkills();
        }
    }, [user, navigate, fetchSkills]);

    const handleAddSkill = async (name: string, type: SkillType) => {
        if(user) {
            await apiAddSkill(user.id, name, type);
            fetchSkills();
        }
    };

    const handleDeleteSkill = async (id: number) => {
        await apiDeleteSkill(id);
        fetchSkills();
    };

    const handleTogglePublic = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(user) {
            const newIsPublic = e.target.checked;
            setIsPublic(newIsPublic);
            const updatedUser = await apiUpdateUser(user.id, { isPublic: newIsPublic });
            // Patch: update user in localStorage and context
            localStorage.setItem('skill-swap-user', JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('storage')); // trigger update for other tabs if needed
        }
    };

    if (!user) return null;

    const offeredSkills = skills.filter(s => s.skillType === SkillType.OFFERED);
    const wantedSkills = skills.filter(s => s.skillType === SkillType.WANTED);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        {user.profilePhoto ? (
                            <img src={user.profilePhoto} alt={user.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                        ) : (
                            <UserCircleIcon className="w-32 h-32 text-slate-400 mx-auto mb-4" />
                        )}
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-slate-500">{user.email}</p>
                        {user.location && <p className="text-slate-500 mt-1 flex items-center justify-center"><LocationMarkerIcon className="w-4 h-4 mr-1"/>{user.location}</p>}
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Settings</h3>
                         <div className="flex items-center justify-between">
                             <span className="text-slate-700">Make profile public</span>
                             <label className="relative inline-flex items-center cursor-pointer">
                                 <input type="checkbox" checked={isPublic} onChange={handleTogglePublic} className="sr-only peer" />
                                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-sky-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                             </label>
                         </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-8">
                    <SkillList title="Skills I Offer" skills={offeredSkills} type={SkillType.OFFERED} onAdd={handleAddSkill} onDelete={handleDeleteSkill} />
                    <SkillList title="Skills I Want" skills={wantedSkills} type={SkillType.WANTED} onAdd={handleAddSkill} onDelete={handleDeleteSkill} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
