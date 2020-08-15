"use strict";

{
  var slideConts = document.querySelectorAll(".slideConts"); // スライドで表示させるclassの取得(NodeList)
  var slideContsRect = []; // 要素の位置（「画面表示領域上端」から対象class上端までの距離）を入力するための空の配列
  var slideContsTop = []; // 要素の位置（「画面表示領域上端」から対象class上端までの距離+スクロール量）を入力するための空の配列
  var windowY = window.pageYOffset; // documentの上端からのページのスクロール量（初期値）を取得
  var windowH = window.innerHeight; // 画面表示領域上端から画面表示領域の下端までの距離を取得 = デバイス画面の高さ（初期値）
  var remainder = 300; // 画面下端部からはみ出させる量(px)

  console.log(`最初のwindowYは${windowY}です`);
  console.log(`最初のwindowHは${windowH}です`);

  // 各slideConts classに対し、要素の位置(px)を取得
  for (var i = 0; i < slideConts.length; i++) {
    slideContsRect.push(slideConts[i].getBoundingClientRect());
  }
  for (var i = 0; i < slideContsRect.length; i++) {
    slideContsTop.push(slideContsRect[i].top + windowY);
  }
  //getBoundingClientRect()は、ターゲット要素の位置を「画面表示領域の上端」左上を(0,0)として、そこからの「相対距離」を取得。つまり、ターゲット要素が画面上端に到達した際、0となる

  // デバイス画面の高さがリサイズされたら、windowHにviewport(スクロール量+画面下端)を再格納する
  window.addEventListener("resize", function () {
    windowH = window.innerHeight;
  });

  console.log(`画面が変更されたタイミングでのwindowHは${windowH}pxです`);

  // スクロールイベントの実装
  window.addEventListener("scroll", function () {
    windowY = window.pageYOffset; // スクロールする度に「documentの上端からのスクロール量」をwindowYに再格納する（変動する）
    for (var i = 0; i < slideConts.length; i++) {
      if (windowY > slideContsTop[i] - windowH + remainder) {
        // document上端からのスクロール量が、「スクロール量+画面上端からclassまでの距離 - デバイス画面の高さを引いた量」を上回った時 = 画面下端が対象classを跨いだタイミング
        slideConts[i].classList.add("show"); //.showを付与
      } else {
        slideConts[i].classList.remove("show"); //.showを削除
      }
    }
  });
}
