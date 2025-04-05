import { RefObject, useEffect } from 'react';

interface Options {
    ref: RefObject<HTMLElement>;
    callback: () => void;
}

const useOutsideClick = (options: Options) => {
    const { ref, callback } = options;

    useEffect(() => {
        const handleClickOutSide = (event: globalThis.MouseEvent) => {
            if (!(event.target instanceof Node)) {
                return;
            }

            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutSide);

        return () => {
            document.removeEventListener('mousedown', handleClickOutSide);
        };
    }, []);
};

export default useOutsideClick;
