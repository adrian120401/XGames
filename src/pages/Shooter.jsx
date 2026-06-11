import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gameOverImage from "../assets/gameover.png";

const INITIAL_HEALTH = 3;
const PLAYER_WIDTH = 72;
const PLAYER_HEIGHT = 24;
const BULLET_WIDTH = 6;
const BULLET_HEIGHT = 18;
const ENEMY_MIN_SIZE = 34;
const ENEMY_MAX_SIZE = 58;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function resetGame(state, width, height) {
  state.width = width;
  state.height = height;
  state.playerX = width / 2;
  state.playerY = height - 74;
  state.bullets = [];
  state.enemies = [];
  state.particles = [];
  state.score = 0;
  state.health = INITIAL_HEALTH;
  state.wave = 1;
  state.gameOver = false;
  state.spawnTimer = 0;
  state.fireCooldown = 0;
  state.enemySpeed = 110;
  state.spawnDelay = 900;
  state.holdFire = false;
  state.pointerDown = false;
}

function spawnEnemy(state) {
  const size = ENEMY_MIN_SIZE + Math.random() * (ENEMY_MAX_SIZE - ENEMY_MIN_SIZE);
  const x = Math.random() * Math.max(0, state.width - size);
  const wobble = (Math.random() - 0.5) * 0.8;

  state.enemies.push({
    x,
    y: -size,
    w: size,
    h: size,
    speed: state.enemySpeed + Math.random() * 70,
    wobble,
    phase: Math.random() * Math.PI * 2,
  });
}

function spawnBurst(state, x, y, color) {
  for (let index = 0; index < 12; index += 1) {
    const angle = (Math.PI * 2 * index) / 12;
    const speed = 80 + Math.random() * 180;

    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.45 + Math.random() * 0.35,
      color,
    });
  }
}

function drawBackground(ctx, width, height, time) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#120b0a");
  gradient.addColorStop(0.55, "#1c1110");
  gradient.addColorStop(1, "#080505");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.strokeStyle = "#ff6d3c";
  ctx.lineWidth = 1;

  for (let y = 0; y < height; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y + ((time * 18) % 28));
    ctx.lineTo(width, y + ((time * 18) % 28));
    ctx.stroke();
  }

  ctx.globalAlpha = 0.08;
  for (let x = 0; x < width; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  ctx.restore();

  const glow = ctx.createRadialGradient(width / 2, height * 0.78, 10, width / 2, height * 0.78, width * 0.7);
  glow.addColorStop(0, "rgba(184, 65, 45, 0.24)");
  glow.addColorStop(0.45, "rgba(184, 65, 45, 0.08)");
  glow.addColorStop(1, "rgba(184, 65, 45, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
}

function drawHUD(ctx, state) {
  ctx.save();
  ctx.fillStyle = "rgba(255, 244, 232, 0.92)";
  ctx.font = "600 15px system-ui, sans-serif";
  ctx.fillText(`Score ${state.score}`, 18, 28);
  ctx.fillText(`Wave ${state.wave}`, 18, 50);

  for (let index = 0; index < INITIAL_HEALTH; index += 1) {
    ctx.fillStyle = index < state.health ? "#ff5a3d" : "rgba(255, 255, 255, 0.12)";
    ctx.beginPath();
    const x = state.width - 24 - index * 22;
    const y = 22;
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255, 244, 232, 0.78)";
  ctx.font = "500 13px system-ui, sans-serif";
  ctx.fillText("Move: A/D or arrows", 18, state.height - 34);
  ctx.fillText("Shoot: Space, click, or tap", 18, state.height - 16);

  ctx.textAlign = "right";
  ctx.fillText("R to restart", state.width - 18, state.height - 16);
  ctx.restore();
}

function drawGameOver(ctx, state, image) {
  ctx.save();
  if (image && image.complete && image.naturalWidth > 0) {
    ctx.drawImage(image, 0, 0, state.width, state.height);
  } else {
    ctx.fillStyle = "#120b0a";
    ctx.fillRect(0, 0, state.width, state.height);
  }

  const panelWidth = Math.min(360, state.width - 40);
  const panelHeight = 144;
  const panelX = (state.width - panelWidth) / 2;
  const panelY = state.height * 0.58 - panelHeight / 2;

  ctx.fillStyle = "rgba(12, 8, 7, 0.58)";
  ctx.strokeStyle = "rgba(255, 207, 134, 0.24)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(panelX, panelY, panelWidth, panelHeight, 20);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffcfbf";
  ctx.font = "800 40px system-ui, sans-serif";
  ctx.fillText("GAME OVER", state.width / 2, panelY + 48);

  ctx.fillStyle = "rgba(255, 244, 232, 0.9)";
  ctx.font = "500 17px system-ui, sans-serif";
  ctx.fillText(`Final score ${state.score}`, state.width / 2, panelY + 82);
  ctx.fillText("Press R to try again", state.width / 2, panelY + 112);
  ctx.restore();
}

function drawStartScreen(ctx, state) {
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.54)";
  ctx.fillRect(0, 0, state.width, state.height);

  ctx.textAlign = "center";
  ctx.fillStyle = "#fff0df";
  ctx.font = "800 42px system-ui, sans-serif";
  ctx.fillText("SHOOTER", state.width / 2, state.height / 2 - 64);

  ctx.fillStyle = "rgba(255, 244, 232, 0.86)";
  ctx.font = "500 18px system-ui, sans-serif";
  ctx.fillText("Pulsa Comenzar para iniciar", state.width / 2, state.height / 2 - 24);
  ctx.fillText("A/D o flechas para moverte, Space o click para disparar", state.width / 2, state.height / 2 + 6);
  ctx.fillText("R reinicia cuando estés jugando", state.width / 2, state.height / 2 + 34);
  ctx.restore();
}

