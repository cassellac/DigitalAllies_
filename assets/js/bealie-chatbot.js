/**
 * Bealie Chatbot - Digital Allies AI Assistant
 * A relatable, non-corporate chatbot companion using language controller class
 * for instantaneous EN/ES translation without page reloads.
 */

class BealieLanguageController {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {
            en: {
                greeting: "Hey there! I'm Bealie, your Digital Allies guide. I'm here to help you navigate our services—think of me as a friendly collaborator, not a gatekeeper. What can I help you with today?",
                placeholder: "Type your message...",
                sendBtn: "Send",
                thinkingMsg: "Let me think about that...",
                errorMsg: "I had trouble processing that. Want to try again?",
                contactPrompt: "Need to talk to a human? Reach Anthony at 928-228-5769 or contact@digitalallies.net. He typically responds within one business day.",
                servicesList: "I can help you learn about:\n• Web Design & Development\n• ADA Accessibility Compliance\n• Branding & Visual Identity\n• Tech Consulting\n• Ongoing Support\n\nWhat interests you?",
                pricingInfo: "I believe in transparent pricing—no hidden fees. Here's what I typically see:\n\n• Website projects start around $1,800\n• ADA Compliance audits from $800\n• Monthly support packages from $300\n\nEvery business is unique though. Want to schedule a free consultation?",
                accessibilityInfo: "Accessibility isn't just compliance—it's about opening your doors to everyone. I help businesses meet WCAG 2.1 AA standards. Check out our interactive ADA Accessibility Guide in the Knowledge Base!",
                defaultResponse: "That's a great question! I'm still learning, but I'd love to connect you with Anthony directly. He's the founder and can give you the scars-earned wisdom you need. Call 928-228-5769 or email contact@digitalallies.net.",
                minimizeLabel: "Minimize chat",
                closeLabel: "Close chat",
                openLabel: "Chat with Bealie"
            },
            es: {
                greeting: "¡Hola! Soy Bealie, tu guía de Digital Allies. Estoy aquí para ayudarte a navegar nuestros servicios—piensa en mí como una colaboradora amigable, no como una guardiana. ¿En qué puedo ayudarte hoy?",
                placeholder: "Escribe tu mensaje...",
                sendBtn: "Enviar",
                thinkingMsg: "Déjame pensar en eso...",
                errorMsg: "Tuve problemas procesando eso. ¿Quieres intentar de nuevo?",
                contactPrompt: "¿Necesitas hablar con un humano? Contacta a Anthony al 928-228-5769 o contact@digitalallies.net. Típicamente responde en un día hábil.",
                servicesList: "Puedo ayudarte a aprender sobre:\n• Diseño y Desarrollo Web\n• Cumplimiento de Accesibilidad ADA\n• Marca e Identidad Visual\n• Consultoría Tecnológica\n• Soporte Continuo\n\n¿Qué te interesa?",
                pricingInfo: "Creo en precios transparentes—sin cargos ocultos. Esto es lo que típicamente veo:\n\n• Proyectos de sitios web desde $1,800\n• Auditorías de Cumplimiento ADA desde $800\n• Paquetes de soporte mensual desde $300\n\nCada negocio es único. ¿Quieres programar una consulta gratuita?",
                accessibilityInfo: "La accesibilidad no es solo cumplimiento—se trata de abrir tus puertas a todos. Ayudo a negocios a cumplir con los estándares WCAG 2.1 AA. ¡Revisa nuestra Guía Interactiva de Accesibilidad ADA en la Base de Conocimientos!",
                defaultResponse: "¡Es una gran pregunta! Todavía estoy aprendiendo, pero me encantaría conectarte directamente con Anthony. Él es el fundador y puede darte la sabiduría ganada con cicatrices que necesitas. Llama al 928-228-5769 o envía un email a contact@digitalallies.net.",
                minimizeLabel: "Minimizar chat",
                closeLabel: "Cerrar chat",
                openLabel: "Chatear con Bealie"
            }
        };
    }

    get(key) {
        return this.translations[this.currentLanguage][key] || this.translations['en'][key] || key;
    }

    setLanguage(lang) {
        if (lang === 'en' || lang === 'es') {
            this.currentLanguage = lang;
            return true;
        }
        return false;
    }

    getLanguage() {
        return this.currentLanguage;
    }
}

