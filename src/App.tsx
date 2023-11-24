import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const App: React.FC = () => {
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
    renderer.setClearColor(0x000000); // 明るい空の色に背景色を設定

    // レンダラーをDOMに追加
    mountRef.current?.appendChild(renderer.domElement);

    // 環境光を追加
    const ambientLight = new THREE.AmbientLight(0x404040); // 環境光
    scene.add(ambientLight);

    // 動く光源（妖精のように）を3色作成
    const lights = [
      new THREE.PointLight(0xff0000, 1, 100),
      new THREE.PointLight(0x00ff00, 1, 100),
      new THREE.PointLight(0x0000ff, 1, 100),
    ];
    lights.forEach(light => scene.add(light));

    // 各光源を囲む光るオブジェクトを作成
    const lightSpheres = lights.map(light => {
      const lightSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 8),
        new THREE.MeshBasicMaterial({ color: light.color })
      );
      scene.add(lightSphere);
      return lightSphere;
    });

    // キューブを作成
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, // 白色
      transparent: true,
      opacity: 0.8
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 星のような粒子を作成（オプション）
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200);
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // アニメーションを作成
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // キューブのアニメーション
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // 各光源の動き（妖精のように）
      lights[0].position.x = Math.sin(time * 2) * 2;
      lights[0].position.y = Math.cos(time * 3) * 2 + 2;
      lights[0].position.z = Math.cos(time * 2) * 2;

      lights[1].position.x = Math.sin(time * 3) * 2 + 2;
      lights[1].position.y = Math.cos(time * 2) * 2;
      lights[1].position.z = Math.sin(time * 3) * 2;

      lights[2].position.x = Math.sin(time * 4) * 2;
      lights[2].position.y = Math.cos(time * 4) * 2 + 2;
      lights[2].position.z = Math.sin(time * 4) * 2;

      // 各光るオブジェクトの位置を光源に同期
      lightSpheres.forEach((sphere, index) => {
        sphere.position.set(
          lights[index].position.x, 
          lights[index].position.y, 
          lights[index].position.z
        );
      });

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

export default App;
