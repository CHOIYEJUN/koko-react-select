import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
    color: {
        border: '#ccc',
        hoverBg: '#F5F8FF',
        primary: '#1d4ed8',
        danger: 'red',
        disabledBg: '#f3f3f3',
        text : {
            placeholder: '#999',
            main : '#5C7099'
        }
    },
    fontSize: {
        md: '14px',
    },
});
