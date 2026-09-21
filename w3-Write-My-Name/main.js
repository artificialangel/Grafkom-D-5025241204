function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [

        // T
        // Atas
        -0.65, 0.7,
         0.0, 0.7,
        -0.65, 0.5,

        -0.65, 0.5,
         0.0, 0.7,
         0.0, 0.5,

        // Bawah
        -0.42, 0.5,
        -0.22, 0.5,
        -0.42, -0.7,

        -0.42, -0.7,
        -0.22, 0.5,
        -0.22, -0.7,


        // Y
        // Kiri atas
        0.15, 0.7,
        0.35, 0.7,
        0.61, 0.05,

        0.15, 0.7,
        0.61, 0.05,
        0.43, 0.05,

        // Kanan atas
        0.69, 0.7,
        0.89, 0.7,
        0.61, 0.05,

        0.69, 0.7,
        0.61, 0.05,
        0.43, 0.05,


        // Bawah
        0.43, 0.05,
        0.61, 0.05,
        0.61, -0.7,

        0.43, 0.05,
        0.61, -0.7,
        0.43, -0.7
    ];

    var vertexShaderCode = `
        attribute vec2 aPosition;

        void main(){
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `;

    var fragmentShaderCode = `
        precision mediump float;

        void main(){
            gl_FragColor = vec4(255, 0, 255, 255); 
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );

    var aPosition = gl.getAttribLocation(program, "aPosition");

    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
}
