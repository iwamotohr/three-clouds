uniform float uTime;
uniform sampler2D uPerlinTexture;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;
uniform float uSmallWavesSpeed;

varying vec2 vUv;
varying float vClouds;

void main () {
    // Waves
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // BigWaves
    float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
        sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
        uBigWavesElevation;
    modelPosition.y += elevation;

    // SmallWaves
    vec2 cloudsUv = uv;
    cloudsUv.x += uTime * uSmallWavesSpeed;
    // Clouds
    float clouds = texture(uPerlinTexture, cloudsUv).r;
    // Remap
    clouds = smoothstep(0.05, 0.6, clouds);

    modelPosition.y += clouds * 0.6;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // varyings
    vUv = uv;
    vClouds = clouds;
}