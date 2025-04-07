import {vars} from "./SelectTheme.css.ts";
import {style} from "@vanilla-extract/css";
import {recipe} from "@vanilla-extract/recipes";

export const selectContainer = recipe({
    base: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
        border: `1px solid ${vars.color.border}`,
        borderRadius: '5px',
        background: 'white',
        padding: '8px 16px',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'border-color 0.2s ease',
    },
    variants: {
        isOpen: {
            true: {
                borderColor: vars.color.primary,
            },
            false: {},
        },
        disabled: {
            true: {
                pointerEvents: 'none',
                backgroundColor: vars.color.disabledBg,
                opacity: 0.6,
            },
            false: {},
        },
    },
    defaultVariants: {
        isOpen: false,
        disabled: false,
    },
});



export const selectInputContainer = style({
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
});

export const selectInput = style({
    all: 'unset',
    width: '100%',
    fontSize: vars.fontSize.md,
});

export const selectPlaceholderContainer = style({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
});

export const selectPlaceholder = style({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: vars.color.placeholder,
    fontSize: vars.fontSize.md,
});

export const selectOptionContainer = style({
    width: 'max-content',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    borderRadius: '4px',
    boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
    zIndex: 99,
});

export const selectOption = style({
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: vars.fontSize.md,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    selectors: {
        '&:hover': {
            backgroundColor: vars.color.hoverBg,
        },
    },
});
