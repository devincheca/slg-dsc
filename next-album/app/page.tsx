// import Image from "next/image";

/*()
<html>

  <head>
    <title>Sarah & Devin</title>
    <meta charset="utf-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <link href="bulma.css" rel="stylesheet">
    <link href="index.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="./images/flowerPng.png">
    <script src="index.js" defer></script>
    <!--
      https://nv2vz41k98.execute-api.us-east-1.amazonaws.com/default/slg-dsc-wed
    <script src="imageGallery.js" defer></script>
    -->
    <script src="nav.js" defer></script>
    <script src="album.js" defer></script>
  </head>

  <body>
    <div id="nav" style="display: none;">
      <div onclick="toggleNav()">X</div>
      <ul>
        <li>
          <a href="https://sarahguillen.devincheca.com">
            Home
          </a>
        </li>
        <li>
          <a href="registry.html">
            Registry
          </a>
        </li>
        <li>
          <a href="details.html">
            Additional Details
          </a>
        </li>
        <li>
          <a href="album.html">
            Album
          </a>
        </li>
        <li id="notifyDetails"></li>
      </ul>
    </div>

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      {/*<div className="nav-bar-div" onClick={toggleNav()}>☰</div>
  */

export default function Home() {
  return (
    <main className="container">
      <section className="hero is-info">
        <div className="hero-body" style={{ textAlign: 'center' }}>Wedding Album</div>
      </section>
      <div id="gallery-div">
        {/* insert images here by calling and modifying the javascript in gallery.js
          renderImages()
        */}
      </div>
    </main>
  );
}