export default function Shooter() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const gameRef = useRef(null);
  const gameOverImageRef = useRef(null);
  const keysRef = useRef(new Set());
  const animationFrameRef = useRef(0);
  const [started, setStarted] = useState(false);

  const startGame = () => {
    const gameState = gameRef.current;

    if (!gameState) {
      return;
    }

    gameState.started = true;
    setStarted(true);
    resetGame(gameState, gameState.width, gameState.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    const gameState = {
      width: 0,
      height: 0,
      playerX: 0,
      playerY: 0,
      bullets: [],
      enemies: [],
      particles: [],
      score: 0,
      health: INITIAL_HEALTH,
      wave: 1,
      gameOver: false,
      started: false,
      spawnTimer: 0,
      fireCooldown: 0,
      enemySpeed: 110,
      spawnDelay: 900,
      holdFire: false,
      pointerDown: false,
    };

    gameRef.current = gameState;

    const gameOverImageElement = new Image();
    gameOverImageElement.src = gameOverImage;
    gameOverImageRef.current = gameOverImageElement;

    const resizeCanvas = () => {
      const width = Math.max(320, Math.floor(wrapper.clientWidth));
      const height = Math.max(460, Math.min(Math.floor(window.innerHeight * 0.72), 760));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      resetGame(gameState, width, height);
    };

    const fireBullet = () => {
      if (gameState.gameOver || gameState.fireCooldown > 0 || !gameState.started) {
        return;
      }

      gameState.bullets.push({
        x: gameState.playerX - BULLET_WIDTH / 2,
        y: gameState.playerY - PLAYER_HEIGHT / 2 - BULLET_HEIGHT,
        w: BULLET_WIDTH,
        h: BULLET_HEIGHT,
        speed: 940,
      });
      gameState.fireCooldown = 165;
    };

    const movePlayerFromPointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) * (canvas.width / rect.width);
      gameState.playerX = clamp(x, PLAYER_WIDTH / 2 + 12, gameState.width - PLAYER_WIDTH / 2 - 12);
    };

    const handleKeyDown = (event) => {
      keysRef.current.add(event.code);

      if (["ArrowLeft", "ArrowRight", "KeyA", "KeyD", "Space", "KeyR"].includes(event.code)) {
        event.preventDefault();
      }

      if (event.code === "Space") {
        if (!gameState.started) {
          return;
        }

        gameState.holdFire = true;
        fireBullet();
      }

      if (event.code === "KeyR") {
        if (!gameState.started) {
          return;
        }

        resetGame(gameState, gameState.width, gameState.height);
      }
    };

    const handleKeyUp = (event) => {
      keysRef.current.delete(event.code);

      if (event.code === "Space") {
        gameState.holdFire = false;
      }
    };

    const handlePointerDown = (event) => {
      if (!gameState.started) {
        return;
      }

      gameState.pointerDown = true;
      movePlayerFromPointer(event);
      fireBullet();
    };

    const handlePointerMove = (event) => {
      if (!gameState.pointerDown) {
        return;
      }

      movePlayerFromPointer(event);
    };

    const handlePointerUp = () => {
      gameState.pointerDown = false;
    };

    const update = (delta) => {
      const seconds = delta / 1000;
      const pressed = keysRef.current;

      if (!gameState.gameOver) {
        let movement = 0;
        if (pressed.has("ArrowLeft") || pressed.has("KeyA")) {
          movement -= 1;
        }
        if (pressed.has("ArrowRight") || pressed.has("KeyD")) {
          movement += 1;
        }

        gameState.playerX = clamp(
          gameState.playerX + movement * 420 * seconds,
          PLAYER_WIDTH / 2 + 12,
          gameState.width - PLAYER_WIDTH / 2 - 12,
        );

        if (gameState.holdFire) {
          fireBullet();
        }

        gameState.spawnTimer += delta;
        gameState.fireCooldown = Math.max(0, gameState.fireCooldown - delta);

        if (gameState.spawnTimer >= gameState.spawnDelay) {
          spawnEnemy(gameState);
          gameState.spawnTimer = 0;
          gameState.wave = 1 + Math.floor(gameState.score / 8);
          gameState.enemySpeed = 110 + gameState.wave * 10;
          gameState.spawnDelay = Math.max(420, 900 - gameState.wave * 36);
        }

        gameState.bullets = gameState.bullets.filter((bullet) => bullet.y + bullet.h > -40);
        gameState.enemies = gameState.enemies.filter((enemy) => enemy.y < gameState.height + 60);
        gameState.particles = gameState.particles.filter((particle) => particle.life > 0);

        for (const bullet of gameState.bullets) {
          bullet.y -= bullet.speed * seconds;
        }

        for (const enemy of gameState.enemies) {
          enemy.y += enemy.speed * seconds;
          enemy.x += Math.sin((gameState.score + enemy.phase + enemy.y / 60) * 0.8) * enemy.wobble * 14;
          enemy.x = clamp(enemy.x, 0, gameState.width - enemy.w);
        }

        for (const particle of gameState.particles) {
          particle.x += particle.vx * seconds;
          particle.y += particle.vy * seconds;
          particle.vy += 120 * seconds;
          particle.life -= seconds;
        }

        for (let bulletIndex = gameState.bullets.length - 1; bulletIndex >= 0; bulletIndex -= 1) {
          const bullet = gameState.bullets[bulletIndex];
          let hit = false;

          for (let enemyIndex = gameState.enemies.length - 1; enemyIndex >= 0; enemyIndex -= 1) {
            const enemy = gameState.enemies[enemyIndex];
            if (
              rectsOverlap(
                { x: bullet.x, y: bullet.y, w: bullet.w, h: bullet.h },
                { x: enemy.x, y: enemy.y, w: enemy.w, h: enemy.h },
              )
            ) {
              gameState.enemies.splice(enemyIndex, 1);
              gameState.bullets.splice(bulletIndex, 1);
              gameState.score += 1;
              gameState.wave = 1 + Math.floor(gameState.score / 8);
              spawnBurst(gameState, enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, "#ff6a47");
              hit = true;
              break;
            }
          }

          if (hit) {
            continue;
          }
        }

        for (let enemyIndex = gameState.enemies.length - 1; enemyIndex >= 0; enemyIndex -= 1) {
          const enemy = gameState.enemies[enemyIndex];
          if (enemy.y + enemy.h >= gameState.height - 78) {
            gameState.enemies.splice(enemyIndex, 1);
            gameState.health -= 1;
            spawnBurst(gameState, enemy.x + enemy.w / 2, gameState.height - 86, "#ffd2c4");
          }
        }

        if (gameState.health <= 0) {
          gameState.gameOver = true;
        }
      }
    };

    let lastTime = performance.now();

    const render = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (gameState.started) {
        update(delta);
      }
      drawBackground(context, gameState.width, gameState.height, time / 1000);

      const turretX = gameState.playerX;
      const turretY = gameState.playerY;

      for (const bullet of gameState.bullets) {
        context.save();
        context.fillStyle = "#ffcf86";
        context.shadowColor = "rgba(255, 207, 134, 0.85)";
        context.shadowBlur = 16;
        context.fillRect(bullet.x, bullet.y, bullet.w, bullet.h);
        context.restore();
      }

      for (const enemy of gameState.enemies) {
        context.save();
        context.translate(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2);
        context.fillStyle = "#3d0b12";
        context.shadowColor = "rgba(255, 74, 34, 0.55)";
        context.shadowBlur = 18;
        context.beginPath();
        context.arc(0, 0, enemy.w / 2, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = "#ff5f38";
        context.beginPath();
        context.arc(-enemy.w * 0.15, -enemy.h * 0.12, enemy.w * 0.08, 0, Math.PI * 2);
        context.arc(enemy.w * 0.15, -enemy.h * 0.12, enemy.w * 0.08, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = "rgba(255, 232, 214, 0.85)";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(-enemy.w * 0.14, enemy.h * 0.16);
        context.lineTo(0, enemy.h * 0.24);
        context.lineTo(enemy.w * 0.14, enemy.h * 0.16);
        context.stroke();
        context.restore();
      }

      for (const particle of gameState.particles) {
        context.save();
        context.globalAlpha = clamp(particle.life, 0, 1);
        context.fillStyle = particle.color;
        context.fillRect(particle.x, particle.y, 4, 4);
        context.restore();
      }

      context.save();
      context.translate(turretX, turretY);
      context.fillStyle = "#170d0d";
      context.fillRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT);
      context.strokeStyle = "#ff6d3c";
      context.lineWidth = 2;
      context.strokeRect(-PLAYER_WIDTH / 2, -PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT);
      context.fillStyle = "#ffcf86";
      context.fillRect(-10, -28, 20, 16);
      context.beginPath();
      context.moveTo(0, -28);
      context.lineTo(0, -52);
      context.stroke();
      context.restore();

      drawHUD(context, gameState);

      if (!gameState.started) {
        drawStartScreen(context, gameState);
      } else if (gameState.gameOver) {
        drawGameOver(context, gameState, gameOverImageRef.current);
      }

      animationFrameRef.current = window.requestAnimationFrame(render);
    };

    resizeCanvas();
    animationFrameRef.current = window.requestAnimationFrame(render);

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      gameRef.current = null;
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        color: "#f5efe6",
        background:
          "radial-gradient(circle at top, rgba(196, 68, 45, 0.28), transparent 34%), linear-gradient(180deg, #130d0b 0%, #1d1210 45%, #090606 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ margin: "8px 0 6px", fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.95 }}>
              Shooter
            </h1>
          </div>

          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              color: "#fff",
              textDecoration: "none",
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(10px)",
            }}
          >
            Volver
          </Link>
        </div>

        <section
          style={{
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            background: "rgba(12, 8, 7, 0.7)",
            boxShadow: "0 28px 80px rgba(0, 0, 0, 0.45)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              padding: "14px 18px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              color: "rgba(245, 239, 230, 0.78)",
              fontSize: "0.92rem",
            }}
          >
            <span>Mini shooter local</span>
          </div>

          <div ref={wrapperRef} style={{ width: "100%", background: "#000", position: "relative" }}>
            <canvas
              ref={canvasRef}
              aria-label="Mini juego estilo Doom"
              role="img"
              style={{
                width: "100%",
                height: "min(72vh, 760px)",
                display: "block",
                touchAction: "none",
                cursor: "crosshair",
              }}
            />

            {!started ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  padding: "20px",
                  background: "linear-gradient(180deg, rgba(9, 5, 5, 0.18), rgba(9, 5, 5, 0.55))",
                }}
              >
                <button
                  type="button"
                  onClick={startGame}
                  style={{
                    padding: "14px 28px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    background: "linear-gradient(180deg, rgba(255, 123, 86, 0.98), rgba(184, 65, 45, 0.98))",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "1rem",
                    letterSpacing: "0.02em",
                    boxShadow: "0 18px 40px rgba(184, 65, 45, 0.35)",
                    cursor: "pointer",
                  }}
                >
                  Comenzar
                </button>
              </div>
            ) : null}
          </div>

          <div
            style={{
              padding: "18px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              color: "rgba(245, 239, 230, 0.85)",
            }}
          >
            Usa A/D o flechas para moverte, dispara con Space o tocando la pantalla, y pulsa R para reiniciar.
          </div>
        </section>
      </div>
    </main>
  );
}
