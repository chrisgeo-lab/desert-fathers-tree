// === Desert Fathers Family Tree Script (Debugged Version) ===
// Fixed: Missing node references, improved centering, better panel positioning, fixed node ordering

document.addEventListener('DOMContentLoaded', function() {

// Define the vertical separation distance between levels
const LEVEL_SEPARATION = 200; 

// =====================
// 1. DATA: NODES & EDGES
// =====================
const data = {
  "nodes": [
    // Generation 1 (level 0)
    { "id": 1, "label": "Anthony the Great", "level": 0, "x": 350, "image": "images/anthony.png", "bio": "Anthony (c. 251–356) is considered the father of monasticism. He lived as a hermit in the Egyptian desert and inspired countless disciples.", "link": "https://en.wikipedia.org/wiki/Anthony_the_Great" },
    { "id": 2, "label": "Palamon", "level": 0, "x": -1300, "image": "images/palamon.png", "bio": "Palamon was an early hermit and teacher who guided young monks in the desert.", "link": "#" },
    { "id": 3, "label": "Paul of Thebes", "level": 0, "x": 2000, "image": "images/paul.png", "bio": "Paul of Thebes (c. 227–341) is traditionally considered the first Christian hermit.", "link": "https://en.wikipedia.org/wiki/Paul_of_Thebes" },
    
    // Generation 2 (level 1)
    { "id": 4, "label": "Pachomius the Great", "level": 1, "x": -1350, "image": "images/pachomius.png", "bio": "Pachomius (c. 292–348) founded the first Christian cenobitic monastery and wrote the first monastic rule.", "link": "https://en.wikipedia.org/wiki/Pachomius_the_Great" },
    { "id": 6, "label": "Macarius the Younger", "level": 0.5, "x": -1050, "image": "images/macarius2.png", "bio": "Macarius of Alexandria, known as 'the Younger', was a contemporary of Macarius the Great.", "link": "https://en.wikipedia.org/wiki/Macarius_of_Alexandria" },
    { "id": 5, "label": "Macarius the Great", "level": 0.5, "x": -800, "image": "images/macarius.png", "bio": "Macarius of Egypt (c. 300–391) was a disciple of Anthony and founder of Scetis.", "link": "https://en.wikipedia.org/wiki/Macarius_of_Egypt" },
    { "id": 56, "label": "Thedore of Pherme", "level": 1.5, "x": -750, "image": "images/macarius.png", "bio": "Macarius of Egypt (c. 300–391) was a disciple of Anthony and founder of Scetis.", "link": "https://en.wikipedia.org/wiki/Macarius_of_Egypt" },
    { "id": 7, "label": "Ammonas", "level": 1, "x": 200, "image": "images/ammonas.png", "bio": "Ammonas was a disciple of Anthony who later became bishop of Scetis.", "link": "https://orthodoxwiki.org/Ammonas" },
    { "id": 12, "label": "Isidore", "level": 1, "x": -300, "image": "images/isidore.png", "bio": "Isidore was a hospitable monk and leader in the desert communities.", "link": "#" },
    { "id": 9, "label": "Athanasius the Great", "level": 1, "x": -50, "image": "images/athanasius.png", "bio": "Athanasius (c. 296–373) was bishop of Alexandria and biographer of Anthony.", "link": "https://en.wikipedia.org/wiki/Athanasius_of_Alexandria" },
    { "id": 8, "label": "Paphnutius of Thebes", "level": 1, "x": 700, "image": "images/paphnutius.png", "bio": "Paphnutius was a confessor and spiritual father to many desert monks.", "link": "https://orthodoxwiki.org/Paphnutius" },
    { "id": 10, "label": "Serapion the Great", "level": 1, "x": 450, "image": "images/serapion.png", "bio": "Serapion was known for his humility and travels among the desert fathers.", "link": "#" },
   // { "id": 14, "label": "Isaac of Fayoum", "level": 1, "x": 200, "image": "images/isaac.png", "bio": "Isaac was a spiritual father who emphasized stillness and contemplation.", "link": "#" },
    { "id": 11, "label": "Amoun", "level": 1, "x": 950, "image": "images/amoun.png", "bio": "Amoun (c. 295–356) founded the monastic community at Nitria.", "link": "https://en.wikipedia.org/wiki/Amoun" },
    { "id": 16, "label": "Paul the Simple", "level": 1, "x": 1200, "image": "images/paul-simple.png", "bio": "Paul the Simple was renowned for his childlike faith and obedience to Anthony.", "link": "#" },
    { "id": 15, "label": "Pambo", "level": 1, "x": 1450, "image": "images/pambo.png", "bio": "Pambo (c. 303–373) was known for his silence and profound spiritual wisdom.", "link": "https://en.wikipedia.org/wiki/Pambo" },
    { "id": 13, "label": "Chronius", "level": 1, "x": -550, "image": "images/chronius.png", "bio": "Chronius was known for his wisdom and teachings on prayer.", "link": "#" },

    // Generation 3 (level 2)
    { "id": 31, "label": "Melania the Elder", "level": 2, "x": -1450, "image": "images/melania.png", "bio": "Melania (c. 350–410) was a Roman noblewoman who became a desert ascetic.", "link": "https://en.wikipedia.org/wiki/Melania_the_Elder" },
    { "id": 18, "label": "Evagrius of Pontus", "level": 2, "x": -1250, "image": "images/evagrius.png", "bio": "Evagrius (c. 345–399) was a major spiritual writer and theologian of the desert.", "link": "https://en.wikipedia.org/wiki/Evagrius_Ponticus" },
    { "id": 19, "label": "Paphnutius the Ascetic", "level": 2, "x": -1050, "image": "images/paphnutius2.png", "bio": "Paphnutius the Ascetic was an early hermit in the Nitrian desert.", "link": "#" },
    { "id": 20, "label": "Onuphrius", "level": 2, "x": -850, "image": "images/onuphrius.png", "bio": "Onuphrius was a hermit who lived in complete solitude for sixty years.", "link": "https://en.wikipedia.org/wiki/Onuphrius" },
    { "id": 21, "label": "Moses the Black", "level": 2, "x": -450, "image": "images/moses.png", "bio": "Moses the Black (c. 330–405) was a reformed robber who became a great desert father.", "link": "https://en.wikipedia.org/wiki/Moses_the_Black" },
    { "id": 22, "label": "Bessarion the Great", "level": 2, "x": -250, "image": "images/bessarion.png", "bio": "Bessarion was known for his wandering life and miraculous works.", "link": "#" },
    { "id": 24, "label": "Joseph", "level": 2, "x": -50, "image": "images/joseph.png", "bio": "Joseph practiced silence and unceasing prayer in the desert.", "link": "#" },
    { "id": 25, "label": "Achilles", "level": 2, "x": 200, "image": "images/achilles.png", "bio": "Achilles continued the spiritual tradition of his teachers.", "link": "#" },
    { "id": 26, "label": "Or", "level": 2, "x": 450, "image": "images/or.png", "bio": "Or was renowned for his hospitality and kindness to visitors.", "link": "#" },
    { "id": 17, "label": "Theodore", "level": 2, "x": 800, "image": "images/theodore.png", "bio": "Theodore was a devoted monk and successor to Pachomius.", "link": "#" },
    { "id": 28, "label": "Paul of Tammah", "level": 2, "x": 1050, "image": "images/paul-tammah.png", "bio": "Paul of Tammah was a hermit known for his ascetic practices.", "link": "#" },
    { "id": 27, "label": "Pishoy", "level": 2, "x": 1300, "image": "images/pishoy.png", "bio": "Pishoy was a beloved monk who lived in the Scetis desert.", "link": "#" },
    { "id": 29, "label": "John the Short", "level": 2, "x": 1500, "image": "images/john-short.png", "bio": "John the Short (c. 339–405) was famous for his humility and obedience.", "link": "https://en.wikipedia.org/wiki/John_the_Dwarf" },
    { "id": 30, "label": "The Tall Brothers", "level": 2, "x": 1700, "image": "images/tall-brothers.png", "bio": "Four brothers known for their height and spiritual wisdom.", "link": "#" },
    { "id": 23, "label": "Isaac of the Cells", "level": 2.5, "x": -600, "image": "images/isaac-cells.png", "bio": "Isaac was a humble hermit known for his teachings on prayer.", "link": "#" },
    { "id": 55, "label": "Abraham", "level": 2.5, "x": -800, "image": "images/abraham.png", "bio": "Abraham continued the spiritual lineage with dedication.", "link": "#" },

    // Generation 4 (level 3)
    { "id": 34, "label": "John Cassian", "level": 3, "x": -1200, "image": "images/cassian.png", "bio": "John Cassian (c. 360–435) brought desert spirituality to the West.", "link": "https://en.wikipedia.org/wiki/John_Cassian" },
    { "id": 35, "label": "Germanus", "level": 3, "x": -950, "image": "images/germanus.png", "bio": "Germanus was Cassian's companion in the desert journeys.", "link": "#" },
    { "id": 36, "label": "Lot", "level": 3, "x": -600, "image": "images/lot.png", "bio": "Lot was a disciple known for his devotion to prayer.", "link": "#" },
    { "id": 37, "label": "Poemen the Great", "level": 3, "x": -400, "image": "images/poemen.png", "bio": "Poemen (c. 340–450) was one of the most quoted desert fathers.", "link": "https://en.wikipedia.org/wiki/Poemen" },
    { "id": 38, "label": "Anoub", "level": 3, "x": -200, "image": "images/anoub.png", "bio": "Anoub was a monk of Scetis known for his patience.", "link": "#" },
    { "id": 39, "label": "Paisius", "level": 3, "x": 0, "image": "images/paisius.png", "bio": "Paisius was a contemplative monk devoted to silence.", "link": "#" },
    { "id": 40, "label": "Isaiah", "level": 3, "x": 250, "image": "images/isaiah.png", "bio": "Isaiah of Scetis was an influential spiritual writer.", "link": "#" },
    { "id": 41, "label": "Sisoes the Great", "level": 3, "x": 500, "image": "images/sisoes.png", "bio": "Sisoes (d. 429) lived in Anthony's former cell and was known for humility.", "link": "#" },
    { "id": 42, "label": "Paul", "level": 3, "x": 700, "image": "images/paul-3.png", "bio": "Paul was a hermit who practiced extreme asceticism.", "link": "#" },
    { "id": 43, "label": "Athre", "level": 3, "x": 900, "image": "images/athre.png", "bio": "Athre was a monk known for his gentle spirit.", "link": "#" },
    { "id": 44, "label": "Arsenius the Great", "level": 3, "x": 1400, "image": "images/arsenius.png", "bio": "Arsenius (c. 350–445) left the imperial court to become a desert hermit.", "link": "https://en.wikipedia.org/wiki/Arsenius_the_Great" },

    // Generation 5 (level 4)
    { "id": 45, "label": "Peter the Pionite", "level": 4, "x": -700, "image": "images/peter.png", "bio": "Peter was a disciple known for his simplicity.", "link": "#" },
    { "id": 46, "label": "Agathon", "level": 4, "x": -500, "image": "images/agathon.png", "bio": "Agathon was famous for his control over his tongue.", "link": "#" },
    { "id": 54, "label": "Abraham", "level": 4, "x": 550, "image": "images/abraham.png", "bio": "Abraham continued the spiritual lineage with dedication.", "link": "#" },
    { "id": 47, "label": "Alexander", "level": 4, "x": 1100, "image": "images/alexander.png", "bio": "Alexander served Arsenius with great devotion.", "link": "#" },
    { "id": 48, "label": "Zoilus", "level": 4, "x": 1300, "image": "images/zoilus.png", "bio": "Zoilus was another faithful disciple of Arsenius.", "link": "#" },
    { "id": 49, "label": "Daniel", "level": 4, "x": 1500, "image": "images/daniel.png", "bio": "Daniel was Arsenius's closest disciple and successor.", "link": "#" },
    { "id": 50, "label": "Pharan", "level": 4, "x": 1700, "image": "images/pharan.png", "bio": "Pharan learned desert wisdom from Arsenius.", "link": "#" },

    // Generation 6 (level 5)
    { "id": 51, "label": "Abraham", "level": 5, "x": -450, "image": "images/abraham.png", "bio": "Abraham continued the spiritual lineage with dedication.", "link": "#" },
    { "id": 52, "label": "Ammoes", "level": 5, "x": 1450, "image": "images/ammoes.png", "bio": "Ammoes was a wise elder in the later desert generation.", "link": "#" },

    // Generation 7 (level 6)
    { "id": 53, "label": "John", "level": 6, "x": 1400, "image": "images/john.png", "bio": "John carried on the desert tradition into later centuries.", "link": "#" }
  ],

  "edges": [
    // Vertical disciple edges (teacher -> student relationships)
    { "from": 2, "to": 4 }, 
    { "from": 1, "to": 5 }, { "from": 1, "to": 7 }, { "from": 1, "to": 8 }, { "from": 1, "to": 9 }, { "from": 1, "to": 10 },
    { "from": 1, "to": 11 }, { "from": 1, "to": 12 }, { "from": 1, "to": 13 }, { "from": 1, "to": 15 },
    { "from": 1, "to": 16 }, 
    
    { "from": 11, "to": 17 }, { "from": 5, "to": 18 }, { "from": 6, "to": 18 }, { "from": 5, "to": 19 }, { "from": 5, "to": 21 },
    { "from": 12, "to": 21 }, { "from": 12, "to": 22 }, { "from": 13, "to": 23 }, { "from": 5, "to": 56 }, { "from": 56, "to": 23 },
    { "from": 15, "to": 27 }, { "from": 15, "to": 29 }, { "from": 15, "to": 30 }, 

    { "from": 18, "to": 34 }, { "from": 24, "to": 36 }, { "from": 24, "to": 37 }, { "from": 24, "to": 38 }, { "from": 24, "to": 39 },
    { "from": 25, "to": 40 }, { "from": 26, "to": 41 }, { "from": 26, "to": 42 }, { "from": 26, "to": 43 }, { "from": 29, "to": 44 },

    { "from": 36, "to": 45 }, { "from": 36, "to": 46 }, { "from": 37, "to": 46 }, { "from": 44, "to": 47 }, { "from": 44, "to": 48 },
    { "from": 44, "to": 49 }, { "from": 44, "to": 50 }, { "from": 41, "to": 54 },

    { "from": 46, "to": 51 }, { "from": 49, "to": 52 },

    { "from": 52, "to": 53 },
    
    // Companion edges (dashed horizontal for contemporaries)
    { "from": 5, "to": 6, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    { "from": 18, "to": 31, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    { "from": 19, "to": 20, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    // { "from": 23, "to": 30, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    { "from": 23, "to": 55, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    { "from": 27, "to": 28, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    { "from": 17, "to": 26, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    { "from": 34, "to": 35, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    { "from": 37, "to": 38, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    { "from": 38, "to": 39, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    { "from": 40, "to": 41, "dashes": true, "arrows": "none", "color": { "color": "#999" } },
    { "from": 42, "to": 43, "dashes": true, "arrows": "none", "color": { "color": "#999" } }
  ]
};

  // ======================================
// ✅ MANUAL X/Y ASSIGNMENT AND FIXING
// ======================================
data.nodes.forEach(node => {
    // Calculate manual Y position based on level
    node.y = node.level * LEVEL_SEPARATION; 
    
    // Explicitly lock BOTH X and Y positions
    node.fixed = { x: true, y: true };
});
  

// =====================
// 2. NETWORK SETUP
// =====================
const container = document.getElementById('tree-container');
const nodes = new vis.DataSet(data.nodes);
const edges = new vis.DataSet(data.edges);
const networkData = { nodes, edges };

const options = {
  layout: {
    // ✅ Disable hierarchical layout since we're using manual positions
    hierarchical: {
      enabled: false
    }
  },
  nodes: {
    shape: 'box',
    color: { 
      background: '#f5f5f5', 
      border: '#6b5d4f',
      highlight: {
        background: '#e3d9c6',
        border: '#8b7355'
      }
    },
    font: { color: '#333', size: 16, face: 'Georgia, serif' },
    margin: { top: 12, right: 15, bottom: 12, left: 15 },
    widthConstraint: { minimum: 140, maximum: 180 },
    borderWidth: 2,
    shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 8, x: 2, y: 2 },
    shapeProperties: { borderRadius: 12 }
    // fixed: { x: true, y: false }  --- REMOVED WHEN SET MANUAL Y COORDNINATES
  },
  edges: {
    smooth: { 
      type: 'cubicBezier', 
      forceDirection: 'vertical',
      roundness: 0.5 
    },
    color: { color: '#4A3B2F', highlight: '#6B5D4F' },
    width: 3
  },
  interaction: {
    dragNodes: true,
    dragView: false,
    zoomView: false,
    multiselect: false,
    navigationButtons: false,
    hover: true
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
    ${node.link !== '#' ? `<a href="${node.link}" target="_blank">Learn more →</a>` : ''}
  `;
  panel.classList.remove('hidden');
  updatePanelPosition();
}

function hideInfoPanel() {
  panel.classList.add('hidden');
  activeNodeId = null;
}

function updatePanelPosition() {
  if (!activeNodeId) return;
  const pos = network.getPositions([activeNodeId])[activeNodeId];
  if (!pos) return;
  
  const canvasPos = network.canvasToDOM(pos);
  const panelWidth = panel.offsetWidth || 300;
  const viewportWidth = window.innerWidth;
  
  // Position to the right of node, or left if too close to edge
  let leftPos = canvasPos.x + 25;
  if (leftPos + panelWidth > viewportWidth - 20) {
    leftPos = canvasPos.x - panelWidth - 25;
  }
  
  panel.style.left = `${Math.max(10, leftPos)}px`;
  panel.style.top = `${Math.max(10, canvasPos.y - 50)}px`;
}

network.on('click', (params) => {
  if (params.nodes.length > 0) {
    showInfoPanel(nodes.get(params.nodes[0]));
  } else {
    hideInfoPanel();
  }
});

// Update panel position when view changes
network.on('zoom', updatePanelPosition);
network.on('dragEnd', updatePanelPosition);

// =====================
// 4. ZOOM BUTTONS
// =====================
document.getElementById('zoomIn').addEventListener('click', () => {
  const currentScale = network.getScale();
  network.moveTo({ scale: currentScale * 1.2, animation: { duration: 300, easingFunction: 'easeInOutQuad' } });
});

document.getElementById('zoomOut').addEventListener('click', () => {
  const currentScale = network.getScale();
  network.moveTo({ scale: currentScale / 1.2, animation: { duration: 300, easingFunction: 'easeInOutQuad' } });
});

// =====================
// 5. SCROLL + PINCH ZOOM
// =====================
container.addEventListener('wheel', (event) => {
  event.preventDefault();
  
  // Check if this is a pinch gesture (ctrlKey is set during pinch on most browsers)
  if (event.ctrlKey) {
    // This is a pinch-to-zoom gesture - handle zoom
    const zoomSpeed = 0.002;
    const currentScale = network.getScale();
    const delta = -event.deltaY;
    const newScale = currentScale * (1 + delta * zoomSpeed);
    
    network.moveTo({
      scale: newScale,
      animation: false
    });
    updatePanelPosition();
    return;
  }
  
  // Regular scroll - pan both horizontally and vertically
  const panSpeed = 1.5;
  network.moveTo({
    position: {
      x: network.getViewPosition().x + (event.deltaX * panSpeed),
      y: network.getViewPosition().y + (event.deltaY * panSpeed)
    },
    animation: false
  });
  
  // Update panel position after panning
  updatePanelPosition();
}, { passive: false });

// =====================
// 6. INITIAL VIEW
// =====================
// Center on Anthony the Great initially
network.once('stabilizationIterationsDone', () => {
  network.focus(1, { scale: 0.8, animation: { duration: 1000, easingFunction: 'easeInOutQuad' } });
});

});
