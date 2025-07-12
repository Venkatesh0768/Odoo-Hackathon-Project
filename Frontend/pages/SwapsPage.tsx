
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SwapRequest, SwapStatus } from '../types';
import { apiGetSwapsByReceiver, apiGetSwapsBySender, apiUpdateSwapStatus, apiDeleteSwapRequest } from '../services/api';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon, TrashIcon, UserCircleIcon } from '../components/icons';

type Tab = 'incoming' | 'outgoing';

const SwapCard: React.FC<{ swap: SwapRequest; type: Tab; onUpdate: () => void }> = ({ swap, type, onUpdate }) => {
    const handleUpdateStatus = async (status: SwapStatus) => {
        await apiUpdateSwapStatus(swap.id, status);
        onUpdate();
    };

    const handleDelete = async () => {
        await apiDeleteSwapRequest(swap.id);
        onUpdate();
    };
    
    const StatusBadge: React.FC<{status: SwapStatus}> = ({status}) => {
        const base = "px-3 py-1 text-xs font-medium rounded-full";
        const colors = {
            [SwapStatus.PENDING]: "bg-yellow-100 text-yellow-800",
            [SwapStatus.ACCEPTED]: "bg-green-100 text-green-800",
            [SwapStatus.REJECTED]: "bg-red-100 text-red-800",
            [SwapStatus.COMPLETED]: "bg-blue-100 text-blue-800",
        };
        return <span className={`${base} ${colors[status]}`}>{status}</span>
    }

    const Profile: React.FC<{user: any, label: string}> = ({user, label}) => (
        <div className="flex items-center gap-2 text-sm">
            {user.profilePhoto ? <img src={user.profilePhoto} className="w-8 h-8 rounded-full"/> : <UserCircleIcon className="w-8 h-8 text-slate-400"/>}
            <div>
                <div className="text-slate-500">{label}</div>
                <div className="font-semibold text-slate-800">{user.name}</div>
            </div>
        </div>
    )

    return (
        <div className="bg-white p-4 rounded-lg shadow-md transition-shadow hover:shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-grow space-y-3">
                    <div className="flex items-center justify-between">
                         <StatusBadge status={swap.status} />
                         <div className="text-xs text-slate-400">{new Date(swap.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Profile user={swap.sender} label="Sender"/>
                        <div className="text-slate-400"><ArrowPathIcon className="w-5 h-5"/></div>
                        <Profile user={swap.receiver} label="Receiver"/>
                    </div>
                    <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md">
                        Offering <span className="font-bold text-sky-600">{swap.offeredSkill.skillName}</span> in exchange for <span className="font-bold text-indigo-600">{swap.requestedSkill.skillName}</span>.
                    </div>
                </div>

                {swap.status === SwapStatus.PENDING && (
                    <div className="flex-shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto">
                        {type === 'incoming' && (
                            <>
                                <button onClick={() => handleUpdateStatus(SwapStatus.ACCEPTED)} className="flex items-center justify-center gap-2 w-full bg-green-500 text-white px-3 py-2 text-sm rounded-md hover:bg-green-600">
                                    <CheckCircleIcon className="w-5 h-5"/> Accept
                                </button>
                                <button onClick={() => handleUpdateStatus(SwapStatus.REJECTED)} className="flex items-center justify-center gap-2 w-full bg-red-500 text-white px-3 py-2 text-sm rounded-md hover:bg-red-600">
                                    <XCircleIcon className="w-5 h-5"/> Reject
                                </button>
                            </>
                        )}
                        {type === 'outgoing' && (
                            <button onClick={handleDelete} className="flex items-center justify-center gap-2 w-full bg-slate-500 text-white px-3 py-2 text-sm rounded-md hover:bg-slate-600">
                               <TrashIcon className="w-5 h-5"/> Delete
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const SwapsPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('incoming');
    const [swaps, setSwaps] = useState<SwapRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSwaps = useCallback(async () => {
        if (user) {
            setLoading(true);
            try {
                const fetchFn = activeTab === 'incoming' ? apiGetSwapsByReceiver : apiGetSwapsBySender;
                const result = await fetchFn(user.id);
                setSwaps(result);
            } catch (error) {
                console.error("Failed to fetch swaps", error);
            } finally {
                setLoading(false);
            }
        }
    }, [user, activeTab]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchSwaps();
        }
    }, [user, navigate, fetchSwaps]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6">My Swaps</h1>
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('incoming')}
                        className={`${activeTab === 'incoming' ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Incoming Requests
                    </button>
                    <button
                        onClick={() => setActiveTab('outgoing')}
                        className={`${activeTab === 'outgoing' ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Outgoing Requests
                    </button>
                </nav>
            </div>
            
            {loading ? (
                 <div className="text-center">Loading swaps...</div>
            ) : (
                <div className="space-y-4">
                    {swaps.length > 0 ? (
                        swaps.map(swap => <SwapCard key={swap.id} swap={swap} type={activeTab} onUpdate={fetchSwaps} />)
                    ) : (
                        <p className="text-center text-slate-500 bg-white p-8 rounded-lg shadow-sm">No {activeTab} requests found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SwapsPage;
