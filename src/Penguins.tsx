import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const PenguinTextures = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    scene.background = new THREE.Color(0xb0e0e6);
    const light = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x6699CC, shininess: 100 }),
      new THREE.MeshStandardMaterial({ color: 0x6699CC, metalness: 0.8, roughness: 0.3 }),
      new THREE.MeshLambertMaterial({ color: 0x6699CC, transparent: true, opacity: 0.5 }),
      new THREE.MeshBasicMaterial({ color: 0x6699CC }),
      new THREE.MeshBasicMaterial({ color: 0x6699CC, wireframe: true }),
    ];

    const penguins = materials.map(material => createPenguin(material));
    penguins.forEach((penguin, index) => {
      penguin.position.x = index * 5 - (penguins.length - 1) * 2.5;
      scene.add(penguin);
    });

    // 雪の追加
    const snowParticles = createSnow();
    scene.add(snowParticles);

    camera.position.z = 12;

    const animate = () => {
      requestAnimationFrame(animate);
      penguins.forEach(penguin => penguin.rotation.y += 0.01);
      snowParticles.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

const createPenguin = (material) => {
    const penguin = new THREE.Group();

    // 体
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const body = new THREE.Mesh(bodyGeometry, material);
    penguin.add(body);

    // 頭
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const head = new THREE.Mesh(headGeometry, material);
    head.position.set(0, 1, 0);
    penguin.add(head);

    // 目
    const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye1.position.set(0.2, 1.2, 0.5);
    const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye2.position.set(-0.2, 1.2, 0.5);
    penguin.add(eye1);
    penguin.add(eye2);

    // くちばし
    const beakGeometry = new THREE.ConeGeometry(0.1, 0.3, 32);
    const beakMaterial = new THREE.MeshBasicMaterial({ color: 0xFFA500 });
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.set(0, 1, 0.5);
    beak.rotation.x = Math.PI / 2;
    penguin.add(beak);

    // 足
    const footGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.5);
    const footMaterial = new THREE.MeshBasicMaterial({ color: 0xFFA500 });
    const foot1 = new THREE.Mesh(footGeometry, footMaterial);
    foot1.position.set(0.2, -1.1, 0.2);
    const foot2 = new THREE.Mesh(footGeometry, footMaterial);
    foot2.position.set(-0.2, -1.1, 0.2);
    penguin.add(foot1);
    penguin.add(foot2);

    return penguin;
  };

  const createSnow = () => {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 1000;
    const posArray = new Float32Array(particlesCnt * 3);

    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true
    });

    return new THREE.Points(particlesGeometry, particlesMaterial);
  };

  return <div ref={mountRef}></div>;
};

export default PenguinTextures;
