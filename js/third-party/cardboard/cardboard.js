THREE.Cardboard = THREE.Cardboard || {};
_.extend(THREE.Cardboard, {
  renderer: null,
  camera: null,
  scene: null,
  
  init: function(options) {
    renderer = options.renderer;
    camera = options.camera;
    scene = options.scene;
    window.addEventListener('deviceorientation', THREE.Cardboard.setOrientationControls, true);
    window.addEventListener('resize', THREE.Cardboard.onResize, false);
  },
  
  setOrientationControls: function(event) {
    if (!event.alpha) { return; }
    controls = new THREE.DeviceOrientationControls(THREE.Cardboard.camera, true);
    controls.connect();
    controls.update();
    element.addEventListener('click', THREE.Cardboard.requestFullscreen, false);
    window.removeEventListener('deviceorientation', THREE.Cardboard.setOrientationControls);
  },
  
  requestFullscreen: function() {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  }
  
});