class BealieChatbot {
    constructor() {
        this.langController = new BealieLanguageController();
        this.isOpen = false;
        this.isMinimized = false;
        this.messages = [];
        this.bealieStates = {
            default: '/assets/Bealie/Bealie - 1.PNG',
            thinking: '/assets/Bealie/Bealie - 2.PNG',
            happy: '/assets/Bealie/Bealie - 3.PNG',
            helpful: '/assets/Bealie/Bealie - 4.PNG',
            greeting: '/assets/Bealie/Bealie - 5.PNG',
            success: '/assets/Bealie/Bealie - 6.PNG'
        };
        this.currentState = 'default';
        this.init();
    }

    init() {
        this.syncWithGlobalLanguage();
        this.createChatbotHTML();
        this.bindEvents();
        this.addGreetingMessage();
    }

    syncWithGlobalLanguage() {
        // Sync with global language setting
        if (typeof window.currentLanguage !== 'undefined') {
            this.langController.setLanguage(window.currentLanguage);
        }
        
        // Listen for language changes from global toggle
        const originalToggleLanguage = window.toggleLanguage;
        window.toggleLanguage = (lang) => {
            if (originalToggleLanguage) {
                originalToggleLanguage(lang);
            }
            this.langController.setLanguage(lang || (this.langController.getLanguage() === 'en' ? 'es' : 'en'));
            this.updateUILanguage();
        };
    }

    updateUILanguage() {
        const placeholder = document.querySelector('#bealie-input');
        const sendBtn = document.querySelector('#bealie-send-btn');
        
        if (placeholder) {
            placeholder.placeholder = this.langController.get('placeholder');
        }
        if (sendBtn) {
            sendBtn.setAttribute('aria-label', this.langController.get('sendBtn'));
        }
    }

