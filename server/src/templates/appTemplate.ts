export const appTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>SNX API</title>

  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{
      min-height:100vh;
      background:#070809;
      color:#eef0f1;
      font-family:Inter,system-ui,sans-serif;
    }
    a{text-decoration:none;color:inherit}
    .wrap{width:min(900px,calc(100% - 32px));margin:auto;padding:70px 0}
    
    nav{
      display:flex;justify-content:space-between;align-items:center;
      padding:18px 24px;border-bottom:1px solid #1c2023;
    }
    .brand{font-weight:700}
    .brand span{color:#4ade80;font-family:monospace;font-size:11px}
    .live{color:#4ade80;font:9px monospace}

    .hero{margin-bottom:55px}
    .eyebrow{color:#4ade80;font:10px monospace;letter-spacing:.12em}
    h1{
      margin-top:12px;font-size:clamp(42px,7vw,68px);
      letter-spacing:-.06em;line-height:.95
    }
    .intro{
      max-width:600px;margin-top:18px;
      color:#858c91;font-size:14px;line-height:1.8
    }

    .base{
      display:inline-flex;gap:12px;margin-top:24px;
      padding:10px 13px;border:1px solid #1c2023;
      border-radius:6px;background:#0d1012;font:10px monospace
    }
    .base b{color:#4ade80;font-weight:400}

    .head{
      display:flex;justify-content:space-between;
      padding-bottom:12px;border-bottom:1px solid #1c2023
    }
    .head h2{font-size:16px}
    .head span{color:#565d62;font:9px monospace}

    .endpoint{
      margin-top:8px;border:1px solid #1c2023;
      border-radius:7px;background:#0d1012;
      overflow:hidden
    }
    .row{
      display:flex;align-items:center;gap:13px;
      padding:16px;cursor:pointer
    }
    .row:hover{background:#111416}
    .method{
      width:43px;padding:5px 4px;border-radius:4px;
      text-align:center;font:8px monospace
    }
    .get{color:#4ade80;background:#4ade8015}
    .path{font:11px monospace;color:#d6dadd}
    .desc{margin-left:auto;color:#656d72;font-size:10px}
    .details{
      display:none;border-top:1px solid #1c2023;
      padding:16px;color:#858c91;font-size:11px;line-height:1.7
    }
    .endpoint.open .details{display:block}

    .cta{
      display:flex;align-items:center;justify-content:space-between;
      gap:20px;margin-top:45px;padding:22px;
      border:1px solid #1c2023;border-radius:9px;
      background:linear-gradient(135deg,#0d1012,#0a0d0e)
    }
    .cta p{color:#858c91;font-size:11px;margin-top:5px}
    .button{
      padding:10px 15px;border-radius:6px;
      background:#4ade80;color:#061008;
      font-size:11px;font-weight:700;white-space:nowrap
    }

    footer{
      margin-top:55px;padding-top:20px;
      border-top:1px solid #1c2023;
      color:#565d62;font:9px monospace
    }

    @media(max-width:600px){
      .wrap{padding:50px 0}
      .desc{display:none}
      .cta{align-items:flex-start;flex-direction:column}
      .button{width:100%;text-align:center}
    }
  </style>
</head>

<body>

  <nav>
    <a href="/" class="brand">
      SNX <span>API v1</span>
    </a>
    <div class="live">● OPERATIONAL</div>
  </nav>

  <main class="wrap">

    <section class="hero">
      <div class="eyebrow">DEVELOPER API</div>

      <h1>SNX Backend.</h1>

      <p class="intro">
        Public API powering the SNX portfolio.
        Explore the available resources and see what
        the backend provides.
      </p>

      <div class="base">
        <b>BASE</b>
        /api/v1
      </div>
    </section>


    <section>

      <div class="head">
        <h2>Resources</h2>
        <span>REST · JSON</span>
      </div>


      ${[
        ["projects", "Portfolio projects"],
        ["blogs", "Published articles"],
        ["categories", "Content categories"],
        ["experiences", "Professional experience"],
        ["skills", "Technical skills"]
      ].map(([path, description]) => `
        <div class="endpoint">

          <div class="row" onclick="toggle(this)">

            <span class="method get">GET</span>

            <span class="path">/${path}</span>

            <span class="desc">${description}</span>

            <span>↓</span>

          </div>

          <div class="details">
            GET /api/v1/${path}
            <br />
            Returns ${description.toLowerCase()} from the SNX API.
          </div>

        </div>
      `).join("")}

    </section>


    <section class="cta">

      <div>
        <strong>Want to see the actual portfolio?</strong>
        <p>Explore the frontend application powered by this API.</p>
      </div>

      <a
        class="button"
        href="https://sana-matusala-portfolio.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open SNX →
      </a>

    </section>


    <footer>
      SNX API · v1 · ${new Date().getFullYear()}
    </footer>

  </main>


  <script>
    function toggle(row) {
      row.parentElement.classList.toggle("open");
    }
  </script>

</body>
</html>
`;