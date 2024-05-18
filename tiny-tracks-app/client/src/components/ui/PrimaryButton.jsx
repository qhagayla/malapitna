/**
 * PrimaryButton is a reusable button component that is used throughout the application.
 * @param {function} onClick - the event handler for the click event
 * @param {node} children - the content of the button
 * @param {object} props - any additional props to be passed to the button element
 */
export default function PrimaryButton({ onClick, children, ...props }) {
    return (
        <button
            className="bg-accent hover:bg-primary hover:text-black text-sm text-white p-2 my-2 rounded-lg font-medium cursor-pointer"
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
