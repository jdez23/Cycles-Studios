// src/app/(pages)/contact/page.jsx
'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.ENDPOINT;

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (status === 'Message sent successfully!') {
            const t = setTimeout(() => setStatus(''), 3000);
            return () => clearTimeout(t);
        }
    }, [status]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { name, email, message } = formData;
        if (!name || !email || !message) {
            setStatus('Please fill out all fields.');
            return;
        }
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const json = await res.json();
            if (res.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus(json.error || 'Failed to send message. Please try again.');
            }
        } catch {
            setStatus('An error occurred. Please try again later.');
        }
    };

    return (
        <main
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    backgroundColor: '#141414',
                    borderRadius: '16px',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '420px',
                    boxSizing: 'border-box',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                }}
            >
                <h1
                    style={{
                        fontFamily: 'Inked, cursive',
                        fontSize: '2.5rem',
                        color: '#fff',
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    Contact Us
                </h1>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        style={{
                            height: '3rem',
                            borderRadius: '8px',
                            backgroundColor: '#222',
                            padding: '0 1rem',
                            color: '#fff',
                            border: 'none',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                    />
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        style={{
                            height: '3rem',
                            borderRadius: '8px',
                            backgroundColor: '#222',
                            padding: '0 1rem',
                            color: '#fff',
                            border: 'none',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows={5}
                        style={{
                            borderRadius: '8px',
                            backgroundColor: '#222',
                            padding: '1rem',
                            color: '#fff',
                            border: 'none',
                            fontSize: '1rem',
                            outline: 'none',
                            resize: 'vertical',
                            lineHeight: 1.5,
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            height: '3rem',
                            borderRadius: '9999px',
                            backgroundImage: "url('gradient/gradient1.svg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: '#fff',
                            fontFamily: 'Inked, cursive',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Send Message
                    </button>
                </form>

                {status && (
                    <p
                        style={{
                            color: status.includes('successfully') ? '#22C55E' : '#f66',
                            textAlign: 'center',
                            marginTop: '1rem',
                            fontSize: '0.9rem',
                        }}
                    >
                        {status}
                    </p>
                )}
            </div>
        </main>
    );
}
