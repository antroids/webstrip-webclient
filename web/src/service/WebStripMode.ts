export enum COLOR_SELECTION_MODE {
    ASC,
    RAND,
    GENERATED
}

export const COLOR_SELECTION_MODES_CONFIG = {
    [COLOR_SELECTION_MODE.ASC]: 'Repeat all colors from palette',
    [COLOR_SELECTION_MODE.RAND]: 'Random colors from palette',
    [COLOR_SELECTION_MODE.GENERATED]: 'Random colors'
};

export enum ANIMATION_MODE {
    NONE,
    SHIFT,
    FADE,
    RAND_PIXELS,
    FLASH_PIXELS,
    SOLID_FADE_OUT_LOOP,
    FADE_OUT_LOOP
}

export const ANIMATION_MODES_CONFIG = {
    [ANIMATION_MODE.NONE]: 'No animation',
    [ANIMATION_MODE.SHIFT]: 'Shift',
    [ANIMATION_MODE.FADE]: 'Fade out/in all leds',
    [ANIMATION_MODE.RAND_PIXELS]: 'Change random pixels',
    [ANIMATION_MODE.FLASH_PIXELS]: 'Flash random pixels, then fade out',
    [ANIMATION_MODE.SOLID_FADE_OUT_LOOP]: 'Move solid color pixel with tail',
    [ANIMATION_MODE.FADE_OUT_LOOP]: 'Move color pixel with tail'
};

export enum ANIMATION_PROGRESS_MODE {
    LINEAR,
    SIN_IN,
    SIN_OUT,
    SIN_IN_OUT
}

export const ANIMATION_PROGRESS_MODES_CONFIG = {
    [ANIMATION_PROGRESS_MODE.LINEAR]: 'Linear',
    [ANIMATION_PROGRESS_MODE.SIN_IN]: 'Sin In',
    [ANIMATION_PROGRESS_MODE.SIN_OUT]: 'Sin Out',
    [ANIMATION_PROGRESS_MODE.SIN_IN_OUT]: 'Sin In Out'
};

export interface WebStripMode {
    index: number;
    description: string;
    colorSelectionMode: COLOR_SELECTION_MODE;
    animationMode: ANIMATION_MODE;
    animationSpeed: number;
    animationProgressMode: ANIMATION_PROGRESS_MODE;
    animationIntensity: number;
    animationDirection: boolean;
    colors: string[];
}