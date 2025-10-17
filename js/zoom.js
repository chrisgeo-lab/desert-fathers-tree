// js/zoom.js

function setupZoomControls(network, minZoom, maxZoom) {
    document.getElementById('zoomIn').addEventListener('click', () => {
        const currentScale = network.getScale();
        const newScale = Math.min(currentScale * 1.2, maxZoom);
        network.moveTo({ scale: newScale, animation: { duration: 300, easingFunction: 'easeInOutQuad' } });
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        const currentScale = network.getScale();
        const newScale = Math.max(currentScale / 1.2, minZoom);
        network.moveTo({ scale: newScale, animation: { duration: 300, easingFunction: 'easeInOutQuad' } });
    });
}

function setupScrollAndPinch(container, network, minZoom, maxZoom, panSpeed, updatePanelCallback) {
    let initialPinchDistance = null;
    let initialScale = null;
    let initialPinchCenter = null;

    container.addEventListener('wheel', (event) => {
        event.preventDefault();
        const currentScale = network.getScale();

        if (event.ctrlKey || event.metaKey) {
            const zoomSpeed = 0.01;
            const delta = -event.deltaY;
            let newScale = currentScale * (1 + delta * zoomSpeed);
            newScale = Math.max(minZoom, Math.min(maxZoom, newScale));

            const containerRect = container.getBoundingClientRect();
            const cursorDOM = {
                x: event.clientX - containerRect.left,
                y: event.clientY - containerRect.top
            };
            const cursorWorld = network.DOMtoCanvas(cursorDOM);
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
            updatePanelCallback();
            return;
        }

        const currentPos = network.getViewPosition();
        let newX = currentPos.x + (event.deltaX * panSpeed / currentScale);
        let newY = currentPos.y + (event.deltaY * panSpeed / currentScale);
        network.moveTo({ position: { x: newX, y: newY }, animation: false });
        updatePanelCallback();
    }, { passive: false });

    container.addEventListener('touchstart', (event) => {
        if (event.touches.length === 2) {
            event.preventDefault();
            const dx = event.touches[0].clientX - event.touches[1].clientX;
            const dy = event.touches[0].clientY - event.touches[1].clientY;
            initialPinchDistance = Math.sqrt(dx * dx + dy * dy);
            initialScale = network.getScale();
            const pinchCenterDOM = {
                x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
                y: (event.touches[0].clientY + event.touches[1].clientY) / 2
            };
            const containerRect = container.getBoundingClientRect();
            const pinchCenterContainerDOM = {
                x: pinchCenterDOM.x - containerRect.left,
                y: pinchCenterDOM.y - containerRect.top
            };
            initialPinchCenter = {
                world: network.DOMtoCanvas(pinchCenterContainerDOM),
                view: network.getViewPosition()
            };
        } else {
            initialPinchDistance = null;
            initialScale = null;
            initialPinchCenter = null;
        }
    }, { passive: false });

    container.addEventListener('touchmove', (event) => {
        if (initialPinchDistance !== null && initialPinchCenter !== null && event.touches.length === 2) {
            event.preventDefault();
            const dx = event.touches[0].clientX - event.touches[1].clientX;
            const dy = event.touches[0].clientY - event.touches[1].clientY;
            const currentPinchDistance = Math.sqrt(dx * dx + dy * dy);
            const scaleRatio = currentPinchDistance / initialPinchDistance;
            let newScale = initialScale * scaleRatio;
            newScale = Math.max(minZoom, Math.min(maxZoom, newScale));

            const pinchWorld = initialPinchCenter.world;
            const initialViewCenter = initialPinchCenter.view;
            const newPosition = {
                x: pinchWorld.x - (pinchWorld.x - initialViewCenter.x) * (initialScale / newScale),
                y: pinchWorld.y - (pinchWorld.y - initialViewCenter.y) * (initialScale / newScale)
            };
            network.moveTo({
                position: newPosition,
                scale: newScale,
                animation: false
            });
            updatePanelCallback();
        }
    }, { passive: false });

    container.addEventListener('touchend', (event) => {
        initialPinchDistance = null;
        initialScale = null;
        initialPinchCenter = null;
        updatePanelCallback();
    });
}
