import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page/Page';
import ProfileEditModal from '../components/ProfileEditModal/ProfileEditModal';
import './ProfilePage.css';

export default function ProfilePage({ activeUser }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        if (!activeUser) {
            navigate('/login');
            return;
        }
        fetch(`/api/users/${activeUser}`)
            .then(r => r.json())
            .then(setUser)
            .catch(console.error);
    }, [activeUser, navigate]);

    if (!user) return null;

    return (
        <Page activeUser={activeUser}>
            <div className="profile-page">
                <aside className="profile-sidebar">
                    <div className="profile-icon-wrapper">
                        <img
                            src="/button_icons/Profile.png"
                            alt="User Avatar"
                            className="profile-avatar"
                        />
                    </div>
                    <h2 className="profile-name">
                        {user.first_name} {user.last_name}
                    </h2>
                    <button
                        className="logout-btn"
                        onClick={() => {
                            // TODO: clear auth state
                            navigate('/');
                        }}
                    >
                        Log Out
                    </button>
                </aside>

                <section className="profile-main">
                    <div className="profile-info-card">
                        <h3 className="info-heading">Personal Information</h3>

                        <div className="info-row">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{user.email_addr}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Address:</span>
                            <span className="info-value">
                {               user.address || <em>Not set</em>}
                            </span>
                        </div>

                        <button
                            className="edit-profile-btn"
                            onClick={() => setShowEdit(true)}
                        >
                            Edit Profile
                        </button>
                    </div>
                </section>
            </div>

            {showEdit && (
                <ProfileEditModal
                    user={user}
                    onClose={() => setShowEdit(false)}
                    onSave={updatedUser => {
                        // for now just merge locally, will fix later
                        setUser(updatedUser);
                        setShowEdit(false);
                    }}
                />
            )}
        </Page>
    );
}