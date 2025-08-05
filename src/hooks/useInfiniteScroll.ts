import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T>(
fetchFn: (page: number) => Promise<T[]>,
  maxPages: number = Infinity
) {

    const [items, setItems] = useState<T[]>([]);        // Array acumulativo de elementos
    const [page, setPage] = useState(1);                // Página actual
    const [loading, setLoading] = useState(false);      // Estado de carga
    const [hasMore, setHasMore] = useState(true);       // Si hay más páginas disponibles
    const loaderRef = useRef<HTMLDivElement>(null);     // Referencia al elemento detector

    useEffect(() => {
        let ignore = false; 
        
            async function loadPage() {
                if (loading || !hasMore) return;  // Evitar cargas duplicadas
                setLoading(true);

                const newItems = await fetchFn(page);  // Llamar a la función de fetch

                if (!ignore) {  // Solo actualizar si el efecto no fue cancelado
                setItems((prev) => [...prev, ...newItems]);  // Acumular elementos
                setHasMore(newItems.length > 0 && page < maxPages);  // Verificar si hay más
                setLoading(false);
                }
            }
        
        loadPage();

        return () => { ignore = true };
    }, [page]);

    useEffect(() => {
        const el = loaderRef.current;
        if (!el) return;  // Si no hay elemento, no hacer nada

        const observer = new IntersectionObserver((entries) => {
            // entries[0] es nuestro elemento div
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage((prev) => prev + 1);  // Incrementar página
            }
            },
            { threshold: 1.0 }
        );

        observer.observe(el);
        
        return () => observer.disconnect();  // Cleanup
    }, [hasMore, loading]);  // Re-crear observer si cambian estas dependencias

  return { items, loaderRef, loading, hasMore };
}
