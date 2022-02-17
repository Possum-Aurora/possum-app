import { useEffect } from 'react'

export function useOnClickOutside(ref: any, callback:Function) {
    useEffect(() => {
      function handler(event: any) {
        if (!ref.current?.contains(event.target)) {
          callback();
        }
      }
      window.addEventListener('click', handler);
   
      return () => window.removeEventListener('click', handler)
    }, [callback, ref]);
  }