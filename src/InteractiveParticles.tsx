import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const InteractiveParticles = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // パーティクルのジオメトリとマテリアルを作成
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 5000;
    const posArray = new Float32Array(particlesCnt * 3); // x, y, z for each particle

    // カラー配列の作成
    const colors = new Float32Array(particlesCnt * 3); // RGB for each particle

    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
      colors[i] = Math.random(); // 0 to 1 range for color values
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // マテリアルの設定（頂点カラーを使用）
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      transparent: true,
      vertexColors: true
    });

    // パーティクルシステムの作成
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // カメラの位置設定
    camera.position.z = 3;

    // マウスの位置を追跡するためのベクトル
    const mouse = {
      x: undefined,
      y: undefined
    }

    // マウス移動イベント
    document.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);

      // マウスの位置に基づいて何かを変更（例：カメラの回転）
      particlesMesh.rotation.y += 0.001;

      if (mouse.x !== undefined && mouse.y !== undefined) {
        camera.rotation.y = mouse.x * 0.1;
        camera.rotation.x = mouse.y * 0.1;
      }

      renderer.render(scene, camera);
    };

    // アニメーションの開始
    animate();

    // クリーンアップ関数
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default InteractiveParticles;
