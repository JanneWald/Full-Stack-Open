
const Message = ({message, color}) => {
    const style = {
        'backgroundColor': 'lightgray',
        'color': `${color}`,
        'fontStyle': 'italic'
    }
    
    if (message === null || message === ""){
        return
    }
    else{
        return(
            <div style={style}>
                <p>{message}</p>
            </div>
        )
    }
    
}

export default Message