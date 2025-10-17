// === Desert Fathers Family Tree Script  ===
// Fixed: Missing node references, improved centering, better panel positioning, fixed node ordering

// Function to detect if the user agent string indicates a mobile device
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|Windows Phone|tablet/i.test(navigator.userAgent);
}

// Global constant to be used throughout the script
const IS_MOBILE = isMobileDevice();

// NEW: Define the base path for your custom webpages
const BASE_PAGE_PATH = './'; // Links from index.html are relative to the root

// Enable pinch to zoom on mobile devices
let initialPinchDistance = null;
let initialScale = null;

// NEW: Store the screen position of the pinch start to calculate the center point
let initialPinchCenter = null; 

document.addEventListener('DOMContentLoaded', function() {

  // ======================================
  // DEVICE-SPECIFIC VIS.JS CONSTANTS
  // ======================================
  const LEVEL_SEPARATION = IS_MOBILE ? 250 : 250; // Tighter vertical spacing on mobile
  const NODE_FONT_SIZE = IS_MOBILE ? 16 : 20;
  const NODE_MIN_WIDTH = IS_MOBILE ? 100 : 140; // Smaller node size
  const BOUNDARY_PADDING = IS_MOBILE ? 100 : 300; // Tighter panning boundaries
  const PAN_SPEED = IS_MOBILE ? 1.0 : 1.5; // Adjusted pan sensitivity
  // ======================================

  // Zoom limits
  const MIN_ZOOM = 0.1;
  const MAX_ZOOM = 2.0;

  
  // =====================
  // 1. DATA: NODES & EDGES
  // =====================
  fetch('data/desert_fathers.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Calculate boundaries for panning
      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;

      data.nodes.forEach(node => {
        minX = Math.min(minX, node.x);
        maxX = Math.max(maxX, node.x);
        minY = Math.min(minY, node.y);
        maxY = Math.max(maxY, node.y);
        if (node.link && node.link.includes('BASE_PAGE_PATH')) {
          node.link = node.link.replace('BASE_PAGE_PATH', BASE_PAGE_PATH);
        }
      });

      minX -= BOUNDARY_PADDING;
      maxX += BOUNDARY_PADDING;
      minY -= BOUNDARY_PADDING;
      maxY += BOUNDARY_PADDING;

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
              border: '#8b7355',
              highlight: '#C88000'
            }
          },
          font: { color: '#333', size: NODE_FONT_SIZE, face: 'Georgia, serif' },
          margin: { top: 12, right: 15, bottom: 12, left: 15 },
          widthConstraint: { minimum: NODE_MIN_WIDTH, maximum: 180 },
          heightConstraint: { minimum: 40, maximum: 60 },
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
          color: { color: '#4A3B2F', highlight: '#C88000'},
          width: 3
        },
        interaction: {
          dragNodes: false,  // Don't drag individual nodes
          dragView: true,    // Enable mouse/touch drag panning
          zoomView: false,   // Disable vis-network's wheel handling
          multiselect: false,
          navigationButtons: false,
          hover: true,
          zoom: false
        },
         limits: {
          x: [minX, maxX],
          y: [minY, maxY]
        },
        physics: { enabled: false },
      };

      const network = new vis.Network(container, networkData, options);

      // =====================
      // 3. INFO PANEL
      // =====================
      const panel = document.getElementById('info-panel');
      const backdrop = document.getElementById('panel-backdrop');
      let activeNodeId = null;

      function showInfoPanel(node) {
        activeNodeId = node.id;
        panel.innerHTML = `
        <button id="close-info-panel" aria-label="Close Panel">×</button>
        <div class="panel-image-container">
              <img src="${node.image}" alt="${node.label}" class="panel-image">
          </div>
          <div class="panel-content">
            <h3>${node.label}</h3>
            <p>${node.bio}</p>
            ${node.link !== '#' ? `<a href="${node.link}">Learn more →</a>` : ''}
          </div>
        `;
        panel.classList.remove('hidden');
       // --- MOBILE OVERLAY LOGIC ---
          if (IS_MOBILE && backdrop) {
              backdrop.classList.remove('hidden'); // Show the backdrop
              // When the user clicks the backdrop, close the panel
              // Use { once: true } so the listener is automatically removed after one click
              backdrop.addEventListener('click', hideInfoPanel, { once: true });
          } else {
              // Desktop: Position near the node
              updatePanelPosition();
          }

      document.getElementById('close-info-panel').addEventListener('click', hideInfoPanel);
      }

      function hideInfoPanel() {
        panel.classList.add('hidden');
          // --- MOBILE OVERLAY LOGIC ---
          if (IS_MOBILE && backdrop) {
              backdrop.classList.add('hidden'); // Hide the backdrop
              // Clean up the event listener just in case {once: true} didn't catch it
              backdrop.removeEventListener('click', hideInfoPanel);
          }
        activeNodeId = null;
      }

      function updatePanelPosition() {
        // Only execute desktop positioning if we are NOT on mobile
        if (IS_MOBILE) return;

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

      // Update panel position when view changes (only necessary for desktop mode)
      if (!IS_MOBILE) {
          network.on('zoom', updatePanelPosition);
          network.on('viewChanged', updatePanelPosition);
      }

      // =====================
      // 4. ZOOM BUTTONS
      // =====================
      document.getElementById('zoomIn').addEventListener('click', () => {
        const currentScale = network.getScale();
        const newScale = Math.min(currentScale * 1.2, MAX_ZOOM);
        network.moveTo({ scale: newScale, animation: { duration: 300, easingFunction: 'easeInOutQuad' } });
      });

      document.getElementById('zoomOut').addEventListener('click', () => {
        const currentScale = network.getScale();
        const newScale = Math.max(currentScale / 1.2, MIN_ZOOM);
        network.moveTo({ scale: newScale, animation: { duration: 300, easingFunction: 'easeInOutQuad' } });
      });

      // =====================
      // 5. SCROLL + PINCH ZOOM
      // =====================

      container.addEventListener('wheel', (event) => {
        event.preventDefault();

        const currentScale = network.getScale();

        if (event.ctrlKey || event.metaKey) { // Added metaKey for Mac pinch-zoom
          // Pinch-to-zoom with limits
          const zoomSpeed = 0.01;
          const delta = -event.deltaY;
          let newScale = currentScale * (1 + delta * zoomSpeed);

          // Enforce zoom limits
          newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newScale));

          const containerRect = container.getBoundingClientRect();

          // 1. Get the DOM position of the cursor
          const cursorDOM = {
            x: event.clientX - containerRect.left,
            y: event.clientY - containerRect.top
          };

          // 2. Convert cursor DOM position to World (Canvas) position
          const cursorWorld = network.DOMtoCanvas(cursorDOM);

          // 3. Calculate the new center of the view
          const viewCenter = network.getViewPosition();
          const newPosition = {
            x: cursorWorld.x - (cursorWorld.x - viewCenter.x) * (currentScale / newScale),
            y: cursorWorld.y - (cursorWorld.y - viewCenter.y) * (currentScale / newScale)
          };

          network.moveTo({
            position: newPosition,
            scale: newScale,
            animation: false
          });
          updatePanelPosition();
          return;
        }

        // Regular scroll - PANNING ONLY
        const currentPos = network.getViewPosition();

        let newX = currentPos.x + (event.deltaX * PAN_SPEED / currentScale);
        let newY = currentPos.y + (event.deltaY * PAN_SPEED / currentScale);

        // Divide pan-speed deltas by the current scale.
        // This ensures the panning speed is consistent regardless of zoom level.

        //newX = Math.max(minX, Math.min(maxX, newX));
        //newY = Math.max(minY, Math.min(maxY, newY));

        network.moveTo({
          position: { x: newX, y: newY },
          animation: false
        });

        updatePanelPosition();
      }, { passive: false });

      // =====================
      // 6. MOBILE TOUCH ZOOM (Pinch-to-Zoom)
      // =====================

      container.addEventListener('touchstart', (event) => {
          // Only proceed if exactly two fingers are touching
          if (event.touches.length === 2) {
              event.preventDefault();

              // 1. Calculate the initial distance
              const dx = event.touches[0].clientX - event.touches[1].clientX;
              const dy = event.touches[0].clientY - event.touches[1].clientY;
              initialPinchDistance = Math.sqrt(dx * dx + dy * dy);

              // 2. Store the current network state
              initialScale = network.getScale();

              // 3. Calculate and store the initial pinch center (DOM coordinates on screen)
              const pinchCenterDOM = {
                  x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
                  y: (event.touches[0].clientY + event.touches[1].clientY) / 2
              };

              // 4. Convert pinch center to the vis.js world/canvas coordinates
              // This is the point we want the zoom to anchor around.
              const containerRect = container.getBoundingClientRect();
              const pinchCenterContainerDOM = {
                  x: pinchCenterDOM.x - containerRect.left,
                  y: pinchCenterDOM.y - containerRect.top
              };
              const pinchCenterWorld = network.DOMtoCanvas(pinchCenterContainerDOM);

              // Store all initial data needed for consistent zooming
              initialPinchCenter = {
                  world: pinchCenterWorld, // The fixed point in the graph we're zooming towards/away from
                  view: network.getViewPosition() // The view center at the start of the gesture
              };
          } else {
              // Reset if fewer or more than 2 touches
              initialPinchDistance = null;
              initialScale = null;
              initialPinchCenter = null;
          }
      }, { passive: false });


      container.addEventListener('touchmove', (event) => {
          // Check if we are currently in a valid pinch gesture
          if (initialPinchDistance !== null && initialPinchCenter !== null && event.touches.length === 2) {
              event.preventDefault();

              // Calculate the current distance between the two touches
              const dx = event.touches[0].clientX - event.touches[1].clientX;
              const dy = event.touches[0].clientY - event.touches[1].clientY;
              const currentPinchDistance = Math.sqrt(dx * dx + dy * dy);

              // Calculate the scale ratio
              const scaleRatio = currentPinchDistance / initialPinchDistance;

              // Determine the new scale
              let newScale = initialScale * scaleRatio;

              // Enforce zoom limits
              newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newScale));

              // Pull the initial center and view from the stored object
              const pinchWorld = initialPinchCenter.world;
              const initialViewCenter = initialPinchCenter.view;

              // Correct calculation for the new view center:
              // This formula ensures the world point (`pinchWorld`) remains under the finger center.
              const newPosition = {
                  x: pinchWorld.x - (pinchWorld.x - initialViewCenter.x) * (initialScale / newScale),
                  y: pinchWorld.y - (pinchWorld.y - initialViewCenter.y) * (initialScale / newScale)
              };

              network.moveTo({
                  position: newPosition,
                  scale: newScale,
                  animation: false
              });

              updatePanelPosition();
          }
      }, { passive: false });


      container.addEventListener('touchend', (event) => {
          // Reset state when touches end
          initialPinchDistance = null;
          initialScale = null;
          initialPinchCenter = null;

          updatePanelPosition();
      });
        
      // =====================
      // 7. INITIAL VIEW
      // =====================
      // Initial view is of the entire tree
      network.once('afterDrawing', () => {
        console.log('afterDrawing fired, IS_MOBILE:', IS_MOBILE);
        network.fit({
          animation: { duration: 1000, easingFunction: 'easeInOutQuad' }
        });
        console.log('fit() called, scale:', network.getScale());
      });
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
});
