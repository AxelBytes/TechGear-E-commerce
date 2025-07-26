'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot, 
  Clock,
  Phone,
  Mail,
  HelpCircle,
  ShoppingCart,
  Package,
  CreditCard
} from 'lucide-react'
import { toast } from 'sonner'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface QuickResponse {
  text: string
  responses: string[]
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! 👋 Soy tu asistente virtual de TechGear. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickResponses: QuickResponse[] = [
    {
      text: '¿Cómo puedo hacer una compra?',
      responses: [
        'Para hacer una compra, sigue estos pasos:\n1. Navega por nuestros productos\n2. Agrega al carrito\n3. Ve al checkout\n4. Completa tu información\n5. ¡Listo! 🛒',
        '¿Te gustaría que te ayude con algún producto específico?'
      ]
    },
    {
      text: '¿Cuál es la política de devoluciones?',
      responses: [
        'Nuestra política de devoluciones:\n• 30 días para devoluciones\n• Producto en estado original\n• Envío gratis de devoluciones\n• Reembolso completo 💰',
        '¿Necesitas ayuda con una devolución específica?'
      ]
    },
    {
      text: '¿Tienen envío gratis?',
      responses: [
        '¡Sí! Ofrecemos envío gratis en:\n• Compras mayores a $50\n• Envío estándar 3-5 días\n• Seguimiento en tiempo real\n• Entrega segura 🚚',
        '¿Quieres que calcule el envío para tu ubicación?'
      ]
    },
    {
      text: '¿Qué métodos de pago aceptan?',
      responses: [
        'Aceptamos múltiples métodos de pago:\n• Tarjetas de crédito/débito\n• PayPal\n• Transferencias bancarias\n• Pago en efectivo\n• Cuotas sin interés 💳',
        '¿Te gustaría conocer más sobre algún método específico?'
      ]
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    // Buscar respuesta rápida
    for (const quickResponse of quickResponses) {
      if (input.includes(quickResponse.text.toLowerCase().replace('¿', '').replace('?', ''))) {
        return quickResponse.responses[Math.floor(Math.random() * quickResponse.responses.length)]
      }
    }

    // Respuestas generales
    if (input.includes('hola') || input.includes('buenos días') || input.includes('buenas')) {
      return '¡Hola! ¿En qué puedo ayudarte hoy? 😊'
    }

    if (input.includes('gracias')) {
      return '¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte? 🙏'
    }

    if (input.includes('precio') || input.includes('costo') || input.includes('cuánto')) {
      return 'Los precios varían según el producto. ¿Te gustaría que te ayude a encontrar algo específico? 💰'
    }

    if (input.includes('envío') || input.includes('entrega') || input.includes('shipping')) {
      return 'Ofrecemos envío gratis en compras mayores a $50. El tiempo de entrega es de 3-5 días hábiles. 🚚'
    }

    if (input.includes('garantía') || input.includes('warranty')) {
      return 'Todos nuestros productos tienen garantía de 30 días. Algunos productos tienen garantía extendida. 🛡️'
    }

    return 'Gracias por tu mensaje. Un agente humano te contactará pronto para ayudarte mejor. ¿Hay algo específico en lo que pueda asistirte mientras tanto? 🤝'
  }

  const handleQuickResponse = (text: string) => {
    setInputValue(text)
    handleSendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
        >
          <span className="animate-pulse">●</span>
        </Badge>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4">
          <Card className="w-full max-w-md h-[500px] flex flex-col">
            <CardHeader className="bg-primary text-primary-foreground pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <CardTitle className="text-lg">Soporte 24/7</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm opacity-90">Asistente virtual disponible</p>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Responses */}
              {messages.length === 1 && (
                <div className="p-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Preguntas frecuentes:</p>
                  <div className="space-y-2">
                    {quickResponses.map((response, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs h-auto p-2"
                        onClick={() => handleQuickResponse(response.text)}
                      >
                        {response.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
} 