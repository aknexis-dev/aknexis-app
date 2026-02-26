import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, Shield, CheckCircle2 } from 'lucide-react'
import { PageContainer, SectionWrapper } from '@/components/layout/PageContainer'
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/typography/Text'
import { ContactForm } from '@/components/forms/ContactForm'
import { SITE_METADATA } from '@/lib/site.metadata'
import { SITE_EMAIL, SITE_PHONE } from '@/lib/navigation.config'

export const metadata: Metadata = {
  title:       SITE_METADATA.pages.contact.title,
  description: SITE_METADATA.pages.contact.description,
}

const TRUST_POINTS = [
  { icon: <Clock className="w-4 h-4" />,   text: 'Response within 1 business day' },
  { icon: <Shield className="w-4 h-4" />,  text: 'Your information stays confidential' },
  { icon: <CheckCircle2 className="w-4 h-4" />, text: 'No obligation — just a conversation' },
]

const OFFICES = [
  { city: 'New York',       address: '575 Fifth Avenue, Suite 2400',  state: 'NY 10017' },
  { city: 'San Francisco',  address: '123 Mission Street, Floor 12',   state: 'CA 94105' },
  { city: 'Austin',         address: '600 Congress Avenue, Suite 1400', state: 'TX 78701' },
]

export default function ContactPage() {
  return (
    <>
      <SectionWrapper spacing="xl" className="pt-32">
        <PageContainer size="narrow">
          <div className="text-center">
            <SectionLabel className="mb-6">Contact</SectionLabel>
            <SectionTitle className="mb-6">
              Let&rsquo;s start the conversation.
            </SectionTitle>
            <BodyText className="max-w-2xl mx-auto">
              Whether you have a specific project in mind or you&rsquo;re still exploring options, we&rsquo;re here to help you think it through. No pressure, no pitch — just a genuine conversation about your goals.
            </BodyText>
          </div>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper spacing="sm">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card-surface rounded-2xl p-7 lg:p-10">
                <h2 className="font-display font-700 text-xl text-slate-100 mb-1">Send us a message</h2>
                <p className="text-sm text-slate-500 mb-7">Complete the form and we&rsquo;ll respond within one business day.</p>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Direct contact */}
              <div className="card-surface rounded-2xl p-6">
                <h3 className="font-display font-600 text-base text-slate-200 mb-4">Or reach us directly</h3>
                <div className="flex flex-col gap-4">
                  <a href={`mailto:${SITE_EMAIL}`} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400 flex-shrink-0 group-hover:bg-accent-600/15 transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-0.5">Email</p>
                      <p className="text-sm text-slate-300 group-hover:text-accent-400 transition-colors">{SITE_EMAIL}</p>
                    </div>
                  </a>
                  <a href={`tel:${SITE_PHONE.replace(/\D/g, '')}`} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-400 flex-shrink-0 group-hover:bg-accent-600/15 transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-0.5">Phone</p>
                      <p className="text-sm text-slate-300 group-hover:text-accent-400 transition-colors">{SITE_PHONE}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Trust signals */}
              <div className="card-surface rounded-2xl p-6">
                <h3 className="font-display font-600 text-base text-slate-200 mb-4">What to expect</h3>
                <div className="flex flex-col gap-3">
                  {TRUST_POINTS.map((t) => (
                    <div key={t.text} className="flex items-center gap-3">
                      <div className="text-teal-400 flex-shrink-0">{t.icon}</div>
                      <p className="text-sm text-slate-400">{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office locations */}
              <div className="card-surface rounded-2xl p-6">
                <h3 className="font-display font-600 text-base text-slate-200 mb-4">Office locations</h3>
                <div className="flex flex-col gap-4">
                  {OFFICES.map((office) => (
                    <div key={office.city} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-500 flex-shrink-0 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-300">{office.city}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{office.address}</p>
                        <p className="text-xs text-slate-600">{office.state}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </PageContainer>
      </SectionWrapper>

      {/* Reassurance strip */}
      <SectionWrapper background="surface" spacing="sm">
        <PageContainer size="narrow">
          <div className="text-center">
            <p className="text-sm text-slate-500 leading-relaxed">
              Every inquiry is reviewed by a senior member of our team. We don&rsquo;t use automated sales sequences or hand you off to a business development rep. You&rsquo;ll hear from someone who can actually help.
            </p>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  )
}
