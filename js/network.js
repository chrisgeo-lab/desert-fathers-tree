// js/network.js

function createNetworkOptions(nodeFontSize, nodeMinWidth, limits) {
    return {
        layout: {
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
                    border: '#8b7355',
                    highlight: '#C88000'
                }
            },
            font: { color: '#333', size: nodeFontSize, face: 'Georgia, serif' },
            margin: { top: 12, right: 15, bottom: 12, left: 15 },
            widthConstraint: { minimum: nodeMinWidth, maximum: 180 },
            heightConstraint: { minimum: 40, maximum: 60 },
            borderWidth: 2,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 8, x: 2, y: 2 },
            shapeProperties: { borderRadius: 12 }
        },
        edges: {
            smooth: {
                type: 'cubicBezier',
                forceDirection: 'vertical',
                roundness: 0.5
            },
            color: { color: '#4A3B2F', highlight: '#C88000' },
            width: 3
        },
        interaction: {
            dragNodes: false,
            dragView: true,
            zoomView: false,
            multiselect: false,
            navigationButtons: false,
            hover: true,
            zoom: false
        },
        limits: limits,
        physics: { enabled: false },
    };
}


function initializeNetwork(nodes, edges, options) {
    const container = document.getElementById('tree-container');
    const networkData = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges)
    };
    const network = new vis.Network(container, networkData, options);
    return network;
}
