// Obter canvas e contexto
const canvas = document.getElementById('monalisaCanvas');
const ctx = canvas.getContext('2d');

// Posição do mouse
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// Paleta de cores originais da Mona Lisa
const colors = {
    pele: '#D4A574',
    cabelo: '#5C4033',
    fundo: '#8B6F47',
    roupa: '#2C1810',
    olho: '#4A3728',
    branco: '#F5E6D3',
    sombra: '#A0826D',
    luz: '#E8D4C0'
};

// Rastrear movimento do mouse
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

// Função para desenhar o fundo (paisagem)
function drawBackground() {
    // Céu em tons quentes
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#7B9FA3');
    skyGradient.addColorStop(0.5, '#9BA8A3');
    skyGradient.addColorStop(1, '#8B8680');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Montanhas ao fundo
    ctx.fillStyle = '#6B5643';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.6);
    ctx.quadraticCurveTo(canvas.width * 0.25, canvas.height * 0.3, canvas.width * 0.5, canvas.height * 0.5);
    ctx.quadraticCurveTo(canvas.width * 0.75, canvas.height * 0.2, canvas.width, canvas.height * 0.4);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
}

// Função auxiliar para desenhar um olho com pupila móvel
function drawEye(eyeCenterX, eyeCenterY, eyeRadius, pupilRadius, targetX, targetY) {
    // Branco do olho
    ctx.fillStyle = colors.branco;
    ctx.beginPath();
    ctx.arc(eyeCenterX, eyeCenterY, eyeRadius, 0, Math.PI * 2);
    ctx.fill();

    // Sombra do olho
    ctx.strokeStyle = colors.sombra;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(eyeCenterX, eyeCenterY, eyeRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Cálculo da posição da pupila seguindo o mouse
    const angle = Math.atan2(targetY - eyeCenterY, targetX - eyeCenterX);
    const pupilDistance = eyeRadius - pupilRadius - 2;
    const pupilX = eyeCenterX + Math.cos(angle) * pupilDistance;
    const pupilY = eyeCenterY + Math.sin(angle) * pupilDistance;

    // Pupila
    ctx.fillStyle = colors.olho;
    ctx.beginPath();
    ctx.arc(pupilX, pupilY, pupilRadius, 0, Math.PI * 2);
    ctx.fill();

    // Brilho nos olhos (highlight)
    ctx.fillStyle = colors.branco;
    ctx.beginPath();
    ctx.arc(pupilX - 2, pupilY - 2, 2, 0, Math.PI * 2);
    ctx.fill();
}

// Função para desenhar os olhos com movimento
function drawEyes(eyeLeftX, eyeLeftY, eyeRightX, eyeRightY) {
    const eyeRadius = 12;
    const pupilRadius = 6;

    // Olho esquerdo
    drawEye(eyeLeftX, eyeLeftY, eyeRadius, pupilRadius, mouseX, mouseY);

    // Olho direito
    drawEye(eyeRightX, eyeRightY, eyeRadius, pupilRadius, mouseX, mouseY);
}

// Função para desenhar o rosto
function drawFace() {
    // Cabeça
    ctx.fillStyle = colors.pele;
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height * 0.35, 90, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sombra no rosto (modelagem)
    ctx.fillStyle = colors.sombra;
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2 + 40, canvas.height * 0.35, 50, 80, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Nariz
    ctx.fillStyle = colors.sombra;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height * 0.38);
    ctx.lineTo(canvas.width / 2 - 8, canvas.height * 0.48);
    ctx.lineTo(canvas.width / 2 + 4, canvas.height * 0.48);
    ctx.fill();

    // Boca - sorriso enigmático
    ctx.strokeStyle = colors.sombra;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.quadraticCurveTo(canvas.width / 2, canvas.height * 0.58, canvas.width / 2 + 25, canvas.height * 0.55);
    ctx.stroke();

    ctx.beginPath();
    ctx.quadraticCurveTo(canvas.width / 2, canvas.height * 0.58, canvas.width / 2 - 25, canvas.height * 0.55);
    ctx.stroke();

    // Olhos com movimento do mouse
    drawEyes(
        canvas.width / 2 - 20,
        canvas.height * 0.28,
        canvas.width / 2 + 20,
        canvas.height * 0.28
    );

    // Sobrancelhas
    ctx.strokeStyle = colors.cabelo;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    // Sobrancelha esquerda
    ctx.beginPath();
    ctx.quadraticCurveTo(canvas.width / 2 - 30, canvas.height * 0.22, canvas.width / 2 - 10, canvas.height * 0.2);
    ctx.stroke();

    // Sobrancelha direita
    ctx.beginPath();
    ctx.quadraticCurveTo(canvas.width / 2 + 10, canvas.height * 0.2, canvas.width / 2 + 30, canvas.height * 0.22);
    ctx.stroke();
}

// Função para desenhar o cabelo
function drawHair() {
    ctx.fillStyle = colors.cabelo;
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height * 0.2, 95, 70, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mechas de cabelo
    ctx.strokeStyle = colors.cabelo;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    for (let i = 0; i < 5; i++) {
        const angle = (Math.PI / 3) + (i * 0.2);
        const startX = canvas.width / 2 + 70 * Math.cos(angle);
        const startY = canvas.height * 0.2 + 50 * Math.sin(angle);
        const endX = startX + 30 * Math.cos(angle);
        const endY = startY + 30 * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
}

// Função para desenhar a roupa
function drawClothing() {
    ctx.fillStyle = colors.roupa;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 90, canvas.height * 0.45);
    ctx.lineTo(canvas.width / 2 - 100, canvas.height * 0.8);
    ctx.lineTo(canvas.width / 2 + 100, canvas.height * 0.8);
    ctx.lineTo(canvas.width / 2 + 90, canvas.height * 0.45);
    ctx.quadraticCurveTo(canvas.width / 2, canvas.height * 0.5, canvas.width / 2 - 90, canvas.height * 0.45);
    ctx.fill();

    // Detalhe de tecido
    ctx.strokeStyle = colors.sombra;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.quadraticCurveTo(
            canvas.width / 2 - 50 + i * 40,
            canvas.height * 0.6,
            canvas.width / 2 - 50 + i * 40,
            canvas.height * 0.8
        );
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

// Função para desenhar mãos
function drawHands() {
    // Mão esquerda
    ctx.fillStyle = colors.pele;
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2 - 85, canvas.height * 0.65, 20, 30, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Mão direita
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2 + 85, canvas.height * 0.65, 20, 30, -0.3, 0, Math.PI * 2);
    ctx.fill();
}

// Função para desenhar o pescoço
function drawNeck() {
    ctx.fillStyle = colors.pele;
    ctx.fillRect(canvas.width / 2 - 25, canvas.height * 0.43, 50, 25);
}

// Função principal de animação
function animate() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar camadas
    drawBackground();
    drawClothing();
    drawNeck();
    drawFace();
    drawHair();
    drawHands();

    // Continuar animação
    requestAnimationFrame(animate);
}

// Iniciar animação
animate();