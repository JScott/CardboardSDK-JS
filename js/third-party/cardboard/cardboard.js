function Cardboard(controls, element) {
  this.controls = controls;
  this.element = element;
  
  this.fullscreen = function() {
    var container = element.parentNode;

    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  };
  
  this.enable = function(e) {
    if (e && !e.alpha) { // TODO: what is this?
      return;
    }

    this.controls = new THREE.DeviceOrientationControls(camera, true);
    this.controls.connect();
    this.controls.update();

    this.element.addEventListener('click', this.fullscreen(), false);

    window.removeEventListener('deviceorientation', this.enable, true);
  }
}