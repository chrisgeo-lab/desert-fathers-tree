// === Desert Fathers Family Tree Script (Updated with Scroll Pan + Zoom Buttons + Modern Nodes) ===
// Nodes now appear as modern horizontal rounded rectangles with the monk's name.
// Selected nodes are highlighted. Companion relationships remain dashed horizontal edges.
// Scroll up/down moves the tree. Pinch or zoom buttons (+/-) zoom in/out.

// =====================
// 1. DATA: NODES & EDGES
// =====================
const data = {
  "nodes": [
    // -------------------
    // Generation 1
    // -------------------
    { "id": 1, "label": "Anthony the Great", "image": "images/anthony.png", "bio": "Anthony (c. 251–356) is considered the father of monasticism. He lived as a hermit in the Egyptian desert and inspired countless disciples.", "link": "https://en.wikipedia.org/wiki/Anthony_the_Great" },
    { "id": 2, "label": "Macarius the Great", "image": "images/anthony.png", "bio": "Macarius of Egypt (c. 300–391) was a disciple of Anthony and founder of Scetis.", "link": "https://en.wikipedia.org/wiki/Macarius_of_Egypt" },
    { "id": 3, "label": "Macarius the Younger", "image": "images/anthony.png", "bio": "Macarius of Alexandria, known as 'the Younger', was a contemporary of Macarius the Great.", "link": "https://en.wikipedia.org/wiki/Macarius_of_Alexandria" },
    { "id": 4, "label": "Ammonas", "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 5, "label": "Paphnutius", "image": "images/anthony.png", "bio": "Paphnutius was a spiritual child of Macarius the Great.", "link": "https://orthodoxwiki.org/Paphnutius" },
    { "id": 6, "label": "Evagrius Ponticus", "image": "images/anthony.png", "bio": "Evagrius (c. 345–399) was a disciple of Macarius and a major spiritual writer.", "link": "https://en.wikipedia.org/wiki/Evagrius_Ponticus" },

    // -------------------
    // Generations 2–8 (fictional/filler)
    // -------------------
    { "id": 7, "label": "Disciple of Macarius I", "image": "images/anthony.png", "bio": "A devoted monk of Scetis.", "link": "#" },
    { "id": 8, "label": "Disciple of Macarius II", "image": "images/anthony.png", "bio": "Follower in the footsteps of Macarius.", "link": "#" },
    { "id": 9, "label": "Disciple of Ammonas I", "image": "images/anthony.png", "bio": "Early ascetic in the Nitrian desert.", "link": "#" },
    { "id": 10, "label": "Disciple of Paphnutius I", "image": "images/anthony.png", "bio": "Hermit living near Kellia.", "link": "#" },
    { "id": 11, "label": "Disciple of Evagrius I", "image": "images/anthony.png", "bio": "Student of Evagrius' teachings.", "link": "#" },
    { "id": 12, "label": "Hermit of Scetis I", "image": "images/anthony.png", "bio": "A humble hermit in Scetis.", "link": "#" },
    { "id": 13, "label": "Hermit of Scetis II", "image": "images/anthony.png", "bio": "Practiced silence and prayer.", "link": "#" },
    { "id": 14, "label": "Disciple of Disciple 7", "image": "images/anthony.png", "bio": "Continued the Macarian tradition.", "link": "#" },
    { "id": 15, "label": "Disciple of Disciple 8", "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 16, "label": "Hermit of Nitria I", "image": "images/anthony.png", "bio": "Lived in the Nitrian caves.", "link": "#" },
    { "id": 17, "label": "Disciple of Disciple 9", "image": "images/anthony.png", "bio": "Practitioner of unceasing prayer.", "link": "#" },
    { "id": 18, "label": "Disciple of Disciple 10", "image": "images/anthony.png", "bio": "Hermit near Lake Mareotis.", "link": "#" },
    { "id": 19, "label": "Disciple of Disciple 11", "image": "images/anthony.png", "bio": "Student of Evagrian thought.", "link": "#" },
    { "id": 20, "label": "Hermit of Nitria II", "image": "images/anthony.png", "bio": "Practiced solitude.", "link": "#" },
    { "id": 21, "label": "Hermit of Nitria III", "image": "images/anthony.png", "bio": "A wise desert elder.", "link": "#" }

    // ✍️ Continue adding nodes 22–50 here
  ],

  "edges": [
    // Vertical disciple edges
    { "from": 1, "to": 2 }, { "from": 1, "to": 3 }, { "from": 1, "to": 4 },
    { "from": 2, "to": 5 }, { "from": 2, "to": 6 }, { "from": 2, "to": 7 },
    { "from": 3, "to": 8 }, { "from": 4, "to": 9 }, { "from": 5, "to": 10 }, { "from": 6, "to": 11 },

    // Companion edges (dashed horizontal)
    { "from": 2, "to": 3, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 7, "to": 8, "dashes": true, "arrows": "none", "color": { "color": "#777" } }

    // ✍️ Add more edges as nodes are added
  ]
};

// =====================
// 2. VIS-NETWORK INITIALIZATION
// =====================
let nodesDataset = new vis.DataSet(data.nodes);
let edgesDataset = new vis.DataSet(data.edges);

const container = document.getElementById('tree-container');
const networkData = { nodes: nodesDataset, edges: edgesDataset };

// =====================
// 2a. NETWORK OPTIONS
// =====================
const options = {
  layout: {
    hierarchical: {
      direction: 'UD',
      sortMethod: 'directed',
      levelSeparation: 120,
      nodeSpacing: 200
    }
  },
  physics: false,  // Disable floating nodes; tree stays structured

  // =====================
  // NODE STYLE (MODERN RECTANGLES)
  // =====================
  nodes: {
    shape: 'box',                 // Horizontal rectangle
    color: {
      background: '#f3eee4',      // Default background
      border: '#8b6f47',          // Default border
      highlight: {
        background: '#f7f2e7',   // Highlight when selected
        border: '#d49c3f'
      },
      hover: {
        background: '#f7f2e7',   // Background when hovered
        border: '#d49c3f'
      }
    },
    font: {
      face: 'Segoe UI',
      size: 14,
      color: '#333'
    },
    margin: 10,                   // Padding inside the box
    widthConstraint: { maximum: 200 },
    heightConstraint: { minimum: 40 },
    borderWidth: 2,
    shapeProperties: {
      borderRadius: 10            // Rounded corners for modern style
    }
  },

  // =====================
  // EDGE STYLE
  // =====================
  edges: {
    arrows: { to: { enabled: true, scaleFactor: 0.5 } },
    color: { color: '#8b6f47' },
    smooth: { type: 'cubicBezier', roundness: 0.4 }
  },

  // =====================
  // INTERACTION
  // =====================
  interaction: {
    dragView: false,  // ❌ Disable drag to pan (we use scroll)
    zoomView: false,  // ❌ Disable scroll zoom
    hover: true
  }
};

const network = new vis.Network(container, networkData, options);

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
// 6. NODE CLICK INFO PANEL
// =====================
network.on('click', function (params) {
  if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    const nodeData = nodesDataset.get(nodeId);
    showInfoPanel(nodeData, params.pointer.DOM);
  } else {
    hideInfoPanel();
  }
});

function showInfoPanel(nodeData, pointerDOM) {
  const panel = document.getElementById('info-panel');
  
  // Step 1: Set the content
  panel.innerHTML = `
    <img src="${nodeData.image}" alt="${nodeData.label}">
    <h2>${nodeData.label}</h2>
    <p>${nodeData.bio}</p>
    <a href="${nodeData.link}" target="_blank">More info</a>
  `;

  // Step 2: Temporarily place offscreen to measure
  panel.style.left = '0px';
  panel.style.top = '0px';
  panel.classList.remove('hidden'); // make it visible so we can get dimensions

  const panelRect = panel.getBoundingClientRect();
  let panelWidth = panelRect.width;
  let panelHeight = panelRect.height;
  const padding = 10; // spacing from the node

  // Step 3: Determine default position (right and below node)
  let left = pointerDOM.x + padding;
  let top = pointerDOM.y + padding;

  // Step 4: Adjust horizontal position if overflowing right edge
  if (left + panelWidth > window.innerWidth) {
    left = pointerDOM.x - panelWidth - padding; // move to left of node
    // If still offscreen on left, clamp to 5px
    if (left < 5) left = 5;
  }

  // Step 5: Adjust vertical position if overflowing bottom edge
  if (top + panelHeight > window.innerHeight) {
    top = pointerDOM.y - panelHeight - padding; // move above node
    // If still offscreen on top, clamp to 5px
    if (top < 5) top = 5;
  }

  // Step 6: Mobile/small screen adjustment
  // If panel width exceeds 90% of screen width, shrink it
  const maxWidth = window.innerWidth * 0.9;
  if (panelWidth > maxWidth) {
    panel.style.width = `${maxWidth}px`;
    panelWidth = maxWidth;
  }
  // If panel height exceeds 90% of screen height, shrink it
  const maxHeight = window.innerHeight * 0.9;
  if (panelHeight > maxHeight) {
    panel.style.height = `${maxHeight}px`;
    panel.style.overflowY = 'auto'; // allow scrolling inside panel
    panelHeight = maxHeight;
  }

  // Step 7: Set final position
  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;
}


function hideInfoPanel() {
  const panel = document.getElementById('info-panel');
  panel.classList.add('hidden');
}

// =====================
// 7. COMMENTS: HOW TO ADD NEW NODES / EDGES
// =====================
// 1. Add a new node in data.nodes
//    { "id": 51, "label": "New Monk", "image": "images/anthony.png", "bio": "Short bio.", "link": "#" }
// 2. Add an edge connecting spiritual father or companion
//    { "from": X, "to": Y }                // disciple
//    { "from": X, "to": Y, "dashes": true } // companion
// 3. Save the file and refresh the page.
