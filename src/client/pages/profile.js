import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';
import './pages.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profileData = await getUserProfile();
                setUser(profileData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            {user ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    {/* Add more user details as needed */}
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default Profile;