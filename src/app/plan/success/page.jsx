import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CircleCheck } from '@gravity-ui/icons'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <section 
          id="success" 
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100"
        >
          {/* Gravity UI Success Icon */}
          <div className="flex justify-center mb-6 text-green-500">
            <CircleCheck width={80} height={80} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Payment Successful!
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            We appreciate your business! A confirmation email has been sent to <br />
            <span className="font-semibold text-gray-900">{customerEmail}</span>
          </p>

          {/* Support Info Box */}
          <div className="bg-blue-50 text-blue-800 p-4 rounded-xl mb-8 text-sm">
            If you have any questions, please email{' '}
            <a 
              href="mailto:orders@example.com" 
              className="font-bold underline hover:text-blue-900 transition-colors"
            >
              orders@example.com
            </a>
          </div>

          {/* Action Button */}
          <Link
            href="/"
            className="inline-block w-full bg-black text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all duration-200"
          >
            Return to Homepage
          </Link>
        </section>
      </main>
    )
  }
}