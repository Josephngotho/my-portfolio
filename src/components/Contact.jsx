import { useState } from 'react'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { personal } from '../data/personal'
import { useScrollReveal } from '../hooks/useScrollReveal'

const encodedMsg = encodeURIComponent(personal.whatsappMessage)

const contactMethods = [
  {
    id: 'email',
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: <Mail size={20} />,
    ariaLabel: `Send email to ${personal.email}`,
  },
  {
    id: 'phone',
    label: 'Phone',
    value: personal.phone,
    href: `tel:${personal.phone}`,
    icon: <Phone size={20} />,
    ariaLabel: `Call ${personal.phone}`,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: personal.phone,
    href: `https://wa.me/${personal.whatsapp}?text=${encodedMsg}`,
    icon: <MessageCircle size={20} />,
    ariaLabel: `Message on WhatsApp`,
    external: true,
  },
]

export default function Contact() {
  const ref = useScrollReveal()

  return (
    <section id="contact" ref={ref}>
      <hr className="section-divider" />
      <div className="section">
        <p className="section-label reveal">Get in touch</p>
        <h2 className="section-heading reveal">Let's work together</h2>
        <p className="section-subheading reveal">
          Have a project in mind or want to discuss an idea? Reach out through any of the channels below.
        </p>

        <div className="contact-grid reveal">
          {contactMethods.map((method) => (
            <a
              key={method.id}
              id={`contact-${method.id}-link`}
              href={method.href}
              className="contact-card"
              aria-label={method.ariaLabel}
              {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div className="contact-icon" aria-hidden="true">
                {method.icon}
              </div>
              <div>
                <p className="contact-label">{method.label}</p>
                <p className="contact-value">{method.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
