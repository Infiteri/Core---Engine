attribute vec3 aPosition;
attribute vec2 uvs;

uniform mat4 uCameraMatrix;
uniform mat4 uObjectMatrix;

varying vec2 vUvs;

void main() {
    gl_Position = uCameraMatrix * uObjectMatrix * vec4(aPosition, 1.0);
    vUvs = uvs;
}