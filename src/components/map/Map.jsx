import React, { useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AppContext } from '../../context/AppContext';

const Map = () => {
  const containerRef = useRef(null);
  const {data} = useContext(AppContext)

  useEffect(async () => {
    function convertTo3DCoordinates(latitude, longitude, radius) {
      var phi = ((90 - latitude) * Math.PI) / 180;
      var theta = ((longitude + 180) * Math.PI) / 180;

      var x = -radius * Math.sin(phi) * Math.cos(theta);
      var y = radius * Math.cos(phi);
      var z = radius * Math.sin(phi) * Math.sin(theta);

      return new THREE.Vector3(x, y, z);
    }

    class SatelliteObject {
      latitude = 0;
      longitude = 0;
      id = 0;
      selected = false;

      modelClone = this.createSatellite(new THREE.Vector3());
      paths = null;

      constructor(latitude, longitude, id, selected = false) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.id = id;
        this.selected = selected;

        this.update(this.latitude, this.longitude);

        // adding to scene
        group.add(this.modelClone);
      }

      update(latitude, longitude) {
        // convert lon and lat to coordinate
        let coordinate = convertTo3DCoordinates(latitude, longitude, 2.5);

        // setting position and rotation
        this.modelClone.position.set(coordinate.x, coordinate.y, coordinate.z);

        // Calculate the direction vector towards the origin
        var direction = new THREE.Vector3()
          .subVectors(scene.position, this.modelClone.position)
          .normalize();

        // Calculate the quaternion representing the rotation towards the origin
        var quaternion = new THREE.Quaternion().setFromUnitVectors(
          this.modelClone.up,
          direction
        );

        // Apply the rotation to the model scene
        this.modelClone.setRotationFromQuaternion(quaternion);

        // creating paths
        if (this.paths != null) {
          // delete the previous path
          lineCircleGroup.remove(this.paths[0]);
          lineCircleGroup.remove(this.paths[1]);

          // create the path again
          this.paths = this.createSatellitePath(coordinate, this.selected);
        } else {
          this.paths = this.createSatellitePath(coordinate, this.selected);
        }
      }

      createSatellitePath(coordinate, selected = false) {
        // Create the circular path
        const circleGeometry = new THREE.BufferGeometry().setFromPoints(
          new THREE.Path()
            .absarc(0, 0, 2.5, 0, Math.PI * 2, true)
            .getSpacedPoints(50)
        );

        // creating material
        let circleMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          opacity: 0.5,
          transparent: true,
        });
        if (selected)
          circleMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

        let quaternion = new THREE.Quaternion();
        quaternion = quaternion.setFromUnitVectors(
          new THREE.Vector3(1, 0, 0).normalize(),
          coordinate.clone().normalize()
        );
        circleGeometry.applyQuaternion(quaternion);
        const circle = new THREE.Line(circleGeometry, circleMaterial);

        // showing line
        const points = [];
        points.push(coordinate);
        points.push(new THREE.Vector3(0, 0, 0));

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const line = new THREE.Line(lineGeometry, material);

        // adding to scene
        lineCircleGroup.add(circle);
        lineCircleGroup.add(line);

        return [circle, line];
      }

      createSatellite(pos) {
        let modelClone = model.scene.clone();
        modelClone.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = child.material.clone();
          }
        });
        modelClone.name = 'satellite';
        modelClone.position.set(pos.x, pos.y, pos.z);
        modelClone.scale.set(0.02, 0.02, 0.02);

        return modelClone;
      }

      remove() {
        // removing all items
        group.remove(this.modelClone);
        if (this.paths != null) {
          group.remove(this.paths[0]);
          group.remove(this.paths[1]);
        }
      }
    }

    class App {
      renderer;
      camera;
      controls;
      modelLoader;
      raycaster;

      satelliteObjects = Array();
      container;

      constructor(container) {
        this.container = container;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
        this.renderer.useLegacyLights = false;
        container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(
          75,
          container.offsetWidth / container.offsetHeight,
          0.1,
          1000
        );
        this.controls = new OrbitControls(
          this.camera,
          this.renderer.domElement
        );
        this.controls.target.set(0, 0.5, 0);

        this.modelLoader = new GLTFLoader();

        this.raycaster = new THREE.Raycaster();

        var ambientLight = new THREE.AmbientLight(0xffffff, 3); // Soft white light
        scene.add(ambientLight);
        scene.add(group);
        scene.add(lineCircleGroup);
        this.init();
      }

      init() {
        this.renderer.domElement.addEventListener('click', (e) => {
          const pointer = new THREE.Vector2();
          pointer.x = (e.clientX / this.container.offsetWidth) * 2 - 1;
          pointer.y = -(e.clientY / this.container.offsetHeight) * 2 + 1;

          this.checkIntersection(pointer);
        });

        //meshes and models
        group.add(this.createEarth());

        //temp
      }

      checkIntersection(mouse) {
        this.raycaster.setFromCamera(mouse, this.camera);

        const intersects = this.raycaster.intersectObject(group, true);
        function findSatellite(object) {
          if (object == null) return null;
          if (object.name == 'satellite') {
            return object;
          }
          return findSatellite(object.parent);
        }
        if (intersects.length > 0) {
          const selectedObject = intersects[0].object;
          const sat = findSatellite(selectedObject);

          // finding selected satellite index
          for (let index = 0; index < app.satelliteObjects.length; index++) {
            const element = app.satelliteObjects[index];
            if (element.modelClone == sat) {
              onObjectSelect(index);
              break;
            }
          }
        }
      }

      animate() {
        this.controls.update();
        this.renderer.render(scene, this.camera);
      }

      resize() {
        var width = this.container.offsetWidth;
        var height = this.container.offsetHeight;

        // Update renderer size
        this.renderer.setSize(width, height);

        // Update camera aspect ratio
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      }


      createEarth() {
        // setting up earth model
        var geometry = new THREE.SphereGeometry(2, 32, 32);
        var material = new THREE.MeshPhongMaterial({
          map: earthDiffusedTexture,
          bumpMap: earthBumpTexture,
          specularMap: earthSpecularTexture,
        });
        // material.bumpScale = 0.01
        // material.specular = new THREE.Color('white')

        var earthMesh = new THREE.Mesh(geometry, material);
        // adding rotation offset
        return earthMesh;
      }
    }

    let modelLoader = new GLTFLoader();
    let model = await modelLoader.loadAsync('./scene.gltf');

    var textureLoader = new THREE.TextureLoader();
    let earthDiffusedTexture = await textureLoader.loadAsync(
      './earth-diffused-texture.jpg'
    );
    let earthBumpTexture = await textureLoader.loadAsync(
      './earth-bump-texture.jpg'
    );
    let earthSpecularTexture = await textureLoader.loadAsync(
      './earth-specular-texture.jpg'
    );

    var scene = new THREE.Scene();
    var group = new THREE.Group();
    var lineCircleGroup = new THREE.Group();

    const app = new App(containerRef.current);

    let previousTimestamp = 0;
    const earthSpeed = 0.1;
    app.camera.position.z = 5


    window.addEventListener('resize', function(){
      app.resize()
    })











    // called from react

    function onObjectSelect(index) {
      alert(app.satelliteObjects[index].id);

      // TODO call react function from here, send selected id
    }

    function updateObjects(objects) {
      let matchedObject = Array();

      // updating previous objects
      app.satelliteObjects.forEach((item) => {
        const index = findSameObject(item.id, objects);

        // if match found
        if (index != -1) {
          // update the object if coordinate changes or selected changes
          if (
            item.latitude != objects[index].latitude ||
            item.longitude != objects[index].longitude ||
            item.selected != objects[index].selected
          ) {
            item.selected = objects[index].selected;
            item.update(objects[index].latitude, objects[index].longitude);
          }

          matchedObject.push(item);

          // removing the matched object from search
          objects.splice(index, 1);
        } else {
          // remove the object from render
          item.remove();
        }
      });

      // creating the remaining elements
      objects.forEach((item) => {
        const obj = new SatelliteObject(
          item.latitude,
          item.longitude,
          item.id,
          item.selected
        );
        matchedObject.push(obj);
      });

      app.satelliteObjects = matchedObject;
    }

    function findSameObject(id, objects) {
      for (let index = 0; index < objects.length; index++) {
        if (objects[index].id == id) {
          return index;
        }
      }

      return -1;
    }

    // ------------- temp data -----------------

    updateObjects(data);

    function animate(timestamp) {
      // calculating delta time in second, because requestAnimationFrame will give time in milliseconds
      const delta = (timestamp - previousTimestamp) / 1000;
      previousTimestamp = timestamp;

      group.rotation.y += earthSpeed * delta;
      lineCircleGroup.rotation.y += earthSpeed * delta;

      app.animate();
      // rerender the scene

      requestAnimationFrame(animate);
    }

    // // Start the animation loop
    requestAnimationFrame(animate);

    // Clean up on component unmount
    return () => {
      app.renderer.dispose();
      containerRef.current.removeChild(app.renderer.domElement);
    };
  }, []);
  

 

 
  return (
    <div className="col-md-6 col-12 mt-5 mt-md-0  px-lg-5">
      <div
        className="home-card shadow-sm rounded"
        style={{ aspectRatio: '1/1' }}
        ref={containerRef}
      ></div>
    </div>
  );
};

export default Map;
