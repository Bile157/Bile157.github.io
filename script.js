
window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {

   // This creates a basic Babylon Scene object (non-mesh)
   var scene = new BABYLON.Scene(engine);
   scene.clearColor = new BABYLON.Color4(0.941,0.019,0,0)

   // This creates and positions a free camera (non-mesh)
   var camera = new BABYLON.ArcRotateCamera("camera1", 1.14, 1.13, 10, BABYLON.Vector3.Zero(), scene);

   // This targets the camera to scene origin
   camera.setTarget(BABYLON.Vector3.Zero());

   // This attaches the camera to the canvas
   camera.attachControl(canvas, true);

   // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
   var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

   // Default intensity is 1. Let's dim the light a small amount
   light.intensity = 0.7;

   // Our built-in 'banana' shape. Params: name, subdivs, size, scene
   var banana = BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Bile171/BANANA/master/", "banana1.babylon", scene, function (newMeshes) {
   /*do something with the scene*/

     for(let i=0;i<newMeshes.length;i++){
       newMeshes[i].material = glass;
     }
   });

   var hdrTexture = new BABYLON.HDRCubeTexture("https://raw.githubusercontent.com/Bile171/BANANA/master/urban_alley_01_1k.hdr", scene, 512);

   var exposure = 0.6;
   var contrast = 1.6;
   var glass = new BABYLON.PBRMaterial("glass", scene);
   glass.reflectionTexture = hdrTexture;
   glass.refractionTexture = hdrTexture;
   glass.linkRefractionWithTransparency = true;
   glass.indexOfRefraction = 0.52;
   glass.alpha = 0;
   glass.cameraExposure = exposure;
   glass.cameraContrast = contrast;
   glass.microSurface = 1;
   glass.reflectivityColor = new BABYLON.Color3(0, 0, 1);
   glass.albedoColor = new BABYLON.Color3(0, 0, 1);
   banana.material = glass;

      return scene;
    }

    function setupCamera(scene){
      var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 10, -20), scene);
      camera.attachControl(canvas, true);
      //setup physics
      camera.applyGravity = true;
      camera.speed = .3;
      camera.angularSensibility = 4000;
      camera.ellipsoid = new BABYLON.Vector3(2, 2, 2);
      camera.checkCollisions = true;
      return camera
    }

    var scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });

});