    createChatbotHTML() {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'bealie-chatbot';
        chatbotContainer.innerHTML = `
            <!-- Floating Toggle Button -->
            <button id="bealie-toggle" 
                    class="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    style="background: linear-gradient(135deg, #2563EB 0%, #059669 100%);"
                    aria-label="${this.langController.get('openLabel')}"
                    aria-expanded="false"
                    aria-controls="bealie-chat-window">
                <img src="${this.bealieStates.default}" 
                     alt="Bealie - Digital Allies Assistant" 
                     class="w-14 h-14 rounded-full object-cover mx-auto border-2 border-white"
                     id="bealie-toggle-image">
            </button>

            <!-- Chat Window -->
            <div id="bealie-chat-window" 
                 class="fixed bottom-24 right-6 z-50 hidden w-80 sm:w-96 max-h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
                 role="dialog"
                 aria-labelledby="bealie-title"
                 aria-modal="true">
                
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-green-500 p-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <img src="${this.bealieStates.default}" 
                             alt="Bealie" 
                             class="w-10 h-10 rounded-full border-2 border-white object-cover"
                             id="bealie-header-image">
                        <div>
                            <h2 id="bealie-title" class="text-white font-bold text-sm">Bealie</h2>
                            <p class="text-blue-100 text-xs">Digital Allies Assistant</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button id="bealie-minimize" 
                                class="text-white/80 hover:text-white p-1 rounded transition-colors"
                                aria-label="${this.langController.get('minimizeLabel')}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                            </svg>
                        </button>
                        <button id="bealie-close" 
                                class="text-white/80 hover:text-white p-1 rounded transition-colors"
                                aria-label="${this.langController.get('closeLabel')}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Messages Container -->
                <div id="bealie-messages" 
                     class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                     role="log"
                     aria-live="polite"
                     aria-label="Chat messages">
                </div>

                <!-- Input Area -->
                <div class="p-4 bg-white border-t border-gray-200">
                    <div class="flex items-center space-x-2">
                        <input type="text" 
                               id="bealie-input" 
                               class="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                               placeholder="${this.langController.get('placeholder')}"
                               aria-label="Chat message input">
                        <button id="bealie-send-btn" 
                                class="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                style="background: linear-gradient(135deg, #2563EB 0%, #059669 100%);"
                                aria-label="${this.langController.get('sendBtn')}">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatbotContainer);
    }

    bindEvents() {
        const toggle = document.getElementById('bealie-toggle');
        const closeBtn = document.getElementById('bealie-close');
        const minimizeBtn = document.getElementById('bealie-minimize');
        const sendBtn = document.getElementById('bealie-send-btn');
        const input = document.getElementById('bealie-input');

        toggle.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        minimizeBtn.addEventListener('click', () => this.minimizeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('bealie-chat-window');
        const toggle = document.getElementById('bealie-toggle');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatWindow.classList.remove('hidden');
            toggle.setAttribute('aria-expanded', 'true');
            this.setState('greeting');
            document.getElementById('bealie-input').focus();
        } else {
            chatWindow.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
            this.setState('default');
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('bealie-chat-window');
        const toggle = document.getElementById('bealie-toggle');
        
        chatWindow.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
        this.setState('default');
    }

    minimizeChat() {
        this.closeChat();
    }

    setState(state) {
        this.currentState = state;
        const toggleImage = document.getElementById('bealie-toggle-image');
        const headerImage = document.getElementById('bealie-header-image');
        
        if (this.bealieStates[state]) {
            if (toggleImage) toggleImage.src = this.bealieStates[state];
            if (headerImage) headerImage.src = this.bealieStates[state];
        }
    }

    addGreetingMessage() {
        this.messages.push({
            role: 'assistant',
            content: this.langController.get('greeting'),
            state: 'greeting'
        });
        this.renderMessages();
    }

    sendMessage() {
        const input = document.getElementById('bealie-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.messages.push({
            role: 'user',
            content: message
        });
        
        input.value = '';
        this.renderMessages();
        
        // Show thinking state
        this.setState('thinking');
        this.showTypingIndicator();
        
        // Generate response after a brief delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.messages.push({
                role: 'assistant',
                content: response.text,
                state: response.state
            });
            this.setState(response.state);
            this.renderMessages();
        }, 800);
    }

    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Keywords mapping to responses
        const responseMap = {
            services: {
                keywords: ['service', 'services', 'what do you', 'help', 'offer', 'servicio', 'servicios', 'ayuda'],
                response: 'servicesList',
                state: 'helpful'
            },
            pricing: {
                keywords: ['price', 'pricing', 'cost', 'how much', 'precio', 'costo', 'cuanto'],
                response: 'pricingInfo',
                state: 'helpful'
            },
            accessibility: {
                keywords: ['ada', 'accessibility', 'wcag', 'accessible', 'accesibilidad', 'accesible'],
                response: 'accessibilityInfo',
                state: 'helpful'
            },
            contact: {
                keywords: ['contact', 'call', 'phone', 'email', 'reach', 'talk', 'human', 'contactar', 'llamar', 'telefono'],
                response: 'contactPrompt',
                state: 'happy'
            },
            greeting: {
                keywords: ['hi', 'hello', 'hey', 'hola', 'buenos', 'good morning', 'good afternoon'],
                response: 'greeting',
                state: 'greeting'
            }
        };

        // Check for keyword matches
        for (const [category, config] of Object.entries(responseMap)) {
            if (config.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return {
                    text: this.langController.get(config.response),
                    state: config.state
                };
            }
        }

        // Default response
        return {
            text: this.langController.get('defaultResponse'),
            state: 'helpful'
        };
    }

    renderMessages() {
        const container = document.getElementById('bealie-messages');
        
        let html = '';
        this.messages.forEach(msg => {
            const isUser = msg.role === 'user';
            html += `
                <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
                    ${!isUser ? `<img src="${this.bealieStates[msg.state || 'default']}" alt="Bealie" class="w-8 h-8 rounded-full mr-2 flex-shrink-0 object-cover">` : ''}
                    <div class="max-w-[80%] p-3 rounded-2xl ${isUser ? 'bg-blue-600 text-white rounded-br-md' : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'}">
                        <p class="text-sm whitespace-pre-line">${this.escapeHtml(msg.content)}</p>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        container.scrollTop = container.scrollHeight;
    }

    showTypingIndicator() {
        const container = document.getElementById('bealie-messages');
        const indicator = document.createElement('div');
        indicator.id = 'bealie-typing';
        indicator.className = 'flex justify-start';
        indicator.innerHTML = `
            <img src="${this.bealieStates.thinking}" alt="Bealie thinking" class="w-8 h-8 rounded-full mr-2 flex-shrink-0 object-cover">
            <div class="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        `;
        container.appendChild(indicator);
        container.scrollTop = container.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('bealie-typing');
        if (indicator) {
            indicator.remove();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize Bealie when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if not already present
    if (!document.getElementById('bealie-chatbot')) {
        window.bealieChatbot = new BealieChatbot();
    }
});
