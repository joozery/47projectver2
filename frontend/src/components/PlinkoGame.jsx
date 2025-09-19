import React, { useState, useEffect, useRef } from 'react';

const PlinkoGame = () => {
    const canvasRef = useRef(null);
    const [points, setPoints] = useState(1000);
    const [betAmount, setBetAmount] = useState(5);
    const [balls, setBalls] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [multipliers, setMultipliers] = useState([1, 2, 1]);
    
    // Game constants
    const ROWS = 8;
    const PEG_RADIUS = 5;
    const BALL_RADIUS = 10;
    
    // Initialize game
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        setupBoard(ctx);
        gameLoop(ctx);
        
        return () => {
            // Cleanup
        };
    }, []);
    
    // Setup game board
    const setupBoard = (ctx) => {
        const pegs = [];
        const slots = [];
        
        // Create pegs
        for (let row = 0; row < ROWS; row++) {
            const pegsInRow = row + 1;
            const startX = (canvas.width - (pegsInRow - 1) * 40) / 2;
            
            for (let col = 0; col < pegsInRow; col++) {
                pegs.push({
                    x: startX + col * 40,
                    y: 100 + row * 40
                });
            }
        }
        
        // Create slots
        const slotWidth = canvas.width / multipliers.length;
        multipliers.forEach((multiplier, index) => {
            slots.push({
                x: index * slotWidth,
                y: canvas.height - 80,
                width: slotWidth,
                height: 60,
                multiplier: multiplier,
                color: {
                    bg: multiplier >= 2 ? '#2ecc71' : '#e74c3c',
                    text: '#fff'
                }
            });
        });
        
        // Store in component state or ref
        window.gamePegs = pegs;
        window.gameSlots = slots;
    };
    
    // Game loop
    const gameLoop = (ctx) => {
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw pegs
            window.gamePegs?.forEach(peg => {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(peg.x, peg.y, PEG_RADIUS, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Draw slots
            window.gameSlots?.forEach(slot => {
                ctx.fillStyle = slot.color.bg;
                ctx.fillRect(slot.x, slot.y, slot.width, slot.height);
                ctx.fillStyle = slot.color.text;
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${slot.multiplier}x`, slot.x + slot.width / 2, slot.y + slot.height / 2);
            });
            
            // Draw balls
            balls.forEach(ball => {
                if (ball.isActive) {
                    ctx.fillStyle = ball.color;
                    ctx.beginPath();
                    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            
            requestAnimationFrame(animate);
        };
        animate();
    };
    
    // Play game
    const handlePlay = async () => {
        if (betAmount > points) {
            alert('แต้มไม่เพียงพอ');
            return;
        }
        
        setIsPlaying(true);
        
        // Deduct points immediately
        setPoints(prev => prev - betAmount);
        
        // Create new ball
        const newBall = {
            id: Date.now(),
            x: canvas.width / 2,
            y: 20,
            vx: (Math.random() - 0.5) * 0.5,
            vy: 0.8,
            gravity: 0.15,
            bounce: 0.6,
            friction: 0.995,
            color: 'yellow',
            isActive: true,
            hasLanded: false,
            betAmount: betAmount
        };
        
        setBalls(prev => [...prev, newBall]);
        
        // Send request to PHP backend
        try {
            const response = await fetch('/api/plinko_play.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bet: betAmount,
                    // Add any other required data
                })
            });
            
            const result = await response.json();
            
            if (result.ok) {
                // Update ball with server data
                setBalls(prev => prev.map(ball => 
                    ball.id === newBall.id 
                        ? { ...ball, path: result.path, winningIndex: result.slot_index }
                        : ball
                ));
                
                // Update multipliers if changed
                if (result.slots) {
                    setMultipliers(result.slots);
                }
            } else {
                // Refund points on error
                setPoints(prev => prev + betAmount);
                setBalls(prev => prev.filter(ball => ball.id !== newBall.id));
                alert('ผิดพลาด: ' + result.error);
            }
        } catch (error) {
            // Refund points on network error
            setPoints(prev => prev + betAmount);
            setBalls(prev => prev.filter(ball => ball.id !== newBall.id));
            alert('เชื่อมต่อผิดพลาด');
        }
        
        setIsPlaying(false);
    };
    
    return (
        <div className="plinko-container">
            <div className="plinko-header">
                <h1>Plinko</h1>
                <span className="badge">แต้มคงเหลือ: {points} P</span>
            </div>
            
            <div className="game-area">
                <div className="game-board">
                    <canvas 
                        ref={canvasRef}
                        width={500} 
                        height={550}
                        className="plinko-canvas"
                    />
                </div>
                
                <div className="controls">
                    <div className="form-group">
                        <label htmlFor="bet-input">เดิมพัน (แต้ม)</label>
                        <input 
                            id="bet-input"
                            type="number" 
                            min="1" 
                            step="1" 
                            value={betAmount}
                            onChange={(e) => setBetAmount(parseInt(e.target.value))}
                            required 
                        />
                    </div>
                    <button 
                        onClick={handlePlay}
                        disabled={isPlaying}
                        className="play-btn"
                    >
                        {isPlaying ? 'กำลังเล่น...' : `เล่น (${balls.length} ลูก)`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlinkoGame;

