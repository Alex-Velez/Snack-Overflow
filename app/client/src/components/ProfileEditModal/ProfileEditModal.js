import React, { useState } from 'react';
import './ProfileEditModal.css';

export default function ProfileEditModal({ user, onClose, onSave }) {
    const [form, setForm] = useState({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email_addr: user.email_addr || '',
        shipping_addr: user.shipping_addr || ''
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const res = await fetch(`/api/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || 'Save failed');
            }
            const updated = await res.json();
            onSave(updated);
        } catch (err) {
            setError(err.message);
            setSaving(false);
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-card">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name
                        <input
                            name="first_name"
                            value={form.first_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Last Name
                        <input
                            name="last_name"
                            value={form.last_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email
                        <input
                            name="email_addr"
                            type="email"
                            value={form.email_addr}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Address
                        <input
                            name="shipping_addr"
                            value={form.shipping_addr}
                            onChange={handleChange}
                            placeholder="123 Main St, City, State"
                        />
                    </label>

                    {error && <p className="modal-error">{error}</p>}

                    <div className="modal-buttons">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-save" disabled={saving}>
                            {saving ? 'Saving…' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}