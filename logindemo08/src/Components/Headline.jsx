import PropTypes from "prop-types"
const Headline = ({size, text}) => {
    const sizes ={
        small: "2rem",
        medium: "6rem",
        large: "10rem"
    }
    return ( <h1 style={{fontSize:sizes[size]}}>{text}</h1>  );
}
 
export default Headline;

Headline.PropTypes ={
    size:PropTypes.oneOf(["small", "medium", "large"]),
    text: PropTypes.string,
}

Headline.defualtProps = {
    size: "medium",
    text: "here is a T"
}