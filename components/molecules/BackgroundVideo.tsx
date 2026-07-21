'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@hooks';

interface BackgroundVideoProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}

/**
 * Componente de video background con lazy-load via IntersectionObserver
 * - CLS = 0 (aspect-ratio reserva espacio)
 * - Respeta prefers-reduced-motion (muestra solo poster)
 * - Respeta navigator.connection.saveData (2g → poster only)
 * - Soporta fallback de poster en AVIF/WebP/JPG
 *
 * @param src - URL del video MP4
 * @param poster - URL de la imagen poster (AVIF/WebP/JPG)
 * @param alt - Texto alt de la imagen poster
 * @param className - Clases adicionales
 */
export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src,
  poster,
  alt,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldShowPosterOnly, setShouldShowPosterOnly] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Verificar prefers-reduced-motion: si activo, mostrar solo poster
    if (prefersReducedMotion) {
      setShouldShowPosterOnly(true);
      return;
    }

    // Verificar navigator.connection para saveData (modo económico)
    // En conexiones lentas o modo data-saver, mostrar solo poster
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection?.saveData || connection?.effectiveType === '2g') {
        setShouldShowPosterOnly(true);
        return;
      }
    }

    // IntersectionObserver para lazy-load del video
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !isLoaded) {
            // Cargar el video cuando es visible
            videoRef.current.load();
            setIsLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Comenzar a cargar 100px antes de que sea visible
        rootMargin: '100px',
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isLoaded, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden bg-neutral-900 ${className}`}
      style={{
        aspectRatio: '16 / 9',
      }}
    >
      {/* Fallback poster (siempre presente para CLS=0) */}
      <img
        src={poster}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isLoaded && !shouldShowPosterOnly ? 0 : 1,
          transition: 'opacity 0.3s ease-out',
        }}
      />

      {/* Video (cargado lazily si no hay prefers-reduced-motion o saveData) */}
      {!shouldShowPosterOnly && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          <source src={src} type="video/mp4" />
          {/* Fallback para navegadores sin soporte de video */}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay oscuro sutilmente semitransparente */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900/60"
        aria-hidden="true"
      />
    </div>
  );
};

export default BackgroundVideo;
