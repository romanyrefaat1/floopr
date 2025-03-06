const LoaderSpinner = ({text}: {text?: string}) => {
    return ( <span>{text ? text : 'Loading...'}</span> );
}
 
export default LoaderSpinner;