export const metadata = {
  title: 'Solicitud de Eliminación de Datos',
};

export default function DataDeletionPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="container-md py-20">
        <h1 className="text-h2 mb-8">Solicitud de Eliminación de Datos</h1>

        <div className="prose prose-sm max-w-none text-body text-fg-muted space-y-6">
          <section>
            <h2 className="text-h4 text-fg mb-4">Tu Derecho a la Privacidad</h2>
            <p>
              Tienes derecho a solicitar la eliminación de tus datos personales en cualquier
              momento, de conformidad con las leyes de privacidad aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-fg mb-4">Cómo Solicitar la Eliminación</h2>
            <p>Para solicitar la eliminación de tus datos:</p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>Envía un correo a privacy@arturobarrios.com</li>
              <li>Incluye tu nombre y correo electrónico registrado</li>
              <li>Describe qué datos deseas eliminar</li>
              <li>Responderemos dentro de 30 días</li>
            </ol>
          </section>

          <section>
            <h2 className="text-h4 text-fg mb-4">Consideraciones Legales</h2>
            <p>
              Algunos datos pueden retenerse si es legalmente requerido o si necesitamos
              mantenerlos para cumplir con obligaciones legales.
            </p>
          </section>

          <section>
            <h2 className="text-h4 text-fg mb-4">Contacto</h2>
            <p>
              Si tienes preguntas sobre la eliminación de datos, ponte en contacto con nuestro
              equipo de privacidad.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
