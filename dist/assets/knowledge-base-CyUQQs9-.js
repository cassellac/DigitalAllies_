import"./main-CxpxTHpI.js";const m={"ADA Compliance":[{id:"ada-compliance-guide",title:"How to Make Your Website ADA Compliant",category:"ADA Compliance",excerpt:"Step-by-step guide to ensuring your website meets accessibility standards.",content:`# How to Make Your Website ADA Compliant

## Understanding ADA Compliance

The Americans with Disabilities Act (ADA) requires that websites be accessible to people with disabilities.

## Why It Matters

**Legal Protection**: Over 4,000 lawsuits filed in 2024 for inaccessible websites.

**Expanded Market**: 26% of US adults have some type of disability.

**Better SEO**: Accessible websites rank better in search engines.

## WCAG 2.1 Standards

### Visual Accessibility
- Color contrast ratio of at least 4.5:1
- Text resizable up to 200%
- No information conveyed by color alone

### Navigation
- Full keyboard navigation support
- Skip navigation links
- Clear focus indicators

**Our Service**: ADA Compliance Audit starting at $800

📞 Call: 928-228-5769`,keywords:["ada","accessibility","wcag","compliance","website","disabilities","legal","standards"]}],"Consultation Preparation":[{id:"consultation-prep",title:"Getting Ready for Your Consultation",category:"Consultation Preparation",excerpt:"Checklist and tips for preparing for your strategic meeting.",content:`# Getting Ready for Your Digital Allies Consultation

## Our Services Overview

- ADA Compliant Website
- Website Audit
- Web Design & Development
- SEO Optimization
- Local SEO
- Tech Consulting

## Preparing for Your Consultation

### Step 1: Define Your Goals
- Identify your challenges
- Set specific goals
- Establish a budget

### Step 2: Gather Information
- Current website URL
- Analytics data
- Competitor list

### Step 3: Prepare Questions
- "How can I make my website ADA compliant?"
- "What are the key factors for SEO?"
- "How long does a project take?"

📞 Phone: 928-228-5769
📧 Email: contact@digitalallies.net`,keywords:["consultation","preparation","meeting","planning","services","goals"]}],"Tech Consulting":[{id:"choosing-kb-platform",title:"Choosing the Right Knowledge Base Platform",category:"Tech Consulting",excerpt:"Comparison of knowledge base platforms for customer support.",content:`# Choosing the Right Platform

## Why You Need a Knowledge Base

- Reduce support load
- Improve customer satisfaction
- Scale support efficiently
- Train AI chatbots

## Top Platforms

### Document360 (Recommended)
**Pricing**: $149/month
**Best for**: SaaS companies
**Deployment**: 3-5 days

### Zendesk Guide
**Pricing**: $5/agent/month
**Best for**: Enterprise teams
**Deployment**: 1-2 weeks

### Freshdesk
**Pricing**: $15/agent/month
**Best for**: Small-medium teams
**Deployment**: 3-7 days

## Our Implementation Service

**Knowledge Base Setup**: Starting at $2,500
**Content Development**: $150/article
**Chatbot Integration**: Starting at $3,500

📞 Call: 928-228-5769`,keywords:["knowledge base","platform","chatbot","support","customer service","software"]}],"SEO Optimization":[{id:"local-seo-guide",title:"Improving Local SEO Strategies",category:"SEO Optimization",excerpt:"Practical steps for boosting local search visibility.",content:`# Local SEO Strategies

## Why Local SEO Matters

- Increased visibility in "near me" searches
- Qualified traffic from nearby customers
- Better ROI than broad campaigns

## Key Components

### 1. Google Business Profile
- Complete your profile
- Gather reviews
- Post regular updates

### 2. Local Keywords
- "[service] near me"
- "[service] in [city]"
- Neighborhood terms

### 3. NAP Consistency
- Same Name, Address, Phone everywhere
- Critical for rankings

## Our Packages

**Local SEO Starter**: $500/month
**Local SEO Growth**: $800/month
**Local SEO Premium**: $1,200/month

📞 Call: 928-228-5769`,keywords:["seo","local seo","google business","search","ranking","optimization"]}]};let f=null,r="",l=[{role:"assistant",content:"Hi! I'm your Digital Allies assistant. I can help you with questions about our services, pricing, processes, and more. What would you like to know?"}];const g=Object.values(m).flat();document.addEventListener("DOMContentLoaded",()=>{b(),p(),w(),v(),c()});function b(){const t=document.getElementById("category-pills"),e=Object.keys(m);let o=`
    <button 
      onclick="filterByCategory(null)"
      class="px-4 py-2 rounded-full font-medium transition-all bg-blue-600 text-white shadow-lg"
    >
      All Articles
    </button>
  `;e.forEach(n=>{o+=`
      <button 
        onclick="filterByCategory('${n}')"
        class="px-4 py-2 rounded-full font-medium transition-all ${f===n?"bg-blue-600 text-white shadow-lg":"bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}"
      >
        ${n}
      </button>
    `}),t.innerHTML=o}function p(){const t=document.getElementById("articles-grid"),e=document.getElementById("no-results");let o=g;if(r){const i=r.toLowerCase();o=o.filter(a=>a.title.toLowerCase().includes(i)||a.excerpt.toLowerCase().includes(i)||a.keywords.some(s=>s.includes(i)))}if(o.length===0){t.classList.add("hidden"),e.classList.remove("hidden");return}t.classList.remove("hidden"),e.classList.add("hidden");let n="";o.forEach(i=>{n+=`
      <div 
        onclick="showArticle('${i.id}')"
        class="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-blue-200"
      >
        <div class="flex items-start justify-between mb-3">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            ${i.category}
          </span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          ${i.title}
        </h3>
        <p class="text-gray-600 text-sm mb-4">
          ${i.excerpt}
        </p>
        <button class="text-blue-600 font-medium text-sm flex items-center hover:text-blue-700">
          Read more 
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    `}),t.innerHTML=n}function w(){document.getElementById("search-input").addEventListener("input",e=>{r=e.target.value,p()})}function v(){const t=document.getElementById("chatbot-toggle"),e=document.getElementById("chatbot-window"),o=document.getElementById("chatbot-icon-open"),n=document.getElementById("chatbot-icon-close"),i=document.getElementById("chat-send"),a=document.getElementById("chat-input");t.addEventListener("click",()=>{e.classList.contains("hidden")?(e.classList.remove("hidden"),o.classList.add("hidden"),n.classList.remove("hidden")):(e.classList.add("hidden"),o.classList.remove("hidden"),n.classList.add("hidden"))}),i.addEventListener("click",u),a.addEventListener("keypress",s=>{s.key==="Enter"&&u()})}function u(){const t=document.getElementById("chat-input"),e=t.value.trim();e&&(l.push({role:"user",content:e}),t.value="",c(),A(),setTimeout(()=>{const o=C(e);l.push({role:"assistant",content:o}),E(),c()},1e3))}function C(t){const e=t.toLowerCase(),o=g.filter(n=>{const i=n.title.toLowerCase().includes(e),a=n.content.toLowerCase().includes(e),s=n.keywords.some(d=>e.includes(d)||d.includes(e.split(" ").find(y=>y.length>3))),h=n.category.toLowerCase().includes(e);return i||a||s||h});if(o.length>0){const n=o[0],a=n.content.split(`
`).filter(s=>s.trim()&&!s.startsWith("#")&&!s.startsWith("**")&&s.length>20).slice(0,3).join(" ").substring(0,200);return`I found information about "${n.title}":

${n.excerpt}

${a}...

Would you like me to show you the full article? You can also search for "${n.title}" above.

📞 Need help? Call 928-228-5769`}return e.includes("price")||e.includes("cost")||e.includes("pricing")?`Our services are priced transparently:

• Website Development: Starting at $1,800
• ADA Compliance: $800
• Local SEO: $500-$1,200/month
• Knowledge Base Setup: $2,500+
• Content Development: $150/article

What specific service interests you?`:e.includes("contact")||e.includes("call")||e.includes("phone")?`📞 Phone: 928-228-5769
📧 Email: contact@digitalallies.net

Office Hours: Monday-Friday, 9 AM - 5 PM MST

Free consultations available! What time works for you?`:e.includes("hello")||e.includes("hi")||e.includes("hey")?`Hello! Welcome to Digital Allies. I can help you find information about our services, pricing, and how we can grow your business online. Try asking about:

• ADA Compliance
• SEO Optimization
• Website Development
• Tech Consulting

What would you like to know?`:e.includes("help")||e.includes("how")||e.includes("what")?`I can help you find information from our knowledge base. Try asking about:

• ADA Compliance & Accessibility
• SEO Optimization & Local SEO
• Knowledge Base Platforms
• Consultation Preparation
• Pricing & Services

Or call us at 928-228-5769 for immediate assistance!`:`I'm here to help! I can answer questions about:

• ADA Compliance
• Website Development
• SEO & Local SEO
• Tech Consulting
• Our Services & Pricing

Try searching the knowledge base above or ask me a specific question. You can also call us at 928-228-5769!`}function c(){const t=document.getElementById("chat-messages");let e="";l.forEach(o=>{const n=o.role==="user";e+=`
      <div class="flex ${n?"justify-end":"justify-start"}">
        <div class="max-w-[80%] p-3 rounded-lg ${n?"bg-blue-600 text-white":"bg-gray-100 text-gray-900"}">
          <p class="text-sm whitespace-pre-line">${k(o.content)}</p>
        </div>
      </div>
    `}),t.innerHTML=e,t.scrollTop=t.scrollHeight}function k(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}function A(){const t=document.getElementById("chat-messages"),e=document.createElement("div");e.id="typing-indicator",e.className="flex justify-start",e.innerHTML=`
    <div class="bg-gray-100 p-3 rounded-lg">
      <div class="flex space-x-2">
        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
      </div>
    </div>
  `,t.appendChild(e),t.scrollTop=t.scrollHeight}function E(){const t=document.getElementById("typing-indicator");t&&t.remove()}
