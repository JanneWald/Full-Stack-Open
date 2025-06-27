const style = {
    'backgroundColor': 'lightgray',
    'color': 'green',
    'fontStyle': 'italic'
}

const Message = ({message}) => {
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