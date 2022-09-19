import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    Title?: string;
    ID?: string;
    [x: string]: unknown;
}
export function Input({ Title, ID, ...rest }: InputProps) {
    return (
        <>
            {Title && (
                <label htmlFor={ID} className="font-semibold">
                    {Title}
                </label>
            )}
            <input {...rest} id={ID || undefined} className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" />
        </>
    );
}

Input.defaultProps = {
    Title: undefined,
    ID: undefined,
};
