THREE.Cardboard = THREE.Cardboard || {};
_.extend(THREE.Cardboard, {
  init: function(options) {
    _.extend(THREE.Cardboard, options);
    this.effect = new THREE.StereoEffect(this.renderer);
    window.addEventListener('deviceorientation', this.setOrientationControls, true);
    window.addEventListener('resize', this.onResize, false);
  },
  
  resize: function(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  
    this.renderer.setSize(width, height);
    this.effect.setSize(width, height);
  },
  
  update: function() {
    this.camera.updateProjectionMatrix();
    //this.controls.update(deltaTime);
  },
  
  render: function() {
    this.effect.render(scene, camera);
  },
  
  setOrientationControls: function(event) {
    if (!event.alpha) { return; }
    this.controls = new THREE.DeviceOrientationControls(this.camera, true);
    this.controls.connect();
    this.controls.update();
    element.addEventListener('click', this.requestFullscreen, false);
    window.removeEventListener('deviceorientation', this.setOrientationControls);
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
