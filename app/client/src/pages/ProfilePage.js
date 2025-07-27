import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page/Page';
import ProfileEditModal from '../components/ProfileEditModal/ProfileEditModal';
import ChangePasswordModal from '../components/ChangePasswordModal/ChangePasswordModal';
import './ProfilePage.css';

export default function ProfilePage({ activeUser, setActiveUser }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showChange, setShowChange] = useState(false);

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
                    <div className="profile-avatar-wrapper">
                        <img
                            src="/button_icons/Profile.png"
                            alt="User Avatar"
                            className="profile-avatar"
                        />
                    </div>
                    <h2 className="profile-name">
                        {user.first_name} {user.last_name}
                    </h2>
                    <div className="sidebar-actions">
                        <button
                            className="view-orders-btn"
                            onClick={() => navigate('/orders')}
                        >
                            View Orders
                        </button>
                        <button
                            className="logout-btn"
                            onClick={() => {
                                setActiveUser(null);
                                navigate('/');
                            }}
                        >
                            Log Out
                        </button>
                    </div>
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
                                {user.shipping_addr || <em>Not set</em>}
                            </span>
                        </div>
                        <div className="profile-actions">
                            <button onClick={() => setShowEdit(true)}>
                                Edit Profile
                            </button>
                            <button onClick={() => setShowChange(true)}>
                                Change Password
                            </button>
                        </div>
                    </div>
                </section>
            </div>
            {showEdit && (
                <ProfileEditModal
                    user={user}
                    onClose={() => setShowEdit(false)}
                    onSave={updated => {
                        setUser(updated);
                        setShowEdit(false);
                    }}
                />
            )}
            {showChange && (
                <ChangePasswordModal
                    email={user.email_addr}
                    userId={user.id}
                    onClose={() => setShowChange(false)}
                />
            )}
        </Page>
    );
}
