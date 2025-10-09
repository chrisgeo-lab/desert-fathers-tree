// === Desert Fathers Family Tree Script (Updated with Scroll Pan + Zoom Buttons + Modern Nodes) ===
// Nodes now appear as modern horizontal rounded rectangles with the monk's name.
// Selected nodes are highlighted. Companion relationships remain dashed horizontal edges.
// Scroll up/down moves the tree. Pinch or zoom buttons (+/-) zoom in/out.

document.addEventListener('DOMContentLoaded', function() {

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
    { "id": 53, "label": "John", "level": 6, "image": "images/anthony.png", "bio": "Known for hospitality.", "link": "#" }
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
    { "from": 40, "to": 41, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 42, "to": 43, "dashes": true, "arrows": "none", "color": { "color": "#777" } }
  ]
};

// =====================
// 2. NETWORK SETUP
// =====================
const container = document.getElementById('tree-container');
const nodes = new vis.DataSet(data.nodes);
const edges = new vis.DataSet(data.edges);
const networkData = { nodes, edges };

const options = {
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'UD',
      sortMethod: 'directed',
      levelSeparation: 120,
      nodeSpacing: 180
    }
  },
  nodes: {
    shape: 'box',
    color: { background: '#f5f5f5', border: '#888' },
    font: { color: '#000', size: 14 },
    margin: 10,
    widthConstraint: { maximum: 160 },
    borderWidth: 2,
    shadow: true,
    shapeProperties: { borderRadius: 10 }
  },
  edges: {
    smooth: { type: 'cubicBezier', forceDirection: 'vertical' },
    color: { color: '#888' }
  },
  interaction: {
    dragNodes: true,
    dragView: true,
    zoomView: true,
    multiselect: false,
    navigationButtons: false
  },
  physics: { enabled: false }
};

const network = new vis.Network(container, networkData, options);

// =====================
// 3. INFO PANEL
// =====================
const panel = document.getElementById('info-panel');
let activeNodeId = null;

function showInfoPanel(node) {
  activeNodeId = node.id;
  panel.innerHTML = `
    <h3>${node.label}</h3>
    <p>${node.bio}</p>
    <a href="${node.link}" target="_blank">More info</a>
  `;
  panel.style.display = 'block';
  updatePanelPosition();
}

function hideInfoPanel() {
  panel.style.display = 'none';
  activeNodeId = null;
}

function updatePanelPosition() {
  if (!activeNodeId) return;
  const pos = network.getPositions([activeNodeId])[activeNodeId];
  const canvasPos = network.canvasToDOM(pos);
  panel.style.left = `${canvasPos.x + 20}px`;
  panel.style.top = `${canvasPos.y - 40}px`;
}

network.on('click', (params) => {
  if (params.nodes.length > 0) {
    showInfoPanel(nodes.get(params.nodes[0]));
  } else {
    hideInfoPanel();
  }
});

network.on('afterDrawing', updatePanelPosition);

// =====================
// 4. ZOOM BUTTONS
// =====================
document.getElementById('zoomIn').addEventListener('click', () => network.moveTo({ scale: network.getScale() * 1.2 }));
document.getElementById('zoomOut').addEventListener('click', () => network.moveTo({ scale: network.getScale() / 1.2 }));

// =====================
// 5. SCROLL + PINCH PAN
// =====================
let isCtrlPressed = false;
document.addEventListener('keydown', e => isCtrlPressed = e.ctrlKey);
document.addEventListener('keyup', e => isCtrlPressed = false);

container.addEventListener('wheel', (event) => {
  event.preventDefault();
  if (isCtrlPressed) {
    const factor = event.deltaY > 0 ? 0.9 : 1.1;
    network.moveTo({ scale: network.getScale() * factor });
  } else {
    network.moveBy({ x: -event.deltaX, y: -event.deltaY });
  }
}, { passive: false });
</script>

</body>
</html>
                          
