01-2 2z"></path>
          </svg>
          <span class="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            ${article.category}
          </span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          ${article.title}
        </h3>
        <p class="text-gray-600 text-sm mb-4">
          ${article.excerpt}
        </p>
        <button class="text-blue-600 font-medium text-sm flex items-center hover:text-blue-700">
          Read more 
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Show article
function showArticle(articleId) {
  const article = allArticles.find(a => a.id === articleId);
  if (!article) return;
  
  selectedArticle = article;
  
  // Update breadcrumb
  const breadcrumb = document.getElementById('breadcrumb');
  const breadcrumbCategory = document.getElementById('breadcrumb-category');
  const breadcrumbSeparator = document.getElementById('breadcrumb-separator');
  const breadcrumbArticle = document.getElementById('breadcrumb-article');
  
  breadcrumb.classList.remove('hidden');
  breadcrumbCategory.textContent = article.category;
  breadcrumbSeparator.classList.remove('hidden');
  breadcrumbArticle.textContent = article.title;
  
  // Hide main view, show article view
  document.getElementById('main-view').classList.add('hidden');
  document.getElementById('article-view').classList.remove('hidden');
  
  // Render article content
  renderArticleContent(article);
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render article content
function renderArticleContent(article) {
  const container = document.getElementById('article-content');
  
  const lines = article.content.split('\n');
  let html = '';
  
  lines.forEach(line => {
    if (line.startsWith('# ')) {
      html += `<h1 class="text-4xl font-bold text-gray-900 mb-6">${line.substring(2)}</h1>`;
    } else if (line.startsWith('## ')) {
      html += `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${line.substring(3)}</h2>`;
    } else if (line.startsWith('### ')) {
      html += `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">${line.substring(4)}</h3>`;
    } else if (line.startsWith('**') && line.endsWith('**')) {
      html += `<p class="font-bold text-gray-900 mt-4">${line.slice(2, -2)}</p>`;
    } else if (line.startsWith('- ')) {
      html += `<li class="text-gray-700 ml-6 mb-2">${line.substring(2)}</li>`;
    } else if (line.trim()) {
      html += `<p class="text-gray-700 mb-4">${line}</p>`;
    }
  });
  
  container.innerHTML = html;
}

// Reset view
function resetView() {
  selectedArticle = null;
  
  // Hide breadcrumb
  document.getElementById('breadcrumb').classList.add('hidden');
  document.getElementById('breadcrumb-separator').classList.add('hidden');
  
  // Show main view, hide article view
  document.getElementById('main-view').classList.remove('hidden');
  document.getElementById('article-view').classList.add('hidden');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize search
function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderArticles();
  });
}

// Initialize chatbot
function initializeChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const window = document.getElementById('chatbot-window');
  const iconOpen = document.getElementById('chatbot-icon-open');
  const iconClose = document.getElementById('chatbot-icon-close');
  const sendButton = document.getElementById('chat-send');
  const input = document.getElementById('chat-input');
  
  toggle.addEventListener('click', () => {
    const isHidden = window.classList.contains('hidden');
    
    if (isHidden) {
      window.classList.remove('hidden');
      iconOpen.classList.add('hidden');
      iconClose.classList.remove('hidden');
    } else {
      window.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    }
  });
  
  sendButton.addEventListener('click', sendMessage);
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

// Send message
function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  chatMessages.push({ role: 'user', content: message });
  input.value = '';
  
  renderChatMessages();
  
  // Show typing indicator
  showTypingIndicator();
  
  // Generate response after delay
  setTimeout(() => {
    const response = generateResponse(message);
    chatMessages.push({ role: 'assistant', content: response });
    hideTypingIndicator();
    renderChatMessages();
  }, 1000);
}

// Generate response
function generateResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return 'Our services are priced transparently:\n\n• Website Development: Starting at $1,800\n• ADA Compliance: $800\n• Local SEO: $500-$1,200/month\n• Knowledge Base: $2,500+\n\nWhat specific service interests you?';
  }

  if (lowerMessage.includes('ada') || lowerMessage.includes('accessibility')) {
    return 'ADA compliance protects your business and reaches more customers. We ensure WCAG 2.1 Level AA standards including color contrast, keyboard navigation, and screen reader compatibility. Our audit is $800. Want to know more?';
  }

  if (lowerMessage.includes('seo')) {
    return 'Local SEO helps you dominate local search! We offer Google Business Profile optimization, citation building, and review management. Our Growth package ($800/month) has helped clients increase visibility by 300%+. Interested in a case study?';
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('call')) {
    return '📞 Phone: 928-228-5769\n📧 Email: contact@digitalallies.net\n\nOffice Hours: Monday-Friday, 9 AM - 5 PM MST\n\nFree consultations available! What time works for you?';
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return 'Hello! Welcome to Digital Allies. I can help you with questions about our services, pricing, and how we can grow your business online. What would you like to know?';
  }

  return 'I can answer questions about:\n\n• Website design\n• ADA compliance\n• Local SEO\n• Knowledge bases\n• Pricing and timelines\n\nYou can also call us at 928-228-5769. What interests you?';
}

// Render chat messages
function renderChatMessages() {
  const container = document.getElementById('chat-messages');
  
  let html = '';
  chatMessages.forEach(msg => {
    const isUser = msg.role === 'user';
    html += `
      <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[80%] p-3 rounded-lg ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}">
          <p class="text-sm whitespace-pre-line">${msg.content}</p>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
  const container = document.getElementById('chat-messages');
  
  const indicator = document.createElement('div');
  indicator.id = 'typing-indicator';
  indicator.className = 'flex justify-start';
  indicator.innerHTML = `
    <div class="bg-gray-100 p-3 rounded-lg">
      <div class="flex space-x-2">
        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
      </div>
    </div>
  `;
  
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}
