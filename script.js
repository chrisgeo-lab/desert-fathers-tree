// === Load data.json, initialize vis-network, handle dropdowns ===

// Global variables for network and data
let network;
let nodesDataset;
let edgesDataset;

// Fetch the data from data.json and initialize the tree
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    createTree(data.nodes, data.edges);
  })
  .catch(error => console.error('Error loading data.json:', error));

function createTree(nodes, edges) {
  nodesDataset = new vis.DataSet(nodes);
  edgesDataset = new vis.DataSet(edges);

  const container = document.getElementById('tree-container');

  const data = {
    nodes: nodesDataset,
    edges: edgesDataset
  };

  const options = {
    layout: {
      hierarchical: {
        direction: 'UD',
        sortMethod: 'directed',
        levelSeparation: 120,
        nodeSpacing: 200
      }
    },
    physics: false,
    nodes: {
      shape: 'circularImage',
      size: 40,
      borderWidth: 2,
      color: {
        border: '#8b6f47',
        background: '#f3eee4'
      },
      font: {
        face: 'Segoe UI',
        size: 14,
        color: '#333'
      }
    },
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 0.5 }
      },
      color: { color: '#8b6f47' },
      smooth: {
        type: 'cubicBezier',
        roundness: 0.4
      }
    }
  };

  network = new vis.Network(container, data, options);

  // === Node click event to show info panel ===
  network.on('click', function (params) {
    if (params.nodes.length > 0) {
      const nodeId = params.nodes[0];
      const nodeData = nodesDataset.get(nodeId);
      showInfoPanel(nodeData, params.pointer.DOM);
    } else {
      hideInfoPanel();
    }
  });
}

// === Show info panel (only one at a time) ===
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

// === Hide info panel ===
function hideInfoPanel() {
  const panel = document.getElementById('info-panel');
  panel.classList.add('hidden');
}
