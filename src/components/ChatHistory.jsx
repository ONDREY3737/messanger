import "../styles.css"

export default function ChatHistory(history) {
    return (
        <div>
            {console.log(history)}
            {history.data.map((value) => {
                return (
                    <p className={value.thisUser ? "message-right" : "message-left"}>{value.message}</p>
                )
            })}
        </div>
    )
}