// src/app/(pages)/privacy/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

export default function PrivacyPage() {
    const tabs = ['Privacy Policy', 'Terms of Service', 'EULA'];
    const fileMap = [
        '/legal/privacy-policy.html',
        '/legal/terms-of-service.html',
        '/legal/eula.html',
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [contents, setContents] = useState(['', '', '']);
    const [loaded, setLoaded] = useState(true);

    // 1) Preload all HTML once on mount
    useEffect(() => {
        Promise.all(fileMap.map(path => fetch(path).then(r => r.text()).catch(() => '<p>Failed to load.</p>')))
            .then(htmls => setContents(htmls));
    }, []);

    // 2) Trigger fade on tab change
    useEffect(() => {
        setLoaded(false);
        // tiny delay so fade-out shows before fade-in
        const id = setTimeout(() => setLoaded(true), 50);
        return () => clearTimeout(id);
    }, [activeIndex]);

    const handlers = useSwipeable({
        onSwipedLeft: () => setActiveIndex(i => Math.min(i + 1, tabs.length - 1)),
        onSwipedRight: () => setActiveIndex(i => Math.max(i - 1, 0)),
        trackMouse: true,
    });

    const NAVBAR_HEIGHT = '4rem';
    const tabWidthPercent = 100 / tabs.length;

    const styles = {
        main: {
            minHeight: '100vh',
            backgroundColor: '#000',
            paddingTop: NAVBAR_HEIGHT,
            display: 'flex',
            flexDirection: 'column',
        },
        tabBarWrapper: {
            position: 'sticky',
            top: NAVBAR_HEIGHT,
            background: 'transparent',
            zIndex: 50,
            borderBottom: '1px solid #333',
        },
        tabBarInner: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '900px',
            margin: '0 auto',
            gap: '2rem',
            padding: '0 1rem',
        },
        tabBtn: (isActive) => ({
            padding: '1rem 0',
            fontSize: '1rem',
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
            color: isActive ? '#22C55E' : '#AAA',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
        }),
        indicator: {
            position: 'absolute',
            bottom: 0,
            left: `${activeIndex * tabWidthPercent}%`,
            width: `${tabWidthPercent}%`,
            height: '2px',
            backgroundColor: '#22C55E',
            transition: 'left 0.3s ease',
        },
        content: {
            flex: 1,
            overflowY: 'auto',
            padding: '2rem 1rem',
            maxWidth: '900px',
            margin: '0 auto',
            color: 'white',
            transition: 'opacity 0.3s ease',
            opacity: loaded ? 1 : 0,
        },
    };

    return (
        <main {...handlers} style={styles.main}>
            {/* Tab bar */}
            <div style={styles.tabBarWrapper}>
                <div style={styles.tabBarInner}>
                    {tabs.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActiveIndex(i)}
                            style={styles.tabBtn(i === activeIndex)}
                        >
                            {tab}
                        </button>
                    ))}
                    <div style={styles.indicator} />
                </div>
            </div>

            {/* Content */}
            <div
                style={styles.content}
                dangerouslySetInnerHTML={{
                    __html: `
            <style>
              body { color: white; }
              h1,h2,h3,h4,h5,h6 { color: white; text-align: center; }
              p, li { color: white; line-height: 1.6; }
              ul { padding-left: 1.2rem; }
            </style>
            ${contents[activeIndex]}
          `,
                }}
            />
        </main>
    );
}
