import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Cube: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(
      75, // 視野角
      window.innerWidth / window.innerHeight, // アスペクト比
      0.1, // near
      1000 // far
    );
    camera.position.z = 5;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // レンダラーをDOMに追加
    mountRef.current?.appendChild(renderer.domElement);

    // キューブを作成
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    // シーンにキューブを追加
    scene.add(cube);

    // アニメーションを作成
    const animate = () => {
      requestAnimationFrame(animate);

      // キューブのアニメーション
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

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
