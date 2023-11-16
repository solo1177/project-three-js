import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Cube: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1); // 背景色を黒に設定

    // レンダラーをDOMに追加
    mountRef.current?.appendChild(renderer.domElement);

    // 環境光を追加
    const ambientLight = new THREE.AmbientLight(0x404040); // 環境光
    scene.add(ambientLight);

    // 動く光源（妖精のように）を作成
    const light = new THREE.PointLight(0xffffff, 1, 1000);
    scene.add(light);

    // 光源を囲む光るオブジェクトを作成
    const lightSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    scene.add(lightSphere);

    // キューブを作成
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // アニメーションを作成
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // キューブのアニメーション
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // 光源の動き（妖精のように）
      light.position.x = Math.sin(time * 2) * 2;
      light.position.y = Math.cos(time * 3) * 2 + 2;
      light.position.z = Math.cos(time * 2) * 2;

      // 光るオブジェクトの位置を光源に同期
      lightSphere.position.set(light.position.x, light.position.y, light.position.z);

      // 描画
      renderer.render(scene, camera);
    };

    // アニメーションの開始
    animate();

    // コンポーネントのアンマウント時にリソースをクリーンアップ
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Cube;
