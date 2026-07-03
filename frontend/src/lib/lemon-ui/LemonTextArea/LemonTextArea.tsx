import './LemonTextArea.scss'

import React, { ReactElement, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import { cn } from 'lib/utils/css-classes'

interface LemonTextAreaPropsBase extends Pick<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onFocus' | 'onBlur' | 'maxLength' | 'onKeyDown'
> {
    id?: string
    value?: string
    placeholder?: string
    className?: string
    /** Whether input field is disabled */
    disabled?: boolean
    ref?: React.Ref<HTMLTextAreaElement>
    onChange?: (newValue: string) => void
    minRows?: number
    maxRows?: number
    rows?: number
    autoFocus?: boolean
    /** Whether to stop propagation of events from the input */
    stopPropagation?: boolean
    'data-attr'?: string
    hideFocus?: boolean
    /**
     * An array of actions that are added to the left of the text area's footer
     * for example image upload or emoji picker
     */
    actions?: ReactElement[]
    /**
     * Add items to the right-hand side of the footer
     * Used for informational notes like whether markdown content is supported
     */
    rightFooter?: ReactElement
}

export interface LemonTextAreaWithCmdEnterProps extends LemonTextAreaPropsBase {
    /** Callback for when Cmd/Ctrl + Enter is pressed. In this case, the user adds new lines with Enter like always. */
    onPressCmdEnter?: (currentValue: string) => void
    onPressEnter?: never
}

export interface LemonTextAreaWithEnterProps extends LemonTextAreaPropsBase {
    /** Callback for when Enter is pressed. In this case, to add a new line the user must press Cmd + Enter. */
    onPressEnter: (currentValue: string) => void
    onPressCmdEnter?: never
}
export type LemonTextAreaProps = LemonTextAreaWithEnterProps | LemonTextAreaWithCmdEnterProps

/**
 * Polaris migration note (option b — visual adoption, not component swap):
 * Polaris <TextField multiline> cannot express this component's public contract — it doesn't
 * forward a ref to the native <textarea> (consumers rely on it for cursor/selection control,
 * e.g. LemonTextAreaMarkdown), exposes no `onKeyDown` native-event prop (needed for the
 * Enter/Cmd+Enter submission logic), has no `minRows`/`maxRows` auto-grow contract
 * (react-textarea-autosize stays), doesn't accept arbitrary attributes such as `data-attr`,
 * and has no equivalent of the `actions`/`rightFooter` footer bar. We therefore keep the
 * native implementation (zero contract regressions) and adopt Polaris' real
 * `Polaris-TextField*` class structure for the visual chrome; LemonTextArea.scss contains
 * deterministic (higher-specificity) reconciliation rules so the result doesn't depend on
 * CSS import order. Geometry (padding/min-height/auto-grow) intentionally stays Lemon;
 * colors, border, radius and focus ring are Polaris.
 */

/** A `textarea` component for multi-line text. */
export const LemonTextArea = React.forwardRef<HTMLTextAreaElement, LemonTextAreaProps>(function LemonTextArea(
    {
        className,
        onChange,
        onPressEnter,
        onPressCmdEnter,
        minRows = 3,
        onKeyDown,
        stopPropagation,
        actions,
        rightFooter,
        autoFocus,
        hideFocus = false,
        ...textProps
    },
    ref
): JSX.Element {
    const _ref = useRef<HTMLTextAreaElement | null>(null)
    const textRef = ref || _ref

    const hasFooter = (actions || []).length || textProps.maxLength || rightFooter

    const textLength = textProps.value?.length ?? 0

    return (
        <div
            className={cn(
                'LemonTextArea__container flex flex-col rounded',
                // Real Polaris TextField classes (see the Polaris migration note above): they
                // activate Polaris' stylesheet; LemonTextArea.scss reconciles the conflicts.
                'Polaris-TextField Polaris-TextField--multiline',
                textProps.disabled && 'Polaris-TextField--disabled',
                textProps.value && 'Polaris-TextField--hasValue',
                !hideFocus && 'input-like',
                className
            )}
        >
            <TextareaAutosize
                minRows={minRows}
                ref={textRef}
                className={cn(
                    'LemonTextArea Polaris-TextField__Input w-full',
                    hasFooter ? 'rounded-t' : 'rounded',
                    className
                )}
                onKeyDown={(e) => {
                    if (stopPropagation) {
                        e.stopPropagation()
                    }
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                        const target = e.currentTarget
                        // When shift is pressed, we always just want to add a new line
                        if (!e.shiftKey) {
                            if ((e.metaKey || e.ctrlKey) && onPressCmdEnter) {
                                onPressCmdEnter(target.value)
                                e.preventDefault()
                            } else if (onPressEnter) {
                                onPressEnter(target.value)
                                e.preventDefault()
                            }
                        }
                    }
                    onKeyDown?.(e)
                }}
                onChange={(event) => {
                    if (stopPropagation) {
                        event.stopPropagation()
                    }
                    return onChange?.(event.currentTarget.value ?? '')
                }}
                autoFocus={!!autoFocus}
                {...textProps}
            />
            {hasFooter ? (
                <div className="flex flex-row gap-x-2 justify-between border-l border-r border-b rounded-b px-1">
                    <div className="flex flex-row items-center">{actions}</div>
                    <div className="flex flex-row gap-x-1 items-center">
                        <div className="flex flex-row gap-x-1 justify-end flex-grow">
                            {rightFooter}
                            {textProps.maxLength ? (
                                <div className={cn('text-sm', textLength >= textProps?.maxLength && 'text-error')}>
                                    {textLength} / {textProps.maxLength}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
})
