import React, { ReactNode, FC, MouseEventHandler } from 'react';

type ButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode,
    className: string,
    rest?: {
        [key: string]: any
    }
}

const Button: FC<ButtonProps> = ({ onClick, className, children, ...rest }) => {
    return (
        <button className={className} onClick={onClick} {...rest}>
            {children}
        </button>
    )
}

export default Button;