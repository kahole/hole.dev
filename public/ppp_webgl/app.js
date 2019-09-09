const SHADER = 1;
const DAE_MODEL = 2;

let RESOURCES = {
  // Shaders
  skyVertexShader: { path: "shaders/sky.vert", type: SHADER},
  skyFragmentShader: { path: "shaders/sky.frag", type: SHADER},
  earthVertexShader: { path: "shaders/earth.vert", type: SHADER},
  earthFragmentShader: { path: "shaders/earth.frag", type: SHADER},
  // Models
  treeModel1: { path: "models/tree1.dae", type: DAE_MODEL},
  treeModel2: { path: "models/tree2.dae", type: DAE_MODEL},
  houseModel: { path: "models/house.dae", type: DAE_MODEL}
};

function loadResource(loader, key, resource) {
  return new Promise((resolve, reject) => {
    loader.load(resource.path, (data) => {
      resolve([key, data, resource]);
    });
  });
}

async function loadResources(resources) {

  const loader = new THREE.FileLoader();
  const daeLoader = new THREE.ColladaLoader();
  let numResources = Object.keys(resources).length;

  const loadedResources = {};

  const loadArray = Object.keys(resources).map( k => {
    let r = resources[k];
    return loadResource(r.type == DAE_MODEL ? daeLoader : loader, k, r);
  });

  const loaded = await Promise.all(loadArray);
  
  loaded.forEach(([key, data, resource]) => {
    loadedResources[key] = {...resource, data};
  });

  return loadedResources;
}


function setupWebGL() {

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.shadowMap.enabled = true;
  document.body.appendChild( renderer.domElement );
  
  return [scene, renderer];
}

function setupCamera(renderer) {

  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2800 );
  const controls = new THREE.OrbitControls( camera, renderer.domElement );

  controls.autoRotate = true;
  controls.minPolarAngle = - Infinity; // radians
  controls.maxPolarAngle = Infinity; // radians

  controls.minDistance = 70.0;
  controls.maxDistance = 1000.0;

  camera.position.z = 130;
  camera.position.y = 2;
  
  return [camera, controls];
}

function setupLights(scene) {

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
  var hemLight = new THREE.HemisphereLight( 0xffffff, 0x608341, 0.6 );
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7);
  directionalLight.position.set( 1, 0.5, 1 );
  directionalLight.target.position.set( 0, 0, 0 );
  // directionalLight.castShadow = true;
  
  scene.add(hemLight);
  scene.add(ambientLight );
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  return [ambientLight, hemLight, directionalLight];
}

(async function main() {

  RESOURCES = await loadResources(RESOURCES);

  const [scene, renderer] = setupWebGL();
  const [camera, controls] = setupCamera(renderer);
  [ambientLight, hemLight, directionalLight] = setupLights(scene);

  let skyUniforms = {
    baseColor: {type: 'vec3', value: new THREE.Color(0x00BFFF)},
  };
  
  const skyMaterial = new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    vertexShader: RESOURCES.skyVertexShader.data,
    fragmentShader: RESOURCES.skyFragmentShader.data,
    side: THREE.BackSide
  });
  const skyMesh = new THREE.Mesh(new THREE.BoxGeometry(2000.0, 2000.0, 2000.0), skyMaterial);
  scene.add(skyMesh);
  
  
  const earthRadius = 50.0;
  const earthGeometry = new THREE.SphereGeometry( earthRadius, 64, 64 );

  let earthUniforms = THREE.UniformsUtils.merge(
    [THREE.UniformsLib['lights'],
     {
       grassBaseColor: {type: 'vec3', value: new THREE.Color(0x166b07)},
       time: {value: 19.0}
     }
    ]
  );

  let earthMaterial = new THREE.ShaderMaterial({
    uniforms: earthUniforms,
    lights: true,
    vertexShader: RESOURCES.earthVertexShader.data,
    fragmentShader: RESOURCES.earthFragmentShader.data
  });

  var earth = new THREE.Mesh( earthGeometry, earthMaterial);
  // earth.receiveShadow = true;
  scene.add( earth );

  // Other planets

  let mars = new THREE.Mesh(new THREE.SphereGeometry(50, 24, 24), new THREE.MeshPhongMaterial({color: 0xa1251b }));
  mars.position.set(900.0, 300.0, 800.0);
  scene.add(mars);

  let jupiter = new THREE.Mesh(new THREE.SphereGeometry(100, 24, 24), new THREE.MeshPhongMaterial({color: 0xa75502 }));
  jupiter.position.set(-900.0, 300.0, -900.0);
  scene.add(jupiter);

  
  let houseScene = RESOURCES.houseModel.data.scene;
  let houseComponents = [];
  
  houseScene.children.forEach( c => {
    c.geometry.computeVertexNormals();
    c.material.flatShading = false;
    c.position.z += 50.4;
    // c.castShadow = true;
    // c.receiveShadow = true;
    houseComponents.push(c);
  });
  scene.add(houseScene);


  // Trees

  let treeMesh = RESOURCES.treeModel1.data.scene.children[0];
  treeMesh.rotation.x = 0.0;
  treeMesh.scale.set(3.0, 3.0, 3.0);

  let treeMesh2 = RESOURCES.treeModel2.data.scene.children[0];
  treeMesh2.rotation.x = 0.0;
  treeMesh2.scale.set(2.0, 1.5, 2.0);

  // Generate array of random spherical coordinates
  let numSpherePoints = 145;
  let spherePoints = [];
  for (let i = 0; i < numSpherePoints; i++) {
    let theta = Math.random() * Math.PI * 2;
    let phi = Math.random() * Math.PI * 2;
    spherePoints.push([theta, phi]);
  }

  spherePoints.forEach(([theta, phi]) => {
    let fTreePosition = new THREE.Vector3();
    fTreePosition.z = earth.position.z + earthRadius * Math.cos(phi);
    fTreePosition.x = earth.position.x + earthRadius * Math.cos(theta) * Math.sin(phi);
    fTreePosition.y = earth.position.y + earthRadius * Math.sin(theta) * Math.sin(phi);

    let fTree = fTreePosition.y < (earth.position.y - earthRadius/2) ? treeMesh2.clone() : treeMesh.clone();
    fTree.position.copy(fTreePosition);
    
    let upVector = new THREE.Vector3(0.0, 1.0, 0.0);

    // const ray = new THREE.Ray(fTree.position, earth.position);
    // console.log(ray.direction);
    // ray.direction.normalize();
    let direction = new THREE.Vector3(fTree.position.x - earth.position.x,
                                      fTree.position.y - earth.position.y,
                                      fTree.position.z - earth.position.z);
    direction.normalize();
    let axis = (new THREE.Vector3()).crossVectors(upVector, direction).normalize();
    var angle = Math.acos(upVector.dot(direction));
    
    fTree.rotateOnAxis(axis, angle);
    scene.add(fTree);
  });

  function animate() {

    earthMaterial.needsUpdate = true;
    earthMaterial.uniforms.time.value = (Date.now() % 156706) / 10000.0;
    // earthMaterial.uniforms.time.value = 19.0;

    controls.update();

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  animate();
  
})();