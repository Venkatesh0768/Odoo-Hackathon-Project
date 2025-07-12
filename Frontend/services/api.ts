import { User, Skill, SwapRequest, Feedback, SkillType, SwapStatus } from '../types';

const API_BASE_URL = '/api/v1'; // Assumes the frontend is served from the same origin as the backend, or a proxy is configured.

// A custom error class to hold the HTTP status code for better error handling.
class ApiError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = 'ApiError';
    }
}

// Helper function to streamline fetch calls, handle headers, and parse responses.
const apiFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.message || errorMessage;
    } catch (e) {
      // The error response might not be JSON.
    }
    throw new ApiError(errorMessage, response.status);
  }

  // Handle responses that might not have a body (e.g., 200 OK or 204 No Content on DELETE).
  const responseText = await response.text();
  if (!responseText) {
    return {} as T;
  }
  
  return JSON.parse(responseText);
};

// --- API FUNCTIONS ---

// USER
export const apiLogin = async (email: string, pass: string) => {
    return apiFetch<{ message: string; user: User }>('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password: pass }),
    });
};

type RegisterData = {
    name: string;
    email: string;
    password: string;
    location?: string;
    profilePhoto?: string;
}
export const apiRegister = async (data: RegisterData) => {
    return apiFetch<User>('/users/register', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

export const apiGetUsers = async () => {
    const users = await apiFetch<User[]>('/users');
    // Patch: fetch skills for each user if not present
    const usersWithSkills = await Promise.all(users.map(async user => {
        if (!user.skills) {
            const skills = await apiGetSkillsByUser(user.id);
            return { ...user, skills };
        }
        return user;
    }));
    return usersWithSkills;
};

export const apiGetUserById = async (id: number) => {
    const user = await apiFetch<User>(`/users/${id}`);
    if (!user.skills) {
        const skills = await apiGetSkillsByUser(user.id);
        return { ...user, skills };
    }
    return user;
};

export const apiUpdateUser = async (id: number, data: Partial<User>) => {
    return apiFetch<User>(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const apiSearchUsersBySkill = async (skill: string) => {
    if (!skill.trim()) {
      return apiGetUsers();
    }
    const users = await apiFetch<User[]>(`/users/search?skill=${encodeURIComponent(skill)}`);
    // Patch: fetch skills for each user if not present
    const usersWithSkills = await Promise.all(users.map(async user => {
        if (!user.skills) {
            const skills = await apiGetSkillsByUser(user.id);
            return { ...user, skills };
        }
        return user;
    }));
    return usersWithSkills;
};


// SKILL
export const apiAddSkill = async (userId: number, skillName: string, skillType: SkillType) => {
    return apiFetch<Skill>('/skills', {
        method: 'POST',
        body: JSON.stringify({ skillName, skillType, user: { id: userId } }),
    });
};

export const apiDeleteSkill = async (skillId: number) => {
    await apiFetch(`/skills/${skillId}`, { method: 'DELETE' });
    return { message: 'Skill deleted' };
};

export const apiGetSkillsByUser = async (userId: number) => {
    return apiFetch<Skill[]>(`/skills/user/${userId}`);
};


// SWAP
export const apiCreateSwapRequest = async (senderId: number, receiverId: number, offeredSkillId: number, requestedSkillId: number) => {
    const body = {
        sender: { id: senderId },
        receiver: { id: receiverId },
        offeredSkill: { id: offeredSkillId },
        requestedSkill: { id: requestedSkillId },
    };
    return apiFetch<SwapRequest>('/swaps', {
        method: 'POST',
        body: JSON.stringify(body),
    });
};

export const apiGetSwapsByReceiver = async (receiverId: number) => {
    return apiFetch<SwapRequest[]>(`/swaps/receiver/${receiverId}`);
};

export const apiGetSwapsBySender = async (senderId: number) => {
    return apiFetch<SwapRequest[]>(`/swaps/sender/${senderId}`);
};

export const apiUpdateSwapStatus = async (swapId: number, status: SwapStatus) => {
    return apiFetch<SwapRequest>(`/swaps/${swapId}/status?status=${status}`, {
        method: 'PUT',
    });
};

export const apiDeleteSwapRequest = async (swapId: number) => {
    await apiFetch(`/swaps/${swapId}`, { method: 'DELETE' });
    return { message: 'Swap request deleted' };
};


// FEEDBACK
// Assuming /api/v1/ is the correct prefix for feedbacks, as it might be a typo in the provided documentation.
export const apiAddFeedback = async (swapRequestId: number, rating: number, comment: string) => {
    const body = { swapRequestId, rating, comment };
    return apiFetch<Feedback>('/feedbacks', {
        method: 'POST',
        body: JSON.stringify(body),
    });
}

export const apiGetFeedbackBySwapRequest = async (swapRequestId: number) => {
    try {
        return await apiFetch<Feedback | null>(`/feedbacks/swap/${swapRequestId}`);
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            return null; // Return null if feedback is not found
        }
        throw error;
    }
}
