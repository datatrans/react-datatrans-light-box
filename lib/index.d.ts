import PropTypes from 'prop-types';

interface LightboxProps {
    production: boolean;
    transactionId: string;
    onLoaded?: () => void;
    onOpened?: () => void;
    onCancelled?: () => void;
    onError?: () => void;
}
declare const Lightbox: {
    (props: LightboxProps): null;
    propTypes: {
        transactionId: PropTypes.Validator<string>;
        production: PropTypes.Requireable<boolean>;
        onLoaded: PropTypes.Requireable<(...args: any[]) => any>;
        onOpened: PropTypes.Requireable<(...args: any[]) => any>;
        onCancelled: PropTypes.Requireable<(...args: any[]) => any>;
        onError: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        onLoaded(): void;
        onOpened(): void;
        onCancelled(): void;
        onError(): void;
        production: boolean;
    };
};

export { Lightbox as default };
