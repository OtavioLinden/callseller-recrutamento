export const heroVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const heroFragment = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uReveal;
  uniform float uAspect;

  void main() {
    vec2 uv = vUv;
    uv.x *= uAspect;

    vec2 light = vec2(0.5 * uAspect, 0.5) + uMouse * vec2(0.15 * uAspect, 0.15);
    float dist = length(uv - light);

    float coreRadius = mix(0.08, 0.25, uReveal);
    float core = smoothstep(coreRadius, 0.0, dist) * uReveal;

    float haloRadius = mix(0.3, 0.7, uReveal);
    float halo = smoothstep(haloRadius, 0.0, dist) * 0.45 * uReveal;

    float pulse = 1.0 + sin(uTime * 1.8) * 0.05;
    halo *= pulse;

    vec3 greenCore = vec3(0.17, 0.81, 0.11);
    vec3 greenDeep = vec3(0.12, 0.71, 0.15);
    vec3 color = mix(greenDeep, greenCore, core);

    float alpha = clamp(core + halo, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;
