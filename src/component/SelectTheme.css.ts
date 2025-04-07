import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
    color: {
        border: '#ccc',
        hoverBg: '#f3f4f6',
        placeholder: '#999',
        primary: '#1d4ed8',
        danger: 'red',
        disabledBg: '#f3f3f3',
    },
    fontSize: {
        md: '14px',
    },
});
