// js/main.js

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|Windows Phone|tablet/i.test(navigator.userAgent);
}

document.addEventListener('DOMContentLoaded', function() {
    const IS_MOBILE = isMobileDevice();
    const BASE_PAGE_PATH = './';

    const LEVEL_SEPARATION = IS_MOBILE ? 250 : 250;
    const NODE_FONT_SIZE = IS_MOBILE ? 16 : 20;
    const NODE_MIN_WIDTH = IS_MOBILE ? 100 : 140;
    const BOUNDARY_PADDING = IS_MOBILE ? 100 : 300;
    const PAN_SPEED = IS_MOBILE ? 1.0 : 1.5;

    const MIN_ZOOM = 0.1;
    const MAX_ZOOM = 2.0;

    fetch('data/desert_fathers.json')
        .then(response => response.json())
        .then(data => {
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            data.nodes.forEach(node => {
                minX = Math.min(minX, node.x);
                maxX = Math.max(maxX, node.x);
                minY = Math.min(minY, node.y);
                maxY = Math.max(maxY, node.y);
                if (node.link && node.link.includes('BASE_PAGE_PATH')) {
                    node.link = node.link.replace('BASE_PAGE_PATH', BASE_PAGE_PATH);
                }
                node.y = node.level * LEVEL_SEPARATION;
                node.fixed = { x: true, y: true };
            });
            const limits = {
                x: [minX - BOUNDARY_PADDING, maxX + BOUNDARY_PADDING],
                y: [minY - BOUNDARY_PADDING, maxY + BOUNDARY_PADDING]
            };

            const options = createNetworkOptions(NODE_FONT_SIZE, NODE_MIN_WIDTH, limits);
            const network = initializeNetwork(data.nodes, data.edges, options);

            const panel = document.getElementById('info-panel');
            const backdrop = document.getElementById('panel-backdrop');
            let activeNodeId = null;

            const updatePanelPos = () => updatePanelPosition(network, panel, activeNodeId, IS_MOBILE);

            network.on('click', (params) => {
                if (params.nodes.length > 0) {
                    activeNodeId = params.nodes[0];
                    const node = network.body.data.nodes.get(activeNodeId);
                    showInfoPanel(node, panel, backdrop, IS_MOBILE, updatePanelPos);
                } else {
                    activeNodeId = null;
                    hideInfoPanel(panel, backdrop, IS_MOBILE);
                }
            });

            if (!IS_MOBILE) {
                network.on('zoom', updatePanelPos);
                network.on('viewChanged', updatePanelPos);
            }

            setupZoomControls(network, MIN_ZOOM, MAX_ZOOM);
            setupScrollAndPinch(document.getElementById('tree-container'), network, MIN_ZOOM, MAX_ZOOM, PAN_SPEED, updatePanelPos);
            setupSearch(network, network.body.data.nodes);
            setupTimeline(network.body.data.nodes);

            network.once('afterDrawing', () => {
                network.fit({ animation: { duration: 1000, easingFunction: 'easeInOutQuad' } });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
