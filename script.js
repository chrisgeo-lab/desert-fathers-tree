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
    { "id": 1, "label": "Anthony the Great", "level": 0, "image": "images/anthony.png", "bio": "Anthony (c. 251–356) is considered the father of monasticism. He lived as a hermit in the Egyptian desert and inspired countless disciples.", "link": "https://en.wikipedia.org/wiki/Anthony_the_Great" },
    { "id": 2, "label": "Palamon", "level": 0, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 3, "label": "Paul of Thebes", "level": 0, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    // -------------------
    // Generation 2
    // -------------------
    { "id": 4, "label": "Pachomius the Great", "level": 1, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 5, "label": "Macarius the Great", "level": 1, "image": "images/anthony.png", "bio": "Macarius of Egypt (c. 300–391) was a disciple of Anthony and founder of Scetis.", "link": "https://en.wikipedia.org/wiki/Macarius_of_Egypt" },
    { "id": 6, "label": "Macarius the Younger", "level": 1, "image": "images/anthony.png", "bio": "Macarius of Alexandria, known as 'the Younger', was a contemporary of Macarius the Great.", "link": "https://en.wikipedia.org/wiki/Macarius_of_Alexandria" },
    { "id": 7, "label": "Ammonas", "level": 1, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 8, "label": "Paphnutius of Thebes", "level": 1, "image": "images/anthony.png", "bio": "Paphnutius was a spiritual child of Macarius the Great.", "link": "https://orthodoxwiki.org/Paphnutius" },
    { "id": 9, "label": "Athanasius the Great", "level": 1, "image": "images/anthony.png", "bio": "Evagrius (c. 345–399) was a disciple of Macarius and a major spiritual writer.", "link": "https://en.wikipedia.org/wiki/Evagrius_Ponticus" },
    { "id": 10, "label": "Serapion the Great", "level": 1, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 11, "label": "Amoun", "level": 1, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 12, "label": "Isidore", "level": 1, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 13, "label": "Chronius", "level": 1, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 14, "label": "Isaac of Fayoum", "level": 1, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 15, "label": "Pambo", "level": 1, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 16, "label": "Paul the Simple", "level": 1, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    // -------------------
    // Generation 3
    // -------------------
    { "id": 17, "label": "Theodore", "level": 2, "image": "images/anthony.png", "bio": "A devoted monk of Scetis.", "link": "#" },
    { "id": 18, "label": "Evagrius of Pontus", "level": 2, "image": "images/anthony.png", "bio": "Follower in the footsteps of Macarius.", "link": "#" },
    { "id": 19, "label": "Paphnutius the Ascetic", "level": 2, "image": "images/anthony.png", "bio": "Early ascetic in the Nitrian desert.", "link": "#" },
    { "id": 20, "label": "Onuphrius", "level": 2, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 21, "label": "Moses the Black", "level": 2, "image": "images/anthony.png", "bio": "Hermit living near Kellia.", "link": "#" },
    { "id": 22, "label": "Bessarion the Great", "level": 2, "image": "images/anthony.png", "bio": "Student of Evagrius' teachings.", "link": "#" },
    { "id": 23, "label": "Isaac of the Cells", "level": 2, "image": "images/anthony.png", "bio": "A humble hermit in Scetis.", "link": "#" },
    { "id": 24, "label": "Joseph", "level": 2, "image": "images/anthony.png", "bio": "Practiced silence and prayer.", "link": "#" },
    { "id": 25, "label": "Achilles", "level": 2, "image": "images/anthony.png", "bio": "Continued the Macarian tradition.", "link": "#" },
    { "id": 26, "label": "Or", "level": 2, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 27, "label": "Pishoy", "level": 2, "image": "images/anthony.png", "bio": "Lived in the Nitrian caves.", "link": "#" },
    { "id": 28, "label": "Paul of Tammah", "level": 2, "image": "images/anthony.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 29, "label": "John the Short", "level": 2, "image": "images/anthony.png", "bio": "Practitioner of unceasing prayer.", "link": "#" },
    { "id": 30, "label": "The Tall Brothers", "level": 2, "image": "images/anthony.png", "bio": "Hermit near Lake Mareotis.", "link": "#" },
    { "id": 31, "label": "Melania the Elder", "level": 2, "image": "images/anthony.png", "bio": "Student of Evagrian thought.", "link": "#" },

    // -------------------
    // Generation 4
    // -------------------

    { "id": 34, "label": "John Cassian", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 35, "label": "Germanus", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 36, "label": "Lot", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 37, "label": "Poemen the Great", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 38, "label": "Anoub", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 39, "label": "Paisius", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 40, "label": "Isaiah", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 41, "label": "Sisoes the Great", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 42, "label": "Paul", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 43, "label": "Athre", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 44, "label": "Arsenius the Great", "level": 3, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },

    // -------------------
    // Generation 5
    // -------------------

    { "id": 45, "label": "Peter the Pionite", "level": 4, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 46, "label": "Agathon", "level": 4, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 47, "label": "Alexander", "level": 4, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 48, "label": "Zoilus", "level": 4, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 49, "label": "Daniel", "level": 4, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 50, "label": "Pharan", "level": 4, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },

    // -------------------
    // Generation 6
    // -------------------

    { "id": 51, "label": "Abraham", "level": 5, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },
    { "id": 52, "label": "Ammoes", "level": 5, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },

    // -------------------
    // Generation 7
    // -------------------

    { "id": 53, "label": "John", "level": 6, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" },


  ],

  "edges": [
    // Vertical disciple edges
    { "from": 2, "to": 4 }, 
    { "from": 1, "to": 5 }, { "from": 1, "to": 7 }, { "from": 1, "to": 8 }, { "from": 1, "to": 9 }, { "from": 1, "to": 10 },
    { "from": 1, "to": 11 }, { "from": 1, "to": 12 }, { "from": 1, "to": 13 }, { "from": 1, "to": 14 }, { "from": 1, "to": 15 },
    { "from": 1, "to": 16 },
    
    { "from": 11, "to": 17 }, { "from": 5, "to": 18 }, { "from": 6, "to": 18 }, { "from": 5, "to": 19 }, { "from": 5, "to": 21 },
    { "from": 12, "to": 21 }, { "from": 12, "to": 22 }, { "from": 13, "to": 23 }, { "from": 14, "to": 24 }, { "from": 14, "to": 25 },
    { "from": 14, "to": 26 }, { "from": 15, "to": 27 }, { "from": 15, "to": 29 }, { "from": 15, "to": 30 },

    { "from": 18, "to": 34 }, { "from": 24, "to": 36 }, { "from": 24, "to": 37 }, { "from": 24, "to": 38 }, { "from": 24, "to": 39 },
    { "from": 25, "to": 40 }, { "from": 26, "to": 41 }, { "from": 26, "to": 42 }, { "from": 26, "to": 43 }, { "from": 29, "to": 44 },

    { "from": 36, "to": 45 }, { "from": 36, "to": 46 }, { "from": 37, "to": 46 }, { "from": 44, "to": 47 }, { "from": 44, "to": 48 },
    { "from": 44, "to": 49 }, { "from": 44, "to": 50 },

    { "from": 46, "to": 51 }, { "from": 49, "to": 52 },

    { "from": 52, "to": 53 },
    
    // Companion edges (dashed horizontal)
    { "from": 5, "to": 6, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 18, "to": 31, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 19, "to": 20, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 23, "to": 30, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 27, "to": 28, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 17, "to": 26, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 34, "to": 35, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 37, "to": 38, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 38, "to": 39, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 36, "to": 44, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 46, "to": 47, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 47, "to": 48, "dashes": true, "arrows": "none", "color": { "color": "#777" } }

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
    direction: 'UD',              // Top to bottom
    sortMethod: 'directed',
    levelSeparation: 120,
    nodeSpacing: 200,
    parentCentralization: true,   // ✅ ensure parents are centered
    treeSpacing: 250,             // Add extra spacing between sibling trees (optional tweak)
    shakeTowards: 'roots'         // Helps keep parent nodes centered over their children
      }
    },
  physics: false,  // (already there)
  configure: {
  filter: (option, path) => {
    // Hide vis.js UI but allow hierarchical tweaks internally
    if (path.indexOf('layout.hierarchical') !== -1) return true;
    return false;
      }
    },

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
network.fit({ animation: false });
network.setOptions({ layout: { hierarchical: { enabled: true } } });


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
let activeNodeId = null; // track which node's panel is showing

network.on('click', function (params) {
  if (params.nodes.length > 0) {
    // Node clicked: show info panel
    activeNodeId = params.nodes[0];
    const nodeData = nodesDataset.get(activeNodeId);
    showInfoPanel(nodeData, activeNodeId);
  } else {
    // Blank space clicked: hide panel
    activeNodeId = null;
    hideInfoPanel();
  }
});

// ----------------------------
// Show the info panel anchored to the node
// ----------------------------
function showInfoPanel(nodeData, nodeId) {
  const panel = document.getElementById('info-panel');

  // Set content
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

  const buffer = 15; // distance from node

  // ----------------------------
  // Function to update panel position based on node
  // ----------------------------
  function updatePanelPosition() {
    if (!activeNodeId) return;

    const nodePos = network.getPositions([nodeId])[nodeId]; // network coords
    const domPos = network.canvasToDOM(nodePos);            // convert to DOM coords
    const panelRect = panel.getBoundingClientRect();
    const panelWidth = panelRect.width;
    const panelHeight = panelRect.height;

    let left, top;

    const isMobile = window.innerWidth < 500;

    // Horizontal placement
    if (isMobile) {
      left = Math.min(Math.max(domPos.x - panelWidth / 2, 5), window.innerWidth - panelWidth - 5);
    } else {
      if (domPos.x + buffer + panelWidth < window.innerWidth) {
        left = domPos.x + buffer; // right side
      } else {
        left = domPos.x - panelWidth - buffer; // left side
        if (left < 5) left = 5;
      }
    }

    // Vertical placement
    top = domPos.y - panelHeight / 2;
    if (top < 5) top = 5;
    if (top + panelHeight > window.innerHeight - 5) {
      top = window.innerHeight - panelHeight - 5;
    }

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }

  // Initial placement
  updatePanelPosition();

  // Fade in
  requestAnimationFrame(() => {
    panel.style.opacity = '1';
  });

  // Update panel on network zoom/pan
  network.on('afterDrawing', updatePanelPosition);
}

// ----------------------------
// Hide panel function remains largely the same
// ----------------------------
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
//    { "id": 51, "label": "New Monk", "image": "images/anthony.png", "bio": "Short bio.", "link": "#" }
// 2. Add an edge connecting spiritual father or companion
//    { "from": X, "to": Y }                // disciple
//    { "from": X, "to": Y, "dashes": true } // companion
// 3. Save the file and refresh the page.
