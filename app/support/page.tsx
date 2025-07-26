'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  ShoppingCart,
  Package,
  CreditCard,
  Truck,
  Shield,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'

export default function SupportPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const faqs = [
    {
      question: '¿Cómo puedo hacer una compra?',
      answer: 'Para hacer una compra, sigue estos pasos: 1) Navega por nuestros productos, 2) Agrega al carrito, 3) Ve al checkout, 4) Completa tu información, 5) ¡Listo!'
    },
    {
      question: '¿Cuál es la política de devoluciones?',
      answer: 'Ofrecemos 30 días para devoluciones. El producto debe estar en estado original. Incluimos envío gratis de devoluciones y reembolso completo.'
    },
    {
      question: '¿Tienen envío gratis?',
      answer: '¡Sí! Ofrecemos envío gratis en compras mayores a $50. El tiempo de entrega es de 3-5 días hábiles con seguimiento en tiempo real.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito, PayPal, transferencias bancarias, pago en efectivo y cuotas sin interés.'
    },
    {
      question: '¿Cuál es la garantía de los productos?',
      answer: 'Todos nuestros productos tienen garantía de 30 días. Algunos productos tienen garantía extendida de hasta 2 años.'
    },
    {
      question: '¿Puedo cancelar mi pedido?',
      answer: 'Puedes cancelar tu pedido antes de que sea enviado. Una vez enviado, deberás seguir el proceso de devolución.'
    },
    {
      question: '¿Tienen tienda física?',
      answer: 'Actualmente solo operamos online para ofrecer mejores precios y servicio. Nuestro equipo de soporte está disponible 24/7.'
    },
    {
      question: '¿Cómo puedo rastrear mi pedido?',
      answer: 'Recibirás un email con el número de seguimiento una vez que tu pedido sea enviado. También puedes rastrearlo desde tu cuenta.'
    }
  ]

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Chat en Vivo',
      description: 'Soporte 24/7 disponible',
      action: 'Iniciar Chat',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      description: '+54 11 1234-5678',
      action: 'Llamar Ahora',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'soporte@techgear.com',
      action: 'Enviar Email',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Clock,
      title: 'Horarios',
      description: 'Lun-Vie: 9AM-6PM',
      action: 'Ver Horarios',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Por favor completa todos los campos requeridos')
      return
    }

    // Simular envío
    toast.success('Mensaje enviado correctamente. Te responderemos pronto.')
    setContactForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Centro de Soporte</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Estamos aquí para ayudarte. Encuentra respuestas rápidas a tus preguntas o contacta con nuestro equipo de soporte.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {contactMethods.map((method, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${method.bgColor} flex items-center justify-center`}>
                <method.icon className={`h-6 w-6 ${method.color}`} />
              </div>
              <h3 className="font-semibold mb-2">{method.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                {method.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Preguntas Frecuentes
              </CardTitle>
              <CardDescription>
                Encuentra respuestas rápidas a las preguntas más comunes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Envíanos un Mensaje
              </CardTitle>
              <CardDescription>
                ¿No encontraste lo que buscabas? Escríbenos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nombre *</label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Asunto</label>
                  <Input
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Mensaje *</label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="Describe tu consulta..."
                    rows={4}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Enviar Mensaje
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Help */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>¿Necesitas ayuda específica?</CardTitle>
            <CardDescription>
              Encuentra información detallada sobre nuestros servicios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Guía de Compra</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Aprende cómo hacer compras seguras
                  </p>
                  <Link href="/products" className="text-sm text-blue-600 hover:underline">
                    Ver productos →
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Seguimiento de Pedidos</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Rastrea el estado de tu pedido
                  </p>
                  <Link href="/account/orders" className="text-sm text-green-600 hover:underline">
                    Ver mis pedidos →
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Garantías y Devoluciones</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Información sobre garantías
                  </p>
                  <Link href="/support" className="text-sm text-purple-600 hover:underline">
                    Ver políticas →
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 