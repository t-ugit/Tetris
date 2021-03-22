/**
 * pixijs基礎サンプル
 */

const BLOCK_SIDE_LENGTH = 28;
const BORD_WIDTH = BLOCK_SIDE_LENGTH * 10;
const BORD_HEIGHT = BLOCK_SIDE_LENGTH * 20;

 /** =======================================================================================
 * 1.3 Pixiアプリケーションを生成する
 */ 

// Pixiアプリケーション生成
let app = new PIXI.Application({
    width: BORD_WIDTH,                 // スクリーン(ビュー)横幅 
    height: BORD_HEIGHT,                // スクリーン(ビュー)縦幅  
    backgroundColor: 0x000000,  // 背景色 16進 0xRRGGBB
    autoDensity: true,
});
// HTMLの<main id="app"></main>の中に上で作ったPIXIアプリケーション(app)のビュー(canvas)を突っ込む
let el = document.getElementById('app');
el.appendChild(app.view);

// グリッド線を引く
let line
for (let step = 1; step < 20; step++) {
    if (step < 10) {
        line = new PIXI.Graphics()
        .lineStyle(1, 0xe3e3e3)
        .moveTo(BLOCK_SIDE_LENGTH*step, 0)
        .lineTo(BLOCK_SIDE_LENGTH*step, 560)
        app.stage.addChild(line)
    }
    line = new PIXI.Graphics()
    .lineStyle(1, 0xe3e3e3)
    .moveTo(0, BLOCK_SIDE_LENGTH*step)
    .lineTo(280, BLOCK_SIDE_LENGTH*step)
    app.stage.addChild(line)
}

/** =======================================================================================
 * 1.4 スプライトや図形を表示する
 */

/**
 * スプライト(PIXI.Sprite)
 */
// 画像を読み込み、テクスチャにする
let butaTexture = new PIXI.Texture.from('./img/1.png');
let butaSprite = new PIXI.Sprite(butaTexture);
app.stage.addChild(butaSprite);

// フレーム更新時の処理(≒ループ処理)を追加する
app.ticker.add(blockFall);
let amountTime = 0;

// 処理の定義
function blockFall() {
    if(amountTime % 60 == 0){
        amountTime = 0;
        if((butaSprite.y + butaSprite.height) >= BORD_HEIGHT){
            app.ticker.remove(blockFall);
            return
        }
        butaSprite.y += BLOCK_SIDE_LENGTH;
    }
    amountTime += 1;
}


// ブロック移動処理
$('body').keydown(function(e) {
    if ((e.which && e.which === 37) || (e.keyCode && e.keyCode === 37)) {
        // ←
        MoveLeft();
    }
    if ((e.which && e.which === 39) || (e.keyCode && e.keyCode === 39)) {
        // →
        MoveRight();
    }
    // ↑
    if ((e.which && e.which === 38) || (e.keyCode && e.keyCode === 38)) {
        Turn()
    }
    // ↓
    if ((e.which && e.which === 40) || (e.keyCode && e.keyCode === 40)) {
        butaSprite.y = BORD_HEIGHT - butaSprite.height;
    }
    
});

$('#moveLeft').click(function(e) {
    MoveLeft();
});
$('#moveRight').click(function(e) {
    MoveRight();
});


function MoveLeft() {
    butaSprite.anchor.x = 0;
    butaSprite.anchor.y = 0;
    if(!(butaSprite.x <= 0)){
        butaSprite.x -= BLOCK_SIDE_LENGTH;

    }
}
function MoveRight() {
    butaSprite.anchor.x = 0;
    butaSprite.anchor.y = 0;
    if(!(butaSprite.x >= (BORD_WIDTH - BLOCK_SIDE_LENGTH))){
        butaSprite.x += BLOCK_SIDE_LENGTH;
    }
}
function Turn() {
    // butaSprite.anchor.x = 0.5;
    // butaSprite.anchor.y = 0.5;
    butaSprite.angle += 90;  
}
