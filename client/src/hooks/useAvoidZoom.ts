import { useEffect } from 'react';

const useAvoidZoom = () => {
  useEffect(() => {
    // Función para desactivar zoom con Ctrl + Scroll
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault(); // Previene el zoom al usar Ctrl + Scroll
      }
    };

    // Función para desactivar zoom con Ctrl + teclas +/-/0
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        (e.key === '+' ||
          e.key === '=' || // Add'=' porque en algunos teclados Ctrl++ es Ctrl+=
          e.key === '-' ||
          e.key === '0')
      ) {
        e.preventDefault();
      }
    };

    // Función para desactivar zoom en dispositivos móviles (gesto de pellizco)
    const handleGestureStart = (e: Event) => {
      e.preventDefault();
    };

    // Añadir los event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('gesturestart', handleGestureStart);

    // Limpiar los event listeners al desmontar el componente
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('gesturestart', handleGestureStart);
    };
  }, []); // Solo se ejecuta al montar y desmontar el componente
};

export default useAvoidZoom;
