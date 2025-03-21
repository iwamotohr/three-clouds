uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;
varying float vClouds;

void main()
{
    // Clouds
    float clouds = vClouds;

    // Edges
    clouds *= smoothstep(0.0, 0.2, vUv.x);
    clouds *= smoothstep(1.0, 0.8, vUv.x);
    clouds *= smoothstep(0.0, 0.2, vUv.y);
    clouds *= smoothstep(1.0, 0.8, vUv.y);

    // Final color
    gl_FragColor = vec4(1.0, 0.878, 0.768, clouds);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}