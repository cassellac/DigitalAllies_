import{i as m,t as p}from"./main-CxpxTHpI.js";let r=localStorage.getItem("preferredLanguage")||"en";const v={en:{title:"Interactive ADA Accessibility Guide",subtitle:"Comprehensive tools and resources for building inclusive digital experiences",overview:"Overview",guidelines:"Guidelines",testing:"Testing Tools",examples:"Examples",resources:"Resources",understanding:"Understanding ADA Compliance",understandingDesc:"The Americans with Disabilities Act (ADA) ensures equal access to digital content. Learn the fundamentals and why it matters for your business.",wcagTitle:"WCAG 2.1 Guidelines",wcagDesc:"The Web Content Accessibility Guidelines provide the framework for accessible web design. Follow these principles to ensure compliance.",testingTitle:"Accessibility Testing Tools",testingDesc:"Use these interactive tools to test and validate the accessibility of your web content.",examplesTitle:"Interactive Examples",examplesDesc:"See accessibility principles in action with these interactive demonstrations.",resourcesTitle:"Additional Resources",resourcesDesc:"Expand your accessibility knowledge with these curated resources and tools.",footerText:"© 2025 Digital Allies. Building accessible web experiences for everyone."},es:{title:"Guía Interactiva de Accesibilidad ADA",subtitle:"Herramientas y recursos integrales para crear experiencias digitales inclusivas",overview:"Resumen",guidelines:"Pautas",testing:"Herramientas de Prueba",examples:"Ejemplos",resources:"Recursos",understanding:"Entendiendo el Cumplimiento ADA",understandingDesc:"La Ley de Estadounidenses con Discapacidades (ADA) garantiza el acceso igualitario al contenido digital. Aprende los fundamentos y por qué es importante para tu negocio.",wcagTitle:"Pautas WCAG 2.1",wcagDesc:"Las Pautas de Accesibilidad del Contenido Web proporcionan el marco para el diseño web accesible. Sigue estos principios para asegurar el cumplimiento.",testingTitle:"Herramientas de Prueba de Accesibilidad",testingDesc:"Usa estas herramientas interactivas para probar y validar la accesibilidad de tu contenido web.",examplesTitle:"Ejemplos Interactivos",examplesDesc:"Ve los principios de accesibilidad en acción con estas demostraciones interactivas.",resourcesTitle:"Recursos Adicionales",resourcesDesc:"Expande tu conocimiento de accesibilidad con estos recursos y herramientas seleccionados.",footerText:"© 2025 Digital Allies. Construyendo experiencias web accesibles para todos."}};document.addEventListener("DOMContentLoaded",()=>{m(v);const e=document.querySelector(".language-toggle");e&&(e.onclick=()=>{const s=document.documentElement.lang==="en"?"es":"en";p(s)})});window.showTab=function(e){document.querySelectorAll(".tab-content").forEach(t=>{t.classList.remove("active")}),document.querySelectorAll(".tab-button").forEach(t=>{t.classList.remove("active"),t.setAttribute("aria-selected","false")});const a=document.getElementById(e);a&&a.classList.add("active"),event&&event.target&&(event.target.classList.add("active"),event.target.setAttribute("aria-selected","true"))};window.checkContrast=function(){const e=document.getElementById("foregroundColor").value,s=document.getElementById("backgroundColor").value,i=f(e,s),a=document.getElementById("contrastResults");let t,n,o;i>=7?(t="result-pass",n="✅",o=r==="en"?"AAA Compliant":"Cumple AAA"):i>=4.5?(t="result-pass",n="✅",o=r==="en"?"AA Compliant":"Cumple AA"):i>=3?(t="result-warning",n="⚠️",o=r==="en"?"Large Text Only":"Solo Texto Grande"):(t="result-fail",n="❌",o=r==="en"?"Non-compliant":"No cumple"),a.innerHTML=`
        <div class="result-item ${t}">
            <span class="result-icon">${n}</span>
            <div>
                <strong>${r==="en"?"Contrast Ratio":"Relación de Contraste"}: ${i.toFixed(2)}:1</strong><br>
                ${o}
            </div>
        </div>
    `};function f(e,s){const i=u(e),a=u(s),t=g(i.r,i.g,i.b),n=g(a.r,a.g,a.b),o=Math.max(t,n),l=Math.min(t,n);return(o+.05)/(l+.05)}function u(e){const s=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return s?{r:parseInt(s[1],16),g:parseInt(s[2],16),b:parseInt(s[3],16)}:null}function g(e,s,i){const[a,t,n]=[e,s,i].map(o=>(o=o/255,o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4)));return .2126*a+.7152*t+.0722*n}window.analyzeAltText=function(){const e=document.getElementById("altTextInput").value.trim(),s=document.getElementById("altTextResults");if(!e){s.innerHTML=`
            <div class="result-item result-fail">
                <span class="result-icon">❌</span>
                <div>${r==="en"?"No alt text provided":"No se proporcionó texto alt"}</div>
            </div>
        `;return}const i=[],a=[];(e.toLowerCase().includes("image of")||e.toLowerCase().includes("picture of"))&&i.push(r==="en"?'Avoid "image of" or "picture of"':'Evita "imagen de" o "foto de"'),e.length>125&&i.push(r==="en"?"Alt text is too long (>125 characters)":"Texto alt muy largo (>125 caracteres)"),e.length<10&&a.push(r==="en"?"Consider adding more descriptive details":"Considera agregar más detalles descriptivos");let t="";i.length===0&&a.length===0&&(t+=`
            <div class="result-item result-pass">
                <span class="result-icon">✅</span>
                <div>${r==="en"?"Alt text looks good!":"¡El texto alt se ve bien!"}</div>
            </div>
        `),i.forEach(n=>{t+=`
            <div class="result-item result-fail">
                <span class="result-icon">❌</span>
                <div>${n}</div>
            </div>
        `}),a.forEach(n=>{t+=`
            <div class="result-item result-warning">
                <span class="result-icon">⚠️</span>
                <div>${n}</div>
            </div>
        `}),s.innerHTML=t};window.validateHeadings=function(){const e=document.getElementById("htmlInput").value.trim(),s=document.getElementById("headingResults");if(!e){s.innerHTML=`
            <div class="result-item result-fail">
                <span class="result-icon">❌</span>
                <div>${r==="en"?"No HTML content provided":"No se proporcionó contenido HTML"}</div>
            </div>
        `;return}const i=document.createElement("div");i.innerHTML=e;const a=i.querySelectorAll("h1, h2, h3, h4, h5, h6");if(a.length===0){s.innerHTML=`
            <div class="result-item result-warning">
                <span class="result-icon">⚠️</span>
                <div>${r==="en"?"No headings found":"No se encontraron encabezados"}</div>
            </div>
        `;return}const t=Array.from(a).map(l=>parseInt(l.tagName.charAt(1)));let n="",o=t.includes(1);o||(n+=`
            <div class="result-item result-fail">
                <span class="result-icon">❌</span>
                <div>${r==="en"?"Missing H1 heading":"Falta encabezado H1"}</div>
            </div>
        `);for(let l=1;l<t.length;l++){const c=t[l],d=t[l-1];c>d+1&&(n+=`
                <div class="result-item result-warning">
                    <span class="result-icon">⚠️</span>
                    <div>${r==="en"?`Skipped heading level: H${d} to H${c}`:`Nivel de encabezado omitido: H${d} a H${c}`}</div>
                </div>
            `)}n===""&&o&&(n=`
            <div class="result-item result-pass">
                <span class="result-icon">✅</span>
                <div>${r==="en"?"Heading structure is valid!":"¡La estructura de encabezados es válida!"}</div>
            </div>
        `),s.innerHTML=n};window.showMessage=function(e){document.getElementById("keyboardMessage").textContent=e};window.announceElement=function(e){const s=document.getElementById("screenReaderOutput");s.textContent=e,setTimeout(()=>{s.textContent=""},3e3)};document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".tab-button");e&&e.focus()});
