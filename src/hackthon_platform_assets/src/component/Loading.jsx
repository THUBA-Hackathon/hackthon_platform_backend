import * as React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const LoadingContext = React.createContext({});

export const useLoading = () => React.useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = React.useState(false);

    const openLoading = () => {
        setLoading(true)
    }

    const closeLoading = () => {
        setLoading(false)
    }

    return (
        <LoadingContext.Provider value={{ loading, openLoading, closeLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const Loading = (props) => {
    const { size, color = "#165DFF", text, textColor } = props;
    const { loading } = useLoading()

    return (
        false && <div id="loading">
            <div id="loading-center" className="flex-y-center">
                <LoadingCore {...props} />
                <div style={{ fontSize: size / 2, color: textColor || "black" }}>{text || "Loading"}</div>
            </div>
        </div>
    );
};

export const LoadingCore = (props) => {
    const { size, color = "#165DFF" } = props;

    return (
        <div className="loading" style={{
            width: size,
            height: size,
            marginRight: 10,
            background: `conic-gradient(from 114.04deg at 50% 50%, ${color} -3.75deg, rgba(22, 93, 255, 0) 331.83deg, ${color} 339.88deg, ${color} 356.25deg, rgba(22, 93, 255, 0) 691.83deg)`
        }}></div>
    )
}

export const useSmallLoading = () => {
    const [smallLoading, setSmallLoading] = React.useState(false);

    const SmallLoading = (props) => {
        const { size, color = "#165DFF" } = props;
        return (
            <div className="loading" style={{
                width: size,
                height: size,
                background: `conic-gradient(from 114.04deg at 50% 50%, ${color} -3.75deg, rgba(22, 93, 255, 0) 331.83deg, ${color} 339.88deg, ${color} 356.25deg, rgba(22, 93, 255, 0) 691.83deg)`
            }}></div>
        )
    }

    return {
        SmallLoading,
        setSmallLoading,
        smallLoading
    }
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const useMessage = () => {
    const [show, setShow] = React.useState(false);
    const [msg, setMessage] = React.useState({});

    const Message = React.useCallback(() => {
        const { type, text } = msg;
        return (
            <Snackbar open={show} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={() => { setShow(false) }} >
                <Alert onClose={() => { setShow(false) }} severity={type} sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>
        )
    }, [msg, show])

    const message = (type, text) => {
        setShow(true)
        setMessage({ type, text })
    }

    return {
        Message,
        message
    }
}

export const useSwitch = () => {
    const [isOpen, setRequesting] = React.useState(false)
    return {
        isOpen,
        open: () => {
            setRequesting(true)
        },
        close: () => {
            setRequesting(false)
        }
    }
}