export const metadata = {
  title: 'Términos de Servicio',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="container-md py-20">
        <h1 className="text-h2 mb-8">Términos de Servicio</h1>

        <div className="prose prose-sm max-w-none text-body text-fg-muted space-y-6">
          <section>
            <h2 className="text-h4 text-fg mb-4">Aceptación de Términos</h2>
            <p>
              Al acceder a este sitio web, aceptas estos términos de servicio en su totalidad. Si
              no estás de acuerdo con estos términos, no uses este sitio.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-fg mb-4">Licencia de Uso</h2>
            <p>
              Se te otorga una licencia limitada, no exclusiva y revocable para acceder y usar
              este sitio web únicamente para fines personales y no comerciales.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-fg mb-4">Limitación de Responsabilidad</h2>
            <p>
              Este sitio se proporciona &quot;tal cual&quot; sin garantías. No somos responsables
              de ningún daño o pérdida relacionados con el uso de este sitio.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-fg mb-4">Cambios en los Términos</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso
              continuado del sitio constituyeaceptación de cualquier cambio.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
