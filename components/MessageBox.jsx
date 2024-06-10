  const MessageBox = ({ message, currentUser }) => {
console.log(message.text)
    const lastMessageTime = message?.createdAt
      ? new Date(message?.createdAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      : "";
    return message?.sender?._id !== currentUser._id ? (
      <div className="message-box">
        <img src={message?.sender?.profileImage || "/assets/user.png"} alt="profile photo" className="message-profilePhoto" />
        <div className="message-info">
          <p className="text-small-bold">
            {message?.sender?.username} &#160; &#183; &#160; {lastMessageTime}
          </p>
  
          {message?.text ? (
            <p className="message-text">{message?.text}</p>
          ) : (
            <img src={message?.photo} alt="message" className="message-photo" />
          )}
        </div>
      </div>
    ) : (
      <div className="message-box justify-end">
        <div className="message-info items-end">
          <p className="text-small-bold">
            {lastMessageTime}
          </p>
  
          {message?.text ? (
            <p className="message-text-sender">{message?.text}</p>
          ) : (
            <img src={message?.photo} alt="message" className="message-photo" />
          )}
        </div>
      </div>
    )
  }
  
  export default MessageBox