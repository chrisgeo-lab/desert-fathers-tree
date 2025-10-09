// === Desert Fathers Family Tree Script (Updated with Scroll Pan + Zoom Buttons + Modern Nodes) ===
// Nodes now appear as modern horizontal rounded rectangles with the monk's name.
// Selected nodes are highlighted. Companion relationships remain dashed horizontal edges.
// Scroll up/down moves the tree. Pinch or zoom buttons (+/-) zoom in/out.

// =====================
// 1. DATA: NODES & EDGES
// =====================
const data = {
  "nodes": [
    // ... (all your node objects remain unchanged)
  ],

  "edges": [
    // ... (all your edge objects remain unchanged)
  ]
};

// =====================
// 2. VIS-NETWORK INITIALIZATION
// =====================

// Compute max nodes per level to dynamically adjust spacing
const levelCounts = {};
data.nodes.forEach(node => {
  if (!levelCounts[node.level]) levelCounts[node.level] = 0;
  levelCounts[node.level]++;
});
const maxNodesInLevel = Math.max(...Object.values(levelCounts));
const dynamicNodeSpacing = Math.max(150, maxNodesInLevel * 20); // minimum 150

const options = {
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'UD',
      sortMethod: 'directed',
      levelSeparation: 200,
      nodeSpacing: dynamicNodeSpacing,
      parentCentralization: true,
      treeSpacing: 300
    }
  },

  physics: { enabled: false },  // prevent layout drift

  nodes: {
    shape: 'box',
    color: {
      background: '#f3eee4',
      border: '#8b6f47',
      highlight: { background: '#f7f2e7', border: '#d49c3f' },
      hover: { background: '#f7f2e7', border: '#d49c3f' }
    },
    font: { face: 'Segoe UI', size: 14, color: '#333' },
    margin: 10,
    widthConstraint: { maximum: 200 },
    heightConstraint: { minimum: 40 },
    borderWidth: 2,
    shapeProperties: { borderRadius: 10 }
  },

  edges: {
    arrows: { to: { enabled: true, scaleFactor: 0.5 } },
    color: { color: '#8b6f47' },
    smooth: { type: 'cubicBezier', roundness: 0.4 }
  },

  interaction: {
    dragView: false,  // disable default drag to pan (we use scroll)
    zoomView: false,  // disable default scroll zoom
    hover: true
  }
};

// =====================
// 2b. INITIALIZE NETWORK
// =====================
let nodesDataset = new vis.DataSet(data.nodes);
let edgesDataset = new vis.DataSet(data.edges);
const container = document.getElementById('tree-container');
const networkData = { nodes: nodesDataset, edges: edgesDataset };

const network = new vis.Network(container, networkData, options);

// Fit network on load
network.once('stabilizationIterationsDone', () => {
  network.fit({ animation: { duration: 800, easingFunction: 'easeInOutQuad' } });
});

// =====================
// 3. SCROLL TO PAN
// =====================
container.addEventListener('wheel', (event) => {
  if (event.ctrlKey) return; // pinch zoom handled separately
  event.preventDefault();

  const currentView = network.getViewPosition();
  const scale = network.getScale();
  const panSpeed = 1 / scale;
  const deltaX = event.deltaX * panSpeed;
  const deltaY = event.deltaY * panSpeed;

  network.moveTo({
    position: { x: currentView.x + deltaX, y: currentView.y + deltaY },
    scale: scale,
    animation: false
  });
}, { passive: false });

// =====================
// 4. PINCH ZOOM (TRACKPAD / TOUCH)
// =====================
container.addEventListener('wheel', (event) => {
  if (!event.ctrlKey) return; 
  event.preventDefault();
  const scale = network.getScale();
  const zoomFactor = Math.exp(-event.deltaY / 500);
  network.moveTo({ scale: scale * zoomFactor });
}, { passive: false });

