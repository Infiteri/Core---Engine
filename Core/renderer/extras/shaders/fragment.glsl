precision mediump float;

uniform vec4 uColor;
uniform sampler2D sampler;
uniform int useTexture;

varying vec2 vUvs;

void main() {
    vec4 finalColor = uColor;

    if(useTexture == 1) {
        finalColor = uColor * texture2D(sampler, vUvs);
    }

    gl_FragColor = finalColor;
}