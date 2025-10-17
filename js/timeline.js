// js/timeline.js

function setupTimeline(nodes) {
  const timelineContainer = document.getElementById('timeline-container');
  const events = nodes.get({
    filter: (item) => {
      // For now, let's just add everyone to the timeline
      return true;
    },
    order: 'level',
  });

  events.forEach((event) => {
    const eventElement = document.createElement('div');
    eventElement.className = 'timeline-event';
    eventElement.innerHTML = `
      <strong>${event.label}</strong>
      <p>Level: ${event.level}</p>
    `;
    timelineContainer.appendChild(eventElement);
  });
}
