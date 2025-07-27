import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './ChangePasswordModal.css';

export default function ChangePasswordModal({ email, userId, onClose }) {
    const [form, setForm] = useState({
        current: '',
        next: '',
        confirm: ''
    });
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const handleChange = e =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        if (form.next !== form.confirm) {
            return setError('New passwords must match.');
        }
        setSaving(true);
        try {
            let loginRes = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: form.current })
            });
            if (!loginRes.ok) {
                throw new Error('Current password incorrect.');
            }
            let updRes = await fetch(`/api/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: form.next })
            });
            if (!updRes.ok) {
                const { error } = await updRes.json();
                throw new Error(error || 'Could not save new password.');
            }
            onClose();
        } catch (err) {
            setError(err.message);
            setSaving(false);
        }
    };

    return ReactDOM.createPortal(
        <div className="cp-backdrop">
            <div className="cp-modal">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Current Password
                        <input
                            name="current"
                            type="password"
                            value={form.current}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        New Password
                        <input
                            name="next"
                            type="password"
                            value={form.next}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Confirm New Password
                        <input
                            name="confirm"
                            type="password"
                            value={form.confirm}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {error && <p className="cp-error">{error}</p>}
                    <div className="cp-buttons">
                        <button type="button" onClick={onClose} disabled={saving}>
                            Cancel
                        </button>
                        <button type="submit" disabled={saving}>
                            {saving ? 'Saving…' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
