window.addEventListener('load',() =>{
    const position = [ [1,1], [2,1],[2,2] ];
    new MatrixGraph( position,
        document.querySelector('#graph1'),
        document.querySelector('#graph1b') );
    new MatrixUI();
});

class MatrixGraph {
    constructor( position, graph1, graph1b ) {
        this.position = position;
        this.graph1 = graph1;
        this.zoom = 8.0;
        this.theta = 0;
        this.size = 1.0;
        this.x1 = 0.0;
        this.y1 = 0.0;
        this.x2 = 0.0;
        this.y2 = 0.0;
        this.theta_v = document.querySelector('#theta_v');
        this.size_v = document.querySelector('#size_v');
        this.x1_v = document.querySelector('#x1_v');
        this.y1_v = document.querySelector('#y1_v');
        this.x2_v = document.querySelector('#x2_v');
        this.y2_v = document.querySelector('#y2_v');

        // 初期状態の数値を表示
        this.theta_v.textContent = document.querySelector('#theta').value;
        this.size_v.textContent = document.querySelector('#size').value;
        this.x1_v.textContent = document.querySelector('#x1').value;
        this.y1_v.textContent = document.querySelector('#y1').value;
        this.x2_v.textContent = document.querySelector('#x2').value;
        this.y2_v.textContent = document.querySelector('#y2').value;

        const nl = new nylon();
        nl.on( 'theta', (keyword, hash) => {
            this.theta = hash['theta'];
            this.theta_v.textContent = this.theta;
            document.querySelectorAll('.theta_m').forEach((elm)=>{
                elm.textContent = this.theta;
            });
            this.redraw();
        });
        nl.on( 'size', (keyword, hash) => {
            this.size = Number(hash['size']);
            this.size_v.textContent = this.size;
            document.querySelectorAll('.size_m').forEach((elm)=>{
                elm.textContent = this.size;
            });
            this.redraw();
        });
        nl.on( 'x1', (keyword, hash) => {
            this.x1 = Number(hash['x1']);
            this.x1_v.textContent = this.x1;
            document.querySelectorAll('.x1_m').forEach((elm)=>{
                elm.textContent = this.x1;
            });
            this.redraw();
        });
        nl.on( 'y1', (keyword, hash) => {
            this.y1 = Number(hash['y1']);
            this.y1_v.textContent = this.y1;
            document.querySelectorAll('.y1_m').forEach((elm)=>{
                elm.textContent = this.y1;
            });
            this.redraw();
        });
        nl.on( 'x2', (keyword, hash) => {
            this.x2 = Number(hash['x2']);
            this.x2_v.textContent = this.x2;
            document.querySelectorAll('.x2_m').forEach((elm)=>{
                elm.textContent = this.x2;
            });
            this.redraw();
        });
        nl.on( 'y2', (keyword, hash) => {
            this.y2 = Number(hash['y2']);
            this.y2_v.textContent = this.y2;
            document.querySelectorAll('.y2_m').forEach((elm)=>{
                elm.textContent = this.y2;
            });
            this.redraw();
        });

        let ctxb = graph1b.getContext('2d');
        ctxb.beginPath();
        ctxb.moveTo( graph1b.width / 2.0, 0 );
        ctxb.lineTo( graph1b.width / 2.0, graph1b.height );
        ctxb.moveTo( 0, graph1b.height/2.0 );
        ctxb.lineTo( graph1b.width, graph1b.height/2.0 );
        ctxb.stroke();

        this.redraw();
    }
    redraw() {
        const ctx = this.graph1.getContext('2d');
        ctx.clearRect( 0, 0, this.graph1.width, this.graph1.height );
        const th = this.theta / 180.0 * Math.PI;
        for( let [x,y] of this.position ) {
            const mx1 = x + this.x1;
            const my1 = y + this.y1;
            const xd = this.size * ( Math.cos(th) * mx1 - Math.sin(th) * my1 );
            const yd = this.size * ( Math.sin(th) * mx1 + Math.cos(th) * my1 );
            const mx2 = xd + this.x2;
            const my2 = yd + this.y2;
            const px = mx2 * this.graph1.width / 2.0 / this.zoom + this.graph1.width / 2.0;
            const py = -my2 * this.graph1.height / 2.0 / this.zoom + this.graph1.height / 2.0;
            ctx.beginPath();
            //ctx.moveTo( xd * this.graph1.width / 2.0, yd * this.graph1. height / 2.0 );
            ctx.arc( px, py, 4, 0, 2.0 * Math.PI, true );
            ctx.stroke();
        }
    }
}

class MatrixUI {
    constructor() {
        let nl = new nylon();
        document.querySelector('#theta').addEventListener('input', (elm) => {
            nl.emit('theta', {'theta':elm.srcElement.value});
        });
        document.querySelector('#size').addEventListener('input', (elm) => {
            nl.emit('size', {'size':elm.srcElement.value});
        });
        document.querySelector('#x1').addEventListener('input', (elm) => {
            console.log(elm.srcElement.value);
            nl.emit('x1', {'x1':elm.srcElement.value});
        });
        document.querySelector('#y1').addEventListener('input', (elm) => {
            nl.emit('y1', {'y1':elm.srcElement.value});
        });
        document.querySelector('#x2').addEventListener('input', (elm) => {
            console.log(elm.srcElement.value);
            nl.emit('x2', {'x2':elm.srcElement.value});
        });
        document.querySelector('#y2').addEventListener('input', (elm) => {
            nl.emit('y2', {'y2':elm.srcElement.value});
        });
    }
}