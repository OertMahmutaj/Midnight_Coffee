import ContactForm from '@/src/components/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          MIDNIGHT COFFEE
        </h1>
        <p className="text-neutral-400 max-w-md mx-auto text-sm md:text-base">
          We design high-end brand positions and build robust background automation engines.
        </p>
      </div>

      {/* Rendering our state-driven contact form */}
      <section className="w-full px-2">
        <ContactForm />
      </section>
    </main>
  );
}