// =====================
// 5. ZOOM BUTTONS
// =====================
const zoomControls = document.createElement('div');
zoomControls.style.position = 'fixed';
zoomControls.style.top = '20px';
zoomControls.style.right = '20px';
zoomControls.style.display = 'flex';
zoomControls.style.flexDirection = 'column';
zoomControls.style.gap = '5px';
zoomControls.style.zIndex = '1000';

const btnIn = document.createElement('button');
btnIn.textContent = '+';
const btnOut = document.createElement('button');
btnOut.textContent = '−';

[btnIn, btnOut].forEach(btn => {
  btn.style.width = '35px';
  btn.style.height = '35px';
  btn.style.fontSize = '20px';
  btn.style.cursor = 'pointer';
});

zoomControls.appendChild(btnIn);
zoomControls.appendChild(btnOut);
document.body.appendChild(zoomControls);

btnIn.addEventListener('click', () => {
  const scale = network.getScale();
  network.moveTo({ scale: scale * 1.2 });
});

btnOut.addEventListener('click', () => {
  const scale = network.getScale();
  network.moveTo({ scale: scale / 1.2 });
});

// =====================
// 6. NODE CLICK INFO PANEL (Updated to Anchor to Node + Fade + Auto-Reposition)
// =====================
let activeNodeId = null;

network.on('click', function (params) {
  if (params.nodes.length > 0) {
    activeNodeId = params.nodes[0];
    const nodeData = nodesDataset.get(activeNodeId);
    showInfoPanel(nodeData, activeNodeId);
  } else {
    activeNodeId = null;
    hideInfoPanel();
  }
});

function showInfoPanel(nodeData, nodeId) {
  const panel = document.getElementById('info-panel');

  panel.innerHTML = `
    <img src="${nodeData.image}" alt="${nodeData.label}">
    <h2>${nodeData.label}</h2>
    <p>${nodeData.bio}</p>
    <a href="${nodeData.link}" target="_blank">More info</a>
  `;

  panel.style.opacity = '0';
  panel.style.transition = 'opacity 0.25s ease';
  panel.style.display = 'block';
  panel.style.position = 'absolute';
  panel.style.maxWidth = '300px';
  panel.style.maxHeight = '80vh';
  panel.style.overflowY = 'auto';
  panel.style.zIndex = '1000';
  panel.style.padding = '10px';
  panel.style.background = '#f3eee4';
  panel.style.border = '2px solid #8b6f47';
  panel.style.borderRadius = '12px';
  panel.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';

  const buffer = 15;

  function updatePanelPosition() {
    if (!activeNodeId) return;
    const nodePos = network.getPositions([nodeId])[nodeId];
    const domPos = network.canvasToDOM(nodePos);
    const panelRect = panel.getBoundingClientRect();
    const panelWidth = panelRect.width;
    const panelHeight = panelRect.height;

    let left, top;
    const isMobile = window.innerWidth < 500;

    if (isMobile) {
      left = Math.min(Math.max(domPos.x - panelWidth / 2, 5), window.innerWidth - panelWidth - 5);
    } else {
      if (domPos.x + buffer + panelWidth < window.innerWidth) {
        left = domPos.x + buffer;
      } else {
        left = domPos.x - panelWidth - buffer;
        if (left < 5) left = 5;
      }
    }

    top = domPos.y - panelHeight / 2;
    if (top < 5) top = 5;
    if (top + panelHeight > window.innerHeight - 5) {
      top = window.innerHeight - panelHeight - 5;
    }

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }

  updatePanelPosition();

  requestAnimationFrame(() => {
    panel.style.opacity = '1';
  });

  network.on('afterDrawing', updatePanelPosition);
}

function hideInfoPanel() {
  const panel = document.getElementById('info-panel');
  panel.style.display = 'none';
  panel.style.opacity = '0';
  activeNodeId = null;
}

// =====================
// 7. COMMENTS: HOW TO ADD NEW NODES / EDGES
// =====================
// 1. Add a new node in data.nodes
// 2. Add an edge connecting spiritual father or companion
// 3. Save the file and refresh the page.
