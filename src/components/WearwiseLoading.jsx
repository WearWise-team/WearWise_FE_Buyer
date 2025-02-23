'use client';

import { useEffect } from 'react';

const WearwiseLoading = () => {
    useEffect(() => {
        const animateLetters = () => {
            const letters = document.querySelectorAll(".letter");
            
            letters.forEach((letter) => {
                letter.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
                letter.style.opacity = 1;
            });

            setTimeout(() => {
                letters.forEach((letter, index) => {
                    letter.style.transform = `translate(${index * 60 - 180}px, 0) rotate(0deg)`;
                });
            }, 2000);
        };

        const startLoop = () => {
            animateLetters();
            setInterval(() => {
                setTimeout(animateLetters, 2000);
            }, 4000);
        };

        startLoop();
    }, []);

    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'white', 
            zIndex: 9999 
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', fontSize: '40px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                <span className="letter" style={{ color: 'red', fontSize: '60px' }}>W</span>
                <span className="letter" style={{ color: 'black', fontSize: '50px' }}>E</span>
                <span className="letter" style={{ color: 'black', fontSize: '50px' }}>A</span>
                <span className="letter" style={{ color: 'black', fontSize: '50px' }}>R</span>
                <span className="letter" style={{ color: 'black', fontSize: '60px' }}>W</span>
                <span className="letter" style={{ color: 'black', fontSize: '50px' }}>I</span>
                <span className="letter" style={{ color: 'black', fontSize: '50px' }}>S</span>
                <span className="letter" style={{ color: 'black', fontSize: '50px' }}>E</span>
            </div>
        </div>
    );
};

export default WearwiseLoading;
