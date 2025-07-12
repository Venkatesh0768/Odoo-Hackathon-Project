
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Skill, SkillType, SwapRequest } from '../types';
import { apiGetUserById, apiCreateSwapRequest, apiGetSkillsByUser } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { UserCircleIcon, LocationMarkerIcon, ArrowPathIcon } from '../components/icons';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};


const UserProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user: currentUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [profileUser, setProfileUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [selectedOfferedSkill, setSelectedOfferedSkill] = useState<number | undefined>();
    const [selectedRequestedSkill, setSelectedRequestedSkill] = useState<number | undefined>();
    const [swapStatus, setSwapStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const [currentUserOfferedSkills, setCurrentUserOfferedSkills] = useState<Skill[]>([]);


    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                // If viewing own profile, redirect to the editable profile page
                if(currentUser && currentUser.id === parseInt(id)) {
                    navigate('/profile');
                    return;
                }
                setLoading(true);
                try {
                    const fetchedUser = await apiGetUserById(parseInt(id));
                    setProfileUser(fetchedUser);
                } catch (err: any) {
                    setError(err.message || 'Could not load profile.');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchUser();
    }, [id, currentUser, navigate]);

    // Fetch current user's offered skills when modal opens
    useEffect(() => {
        if (isModalOpen && currentUser) {
            (async () => {
                const skills = await apiGetSkillsByUser(currentUser.id);
                setCurrentUserOfferedSkills((skills || []).filter(s => (s.skillType || '').toLowerCase() === 'offered'));
            })();
        }
    }, [isModalOpen, currentUser]);

    const handleRequestSwap = async () => {
        if (!currentUser || !selectedOfferedSkill || !selectedRequestedSkill || !profileUser) return;
        
        setSwapStatus('sending');
        try {
            await apiCreateSwapRequest(currentUser.id, profileUser.id, selectedOfferedSkill, selectedRequestedSkill);
            setSwapStatus('success');
            setTimeout(() => {
                setIsModalOpen(false);
                setSwapStatus('idle');
            }, 2000);
        } catch (error) {
            console.error(error);
            setSwapStatus('error');
        }
    }
    
    const SkillPill: React.FC<{skill: Skill}> = ({skill}) => {
        const typeClasses = skill.skillType === SkillType.OFFERED 
            ? "bg-sky-100 text-sky-800 border-sky-200"
            : "bg-indigo-100 text-indigo-800 border-indigo-200";
        return <div className={`text-base font-medium mr-2 mb-2 px-4 py-2 rounded-lg border ${typeClasses}`}>{skill.skillName}</div>
    }


    if (loading) return <div className="text-center p-10">Loading profile...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!profileUser) return <div className="text-center p-10">User not found.</div>;

    const offeredSkills = (profileUser.skills ?? []).filter(s => (s.skillType || '').toLowerCase() === 'offered');
    const wantedSkills = (profileUser.skills ?? []).filter(s => (s.skillType || '').toLowerCase() === 'wanted');
    

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                     <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-8">
                        {profileUser.profilePhoto ? (
                            <img src={profileUser.profilePhoto} alt={profileUser.name} className="w-40 h-40 rounded-full object-cover shadow-md mb-4 sm:mb-0" />
                        ) : (
                            <UserCircleIcon className="w-40 h-40 text-slate-300 mb-4 sm:mb-0" />
                        )}
                        <div className="flex-grow text-center sm:text-left">
                            <h1 className="text-4xl font-bold text-slate-800">{profileUser.name}</h1>
                            {profileUser.location && <p className="text-lg text-slate-500 mt-2 flex items-center justify-center sm:justify-start"><LocationMarkerIcon className="w-5 h-5 mr-2"/>{profileUser.location}</p>}
                            {isAuthenticated && currentUser?.id !== profileUser.id && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="mt-6 bg-sky-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-600 transition-all shadow flex items-center gap-2 mx-auto sm:mx-0">
                                    <ArrowPathIcon className="w-5 h-5"/>
                                    Request Swap
                                </button>
                            )}
                        </div>
                     </div>
                     <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 border-sky-200 pb-2">Skills Offered</h2>
                            <div className="flex flex-wrap">
                                {offeredSkills.length > 0 ? offeredSkills.map(s => <SkillPill key={s.id} skill={s}/>) : <p className="text-slate-500">None yet.</p>}
                            </div>
                        </div>
                         <div>
                            <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 border-indigo-200 pb-2">Skills Wanted</h2>
                            <div className="flex flex-wrap">
                                {wantedSkills.length > 0 ? wantedSkills.map(s => <SkillPill key={s.id} skill={s}/>) : <p className="text-slate-500">None yet.</p>}
                            </div>
                        </div>
                     </div>
                </div>
             </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                 <h2 className="text-2xl font-bold mb-4">Request a Swap with {profileUser.name}</h2>
                 {swapStatus === 'success' ? (
                     <div className="text-center text-green-600">
                         <p className="text-lg">Swap request sent successfully!</p>
                     </div>
                 ) : (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Offered Skill:</label>
                                <select value={selectedOfferedSkill} onChange={(e) => setSelectedOfferedSkill(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md">
                                    <option>Select a skill you offer...</option>
                                    {currentUserOfferedSkills.map(s => <option key={s.id} value={s.id}>{s.skillName}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Their Requested Skill:</label>
                                <select value={selectedRequestedSkill} onChange={(e) => setSelectedRequestedSkill(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md">
                                    <option>Select a skill you want...</option>
                                    {offeredSkills.map(s => <option key={s.id} value={s.id}>{s.skillName}</option>)}
                                </select>
                            </div>
                        </div>
                        {swapStatus === 'error' && <p className="text-red-500 mt-2">Failed to send request. Please try again.</p>}
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                            <button onClick={handleRequestSwap} disabled={!selectedOfferedSkill || !selectedRequestedSkill || swapStatus === 'sending'} className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 disabled:bg-sky-300">
                                {swapStatus === 'sending' ? 'Sending...' : 'Send Request'}
                            </button>
                        </div>
                    </>
                 )}
            </Modal>
        </div>
    );
};

export default UserProfilePage;
