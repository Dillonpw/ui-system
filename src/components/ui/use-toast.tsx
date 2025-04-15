import * as React from 'react';
import { toast as sonnerToast } from 'sonner';

export interface ToastProps {
    title?: string;
    description?: string;
}

export function toast(props: ToastProps) {
    sonnerToast(props.title, {
        description: props.description,
    });
}
