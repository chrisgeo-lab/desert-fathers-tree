// === Desert Fathers Family Tree Script ===
// This script embeds all node and edge data directly for immediate display
// Nodes display an image, short bio, and link. Clicking a node opens an info panel.
// Companion relationships appear as dashed horizontal edges.

// =====================
// 1. DATA: NODES
// =====================
// Each node represents a monk. Fields:
// id: unique integer ID
// label: displayed name
// image: path to image file
// bio: short biography (shown in dropdown)
// link: URL to more info
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
    // Generations 2–8 (fictional/filler for demonstration)
    // -------------------
    // Add more nodes here following the same format
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
    { "id": 21, "label": "Hermit of Nitria III", "image": "images/anthony.png", "bio": "A wise desert elder.", "link": "#" },

    // Add nodes 22–50 here following the same pattern
    // ...
  ],

  // =====================
  // 2. DATA: EDGES
  // =====================
  // "from": node ID, "to": node ID
  // Add vertical "disciple" edges first (direct spiritual father → disciple)
  // Companion edges (dashed, horizontal) go after
  "edges": [
    // Vertical disciple edges
    { "from": 1, "to": 2 }, { "from": 1, "to": 3 }, { "from": 1, "to": 4 },
    { "from": 2, "to": 5 }, { "from": 2, "to": 6 }, { "from": 2, "to": 7 },
    { "from": 3, "to": 8 }, { "from": 4, "to": 9 }, { "from": 5, "to": 10 }, { "from": 6, "to": 11 },

    // Companion edges example (dashed)
    { "from": 2, "to": 3, "dashes": true, "arrows": "none", "color": { "color": "#777" } },
    { "from": 7, "to": 8, "dashes": true, "arrows": "none", "color": { "color": "#777" } }

    // Add more edges here as you add nodes
  ]
};

// =====================
// 3. VIS-NETWORK INITIALIZATION
// =====================

let network;
let nodesDataset = new vis.DataSet(data.nodes);
let edgesDataset = new vis.DataSet(data.edges);

const container = document.getElementById('tree-container');

const networkData = { nodes: nodesDataset, edges: edgesDataset };

const options = {
  layout: {
    hierarchical: {
      direction: 'UD',           // Top → Bottom
      sortMethod: 'directed',
      levelSeparation: 120,
      nodeSpacing: 200
    }
  },
  physics: false,               // Disable physics to fix tree structure
  nodes: {
    shape: 'circularImage',
    size: 40,
    borderWidth: 2,
    color: { border: '#8b6f47', background: '#f3eee4' },
    font: { face: 'Segoe UI', size: 14, color: '#333' }
  },
  edges: {
    arrows: { to: { enabled: true, scaleFactor: 0.5 } },
    color: { color: '#8b6f47' },
    smooth: { type: 'cubicBezier', roundness: 0.4 }
  }
};

network = new vis.Network(container, networkData, options);

// =====================
// 4. NODE CLICK INFO PANEL
// =====================
// Shows a floating panel below the cursor with node info
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
  panel.innerHTML = `
    <img src="${nodeData.image}" alt="${nodeData.label}">
    <h2>${nodeData.label}</h2>
    <p>${nodeData.bio}</p>
    <a href="${nodeData.link}" target="_blank">More info</a>
  `;
  panel.style.left = pointerDOM.x + 15 + 'px';
  panel.style.top = pointerDOM.y + 15 + 'px';
  panel.classList.remove('hidden');
}

function hideInfoPanel() {
  const panel = document.getElementById('info-panel');
  panel.classList.add('hidden');
}

// =====================
// 5. HOW TO ADD NEW NODES / EDGES
// =====================
// 1. Add a new node in the data.nodes array:
//    { "id": 51, "label": "New Monk", "image": "images/anthony.png", "bio": "Short bio.", "link": "#" }
// 2. Add an edge to connect it to a spiritual father or companion:
//    { "from": 50, "to": 51 }                // disciple
//    { "from": 20, "to": 51, "dashes": true } // companion
// 3. Save the file and refresh the page.
