    var camera, scene, renderer;
    var effect, controls;
    var element, container;

    var clock = new THREE.Clock();

    var cardboard = THREE.Cardboard;

    init();
    animate();

    function init() {
      renderer = new THREE.WebGLRenderer();
      element = renderer.domElement;
      container = document.getElementById('scene');
      container.appendChild(element);
      
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
      camera.position.set(0, 10, 0);
      scene.add(camera);

      cardboard.init({
        renderer: renderer,
        camera: camera,
        scene: scene
      });
      
      controls = new THREE.OrbitControls(camera, element);
      controls.rotateUp(Math.PI / 4);
      controls.target.set(
        camera.position.x + 0.1,
        camera.position.y,
        camera.position.z
      );
      controls.noZoom = true;
      controls.noPan = true;

      var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
      scene.add(light);

      var texture = THREE.ImageUtils.loadTexture(
        'textures/patterns/checker.png'
      );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat = new THREE.Vector2(50, 50);
      texture.anisotropy = renderer.getMaxAnisotropy();

      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture
      });

      var geometry = new THREE.PlaneGeometry(1000, 1000);

      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);

      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);
    }

    function update(deltaTime) {
      resize();
      controls.update(deltaTime);
      cardboard.update();
    }
    
    function render(deltaTime) {
      cardboard.render();
    }
    
    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;
      cardboard.resize(width, height)
    }

    function animate(time) {
      requestAnimationFrame(animate);
      update(clock.getDelta());
      render(clock.getDelta());
    }
