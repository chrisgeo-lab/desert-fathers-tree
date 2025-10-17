// js/panel.js

function showInfoPanel(node, panel, backdrop, isMobile, updateCallback) {
    panel.innerHTML = `
        <button id="close-info-panel" aria-label="Close Panel">×</button>
        <div class="panel-image-container">
            <img src="${node.image}" alt="${node.label}" class="panel-image">
        </div>
        <div class="panel-content">
            <h3>${node.label}</h3>
            <p>${node.bio}</p>
            ${node.link !== '#' ? `<a href="${node.link}" target="_blank">Learn more →</a>` : ''}
        </div>
    `;
    panel.classList.remove('hidden');

    if (isMobile && backdrop) {
        backdrop.classList.remove('hidden');
        backdrop.addEventListener('click', () => hideInfoPanel(panel, backdrop, isMobile), { once: true });
    } else {
        updateCallback();
    }

    document.getElementById('close-info-panel').addEventListener('click', () => hideInfoPanel(panel, backdrop, isMobile));
}

function hideInfoPanel(panel, backdrop, isMobile) {
    panel.classList.add('hidden');
    if (isMobile && backdrop) {
        backdrop.classList.add('hidden');
    }
}

function updatePanelPosition(network, panel, activeNodeId, isMobile) {
    if (isMobile || !activeNodeId) return;

    const pos = network.getPositions([activeNodeId])[activeNodeId];
    if (!pos) return;

    const canvasPos = network.canvasToDOM(pos);
    const panelWidth = panel.offsetWidth || 300;
    const viewportWidth = window.innerWidth;

    let leftPos = canvasPos.x + 25;
    if (leftPos + panelWidth > viewportWidth - 20) {
        leftPos = canvasPos.x - panelWidth - 25;
    }

    panel.style.left = `${Math.max(10, leftPos)}px`;
    panel.style.top = `${Math.max(10, canvasPos.y - 50)}px`;
}
