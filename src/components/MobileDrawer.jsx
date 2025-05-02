// src/components/MobileDrawer.jsx
"use client";

import Link from "next/link";

export default function MobileDrawer({ isOpen, navItems, onClose }) {
    return (
        <div
            className={`fixed inset-0 bg-black/50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300`}
            onClick={onClose}
        >
            <div className="bg-white w-64 h-full p-4">
                <ul className="flex flex-col space-y-4 list-none">
                    {navItems.map(({ label, href }) => (
                        <li key={href}>
                            <Link href={href} className="block" onClick={onClose}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
